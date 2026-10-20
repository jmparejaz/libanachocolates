# Protocol: Tool Preflight (validacion previa obligatoria)

> **Aplica a TODOS los nodos del grafo** (HOC, WD, WR y workers opcionales) y a cualquier CLI
> coding agent que corra bajo este harness. Es la Ley 7 de `HARNESS.md`.
>
> **Origen (evidencia):** analisis de telemetria de 81 conversaciones (2026-09-17 a 2026-10-02).
> 15 conversaciones registraron al menos un span en estado `ERROR`; **14 de esas 15 (93%)**
> contenian algun `ToolError`, y **96 de 186 spans con error (52%)** eran `ToolError`. El patron
> dominante fue la herramienta `view`: ruta inexistente (14), rango de lineas invalido (14) y rango
> fuera de los limites del archivo (6) — **34 errores en 7 conversaciones**. Le siguen `edit` sin
> coincidencia o con multiples coincidencias (10), el MCP de Atlassian (10, auth/inicializacion),
> SQL contra columnas o tablas inexistentes (6) y herramientas inexistentes o renombradas.
> `SessionDestroyedError` (11 conversaciones) aparece de forma consistente como **consecuencia
> propagada** de la sesion abortada mas que como causa tecnica inicial (observacion de la traza,
> no verificacion causal caso por caso).
>
> **Limite de la evidencia:** la telemetria expone estado, tipo de error, operacion, herramienta y
> conversacion; **no** expone la causa interna (el input exacto ni el razonamiento previo del agente).
> Las cifras de arriba describen la distribucion de fallos; la atribucion causal (que preflight
> faltaba) es una inferencia operativa. Verificala contra la traza cruda antes de citarla como
> hecho en un executive summary.

---

## Regla 0 — El preflight es obligatorio

Antes de invocar una herramienta cuyo exito depende de un **supuesto** (que el archivo existe, que
el rango es valido, que la cadena aparece una sola vez, que hay un destinatario elegible, que la
columna existe), el nodo **DEBE** verificar ese supuesto con una comprobacion barata.

Un `ToolError` por supuesto no verificado es un **defecto de proceso**, no un accidente.

Principios:

1. **Fail fast.** Verifica antes de la llamada costosa o destructiva, no despues del error.
2. **Prohibido el reintento identico.** Si una llamada fallo, la siguiente debe partir de
   informacion nueva: ruta corregida, rango clamped, ancla ampliada o destinatario valido.
3. **Una llamada por supuesto.** No encadenes rangos "a ver si entra" ni pruebes ediciones a ciegas.
4. **Evidencia.** El resultado del preflight se registra: dispatch log, reporte del worker o
   checkpoint del thread. Ver `templates/dispatch-log.md` (seccion *Preflight*).

---

## Regla 1 — Preflight de lectura (`view` y cualquier lectura de archivo)

Antes de `view <path>`:

1. **Existencia (archivo regular).** `test -f <path>`. Usa `test -f`, no `test -e`: `test -e` es
   verdadero tambien para **directorios**, asi que no confirma que la ruta sea un archivo. Si no
   existe o no es un archivo regular, **no llames**: busca la ruta real (glob / `find -name`) o
   reporta el miss al HOC.
2. **Longitud.** `awk 'END{print NR}' <path>` da el numero de lineas **exacto**. `wc -l` cuenta
   caracteres de nueva linea, asi que reporta `N-1` si la ultima linea del archivo no termina en
   `\n` (el archivo tiene una linea mas de las que `wc -l` dice). Guarda `N`.
3. **Rango normalizado.** Si pides un rango, verifica `1 <= start <= end <= N`.
   - `start > N` → no llames con ese rango: pide el archivo completo, o el ultimo bloque
     `max(1, N-40)..N`.
   - `end > N` → clamp a `N` y **declara el clamp** en tu razonamiento.
   - `start > end` → rango invalido: corrigelo antes de llamar.
4. **Un archivo por llamada.** Para varios archivos, un preflight por archivo.
5. **Rutas citadas en documentos.** Si la ruta viene de un plan, dispatch o reporte, validala
   igual: las rutas citadas pueden estar desactualizadas.

Plantilla (una linea, sin efectos secundarios):

```bash
P="ruta/al/archivo"
test -f "$P" && awk 'END{print NR}' "$P" || echo "MISSING (o no es archivo regular): $P"
# Si prefieres wc: wc -l "$P"  -> puede reportar N-1 sin newline final; comprueba tail -c1 "$P" | xxd
```

---

## Regla 2 — Preflight de edicion (`edit` y cualquier patch)

Antes de `edit <path>`:

1. **Lectura fresca.** Re-lee la region exacta en el mismo turno. No edites de memoria ni confies
   en una lectura de un turno anterior: otro worker o un commit pudo cambiar el archivo.
2. **Conteo de coincidencias del `old_string` exacto** (literal, no regex):
   - **1** → coincide exactamente una vez: procede.
   - **0** → la cadena no esta: revisa indentacion, espacios finales, CRLF y vuelve a copiar el
     texto **literal** del archivo. Si el archivo cambio bajo tus pies, re-despacha; no reintentes.
   - **>1** → ambigua: amplia el `old_string` con contexto suficiente para que sea unico, o edita
     por rango de lineas. Nunca elijas "la primera" a ciegas.
3. **Verificacion posterior.** Confirma que el cambio se aplico (`git diff --stat`, `grep` del
   texto nuevo) antes de reportar exito.
4. **Prohibido usar la edicion como sonda.** "Pruebo y veo si coincide" coincide con el patron de
   los 10 errores de `edit` observados (sin coincidencia o con coincidencias multiples); la
   telemetria no permite confirmar la causa interna de cada uno.

Conteo literal de ocurrencias (criterio autoritativo):

```bash
python3 -c "import sys;p,s=sys.argv[1],sys.argv[2];print(open(p,encoding='utf-8').read().count(s))" "<path>" "<old_string>"
```

`grep -F` **no** sirve como criterio, por dos motivos independientes: opera **por linea** y no
entiende anclas **multilinea**. Tabla medida sobre un archivo de prueba (evidencia verificada):

| Caso | `grep -F -c` | `grep -F -o \| wc -l` | Ocurrencias reales | Riesgo |
|------|--------------|------------------------|--------------------|--------|
| 4 ocurrencias repartidas en 3 lineas | 3 | 4 | 4 | cuenta mal |
| 2 ocurrencias en la **misma** linea | **1** | 2 | 2 | falsa unicidad |
| ancla de 2 lineas presente 1 vez | 3 | 3 | 1 | falsa ambiguedad |
| ancla de 2 lineas **ausente** (el archivo contiene solo su primera linea) | **1** | 1 | 0 | **falsa unicidad: el `edit` falla** |

Fixture de la tabla (reproducible): archivo de prueba donde la ancla de 2 lineas `A\nB` aparece
completa 0 o 1 vez y `A` sola aparece en otra linea; los conteos se midieron con `grep -F -c`,
`grep -F -o | wc -l` y el conteo Python. Evidencia completa (salidas literales) en
`.agents/communications/ley7-preflight-verification/03_ronda3.md`.

**Regla:** la unicidad se decide **solo** con el conteo literal de ocurrencias. `grep -F -n` se
admite como sonda rapida de una ancla de **una sola linea** (`grep -F -n` te da las lineas
candidatas para inspeccionar), nunca como veredicto de unicidad ni para anclas multilinea.

---

## Regla 3 — Preflight de creacion y escritura de archivos

- **Directorio destino existe.** Si no, `mkdir -p` explicito y declarado, no implicito.
- **El archivo ya existe?** Decide explicitamente: sobrescribir (documentalo) o abortar. Nunca
  sobrescribas por accidente.
- **Ruta resuelta.** Resuelve rutas relativas contra el root del workspace, no contra un `cwd`
  adivinado.

---

## Regla 4 — Preflight de superficie de herramientas

- Usa solo herramientas que existan en la lista de herramientas disponibles del runtime actual.
  Si el nombre que recuerdas no esta, **no lo aproximes**: busca el nombre real.
- `unknown tool` / herramienta renombrada = drift de version del CLI. Es una senal para el HOC:
  registra el hallazgo y escala; no improvises un reemplazo silencioso.
- Los prompts de dispatch y los planes **no** son fuente de verdad de la superficie de
  herramientas: el runtime actual lo es.

---

## Regla 5 — Preflight de delegacion (obligatorio para el HOC)

Antes de despachar a un worker. Aplica a **toda** delegacion del grafo: FASE 2 (los aportes de los
workers al plan detallado se delegan igual) y FASE 3/4/5 (implementacion, review y re-dispatch).
No hay delegacion exenta de preflight.

1. **Destinatario verificado.** El rol/agente debe existir y estar disponible en el runtime
   actual. Verificalo contra la lista real de agentes disponibles, no contra el plan.
2. **Registro en el dispatch log.** Rol, identificador exacto usado, metodo de despacho
   (in-process / headless / `write_agent`) y resultado del preflight. Ver
   `templates/dispatch-log.md`.
3. **Un fallo de despacho no es un permiso.** `No eligible recipients` / agente no disponible en
   segundo plano / timeout de admision **no** significan "el worker no hacia falta".

### Tabla de fallos de delegacion y respuesta obligatoria

| Senal del runtime | Causa probable | Accion obligatoria del HOC |
|-------------------|----------------|----------------------------|
| `write_agent` → `No eligible recipients` | el destinatario no esta registrado/activo, o el mensaje va a un agente ya terminal | 1) listar los agentes/roles realmente disponibles; 2) reintentar **una** vez contra un destinatario valido; 3) si sigue sin destinatario, cambiar de metodo (in-process `task` / headless runner) |
| agente "corriendo" pero nunca admitido | runtime en background sin worker elegible | no esperar indefinidamente: aplica `.agents/docs/worker_watchdog_protocol.md` (presupuesto total 900 s) y escala al usuario |
| worker terminal sin reporte | fallo del worker | registrar el fallo; permitir **un** reemplazo acotado (mismo scope, otro modelo disponible) |
| runtime sin subagentes / sin metodo de despacho | el CLI no expone delegacion | **escalar al usuario**. El HOC **no** implementa (Ley 3) |

4. **Prohibido el fallback silencioso a auto-implementacion.** Si el Worker Developer o el Worker
   Reviewer no estan disponibles, el HOC **no** asume su rol: pausa el subplan, declara el bloqueo
   en el thread y escala al usuario. Auto-implementar rompe la Ley 3 y destruye la auditabilidad
   del grafo.
5. **Bloqueo de fase.** Si el fallo de delegacion impide cumplir el gate de EXECUTE o REVIEW, es un
   bloqueo de fase: se registra en el thread y se escala. El subplan **no** se marca completado.

---

## Regla 6 — Preflight de datos y servicios externos (prioridad secundaria)

- **MCP (ej: Atlassian, 10 errores observados de auth/inicializacion).** Antes de la primera
  llamada de la sesion, valida la conexion/credencial con una llamada barata. Si falla la auth,
  **escala de inmediato**; no reintentes en bucle (los reintentos agotan rate limits y ensucian la
  traza). Emite un unico diagnostico claro: credencial ausente, expirada o servidor no inicializado.
- **SQL / Snowflake (6 errores de columnas o tablas inexistentes).** Antes de la consulta real,
  verifica que la tabla y las columnas existen (`information_schema`, `DESCRIBE`, o un
  `SELECT * ... LIMIT 1` explicito como sonda). No adivines nombres de columna.
- **Validaciones de datos de usuario:** prefiere el skill del workspace
  (`.agents/skills/snowflake-cli-usage/`) antes que comandos ad hoc.

---

## Cuando este protocolo NO aplica

- Lecturas ya verificadas en el mismo turno cuyo path no cambio.
- Comandos idempotentes y baratos cuyo fallo es informativo (ej: `ls` de un directorio de trabajo).

El preflight es obligatorio cuando el fallo seria un `ToolError` evitable o cuando la operacion es
destructiva (editar, sobrescribir, delegar, escribir en servicios externos).

---

## Enforcement

| Nivel | Donde |
|-------|-------|
| Constitucion | `HARNESS.md` — **Ley 7** (preflight obligatorio de herramientas) |
| Invariantes | `checks/phase-gates.yaml` — invariantes transversales + acciones requeridas de `boot` y `execute` |
| Roles | `roles/head-of-council.md` (delegacion), `roles/worker-developer.md`, `roles/worker-reviewer.md` |
| Protocolo de fases | `protocols/delegation.md` (paso 0: preflight del destinatario = Regla 5 de este protocolo), `graph/phases.md` (FASE 0 y gate de FASE 3) |
| Plantillas | `templates/dispatch-log.md` (seccion *Preflight*) |

**Costo del preflight:** un comando barato (`test -f`, conteo de lineas, conteo literal de
ocurrencias). **Costo de saltarlo (segun la traza analizada):** spans `ERROR` de `ToolError` y turnos
perdidos. Los `SessionDestroyedError` (11 conversaciones) acompanan a sesiones abortadas en esa
misma traza; la relacion causal **no** esta verificada caso por caso y no se afirma aqui.

**Nota de honestidad de la evidencia:** las cifras de este protocolo provienen de la telemetria de
conversaciones descrita arriba (fuente no versionada en el repo; el analisis se cita como insumo,
no como artefacto re-ejecutable). Si vas a citarlas en un executive summary, marca su origen y
verifica contra la traza cruda.
