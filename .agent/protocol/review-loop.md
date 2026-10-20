# Protocol: Review Loop (FASE 4 + FASE 5 iterativa)

> El **Head of Council** delega review al **Worker Reviewer**. Si hay cambios,
> el ciclo Developer → Reviewer se repite hasta aprobar o escalar.

---

## Objetivo

Garantizar que ningún subplan se considere completado sin una review adversarial
independiente del Worker Reviewer, y manejar el ciclo de iteración cuando hay cambios.

---

## FASE 4: Review inicial

### 1. Preparar la delegación al Reviewer

El HOC delega al Worker Reviewer con:
- **El código/diff producido por el WD** (archivos creados/modificados, o git diff).
- **Los criterios de aceptación** del subplan (del plan detallado).
- **El spec original** del subplan (para que el Reviewer sepa qué se pedía).
- **El reporte del WD** (tests, verification results).
- **Preflight de la evidencia (Ley 7):** antes de reenviar, el HOC comprueba que las rutas citadas
  en el reporte del WD existen (`test -f`, archivo regular, y su longitud real) y que los rangos de
  línea citados son válidos; el
  Reviewer hace lo mismo antes de citar cualquier archivo. Una ruta inexistente en el reporte es un
  finding, no un detalle.

> **Preflight del destinatario:** si el despacho al Reviewer falla (`write_agent` →
> *"No eligible recipients"*, agente no admitido, runtime sin método de despacho), es un **bloqueo
> de fase**: se documenta en el thread y se escala al usuario. El HOC no revisa su propio trabajo
> ni el código del WD (Ley 3 + Ley 7, `protocols/tool-preflight.md`).

### 2. Ejecutar la review

El Reviewer realiza su review adversarial (ver `roles/worker-reviewer.md`) y produce
un review-report usando `templates/review-report.md`:
`.agents/communications/<TICKET>_execution/NN_review_subplan-<M>.md`

### 3. Procesar el verdict

| Verdict | Acción del HOC |
|---------|----------------|
| `APPROVE` | **Ir a FASE 5 (ITERATE): emitir el Executive Summary del subplan** (paso obligatorio, Ley 6). Solo después de emitirlo el subplan se marca completado. Si hay más subplanes, avanzar a FASE 3 con el siguiente; si es el último, avanzar a FASE 6 (CLOSE). |
| `REQUEST_CHANGES` | Loop de cambios (sección "Loop de cambios" abajo). |
| `REJECT` | Pausar. Escalar al usuario con el review-report + executive summary en estado `ESCALATED`. |

> **Regla dura:** un `APPROVE` **no** cierra el subplan por sí solo. El subplan queda cerrado
> cuando existe el executive summary. Ver "Cierre del loop: Executive Summary" más abajo.

---

## Loop de cambios (dentro de FASE 3↔4)

Cuando el Reviewer emite `REQUEST_CHANGES`:

### 1. Re-dispatchar al Developer

El HOC crea un nuevo dispatch log:
`.agents/communications/<TICKET>_execution/NN_dispatch_subplan-<M>_revision-<R>.md`

Este dispatch incluye:
- Preflight del destinatario de nuevo (el re-dispatch puede fallar si el WD quedó terminal:
  `No eligible recipients` → un reemplazo acotado con otro modelo disponible, o escalar).
- Referencia al review-report del Reviewer.
- Lista específica de changes solicitados (copiada del review-report).
- Instrucción: "Implementa estos cambios. No expandas el scope."

### 2. Developer implementa cambios

El WD implementa solo los cambios solicitados y reporta al HOC.

### 3. Re-review

El HOC re-delega al Reviewer con:
- El nuevo diff (cambios desde la última revisión).
- Referencia al review-report anterior.
- Pregunta: "¿Los changes solicitados están resueltos?"

### 4. Procesar nuevo verdict

- `APPROVE` → subplan completado.
- `REQUEST_CHANGES` → repetir el loop (revisión R+1).
- `REJECT` → escalar al usuario.

### 5. Límite de iteraciones

Si el loop Developer ↔ Reviewer excede **3 revisiones** sin converger:
- El HOC **pausa** y escala al usuario.
- Reporta: "El subplan <M> no converge después de 3 revisiones. Discrepancia: <summary>."
- El usuario decide: relajar criterios, cambiar el enfoque, o intervenir manualmente.

---

## Conflictos entre Developer y Reviewer

Si el WD **discrepa** con un cambio solicitado por el Reviewer:

1. El WD no ignora el feedback — lo escala al HOC con su argumento.
2. El HOC evalúa:
   - Si el WD tiene razón → el HOC le pide al Reviewer que reconsidere, con el argumento del WD.
   - Si el Reviewer tiene razón → el HOC le pide al WD que implemente el cambio.
   - Si no hay consenso claro → el HOC decide basado en el principio de "producción-safe".
3. En caso de empate técnico → escalar al usuario.

**El HOC es el árbitro.** Pero su inclinación default es Towards quality (lado del Reviewer).

---

## Cierre del loop: Executive Summary (FASE 5 — ITERATE)

> **Este paso es obligatorio.** El loop DEV-REV no está cerrado —y el subplan no está
> completado— hasta que el HOC emita el **Executive Summary** del subplan.

### Por qué existe este artefacto

El review-report responde *"¿es correcto?"*. El executive summary responde *"¿qué pasó, por qué
se decidió así, y qué hay que hacer ahora?"*. Sin él, quien retome el ticket (o el propio HOC en
un subplan posterior) tiene que leer el plan detallado, el dispatch, el reporte del WD, cada
review-report y el diff para reconstruir el razonamiento — y las decisiones tomadas *durante* la
ejecución (las que no estaban en el plan) quedan invisibles aunque hayan determinado el resultado.

### Cuándo se emite

- **Al cerrar el loop de un subplan**: cuando el Reviewer emite `APPROVE`.
- **Una vez por subplan**, no una vez por revisión.
- También se emite en estado `ESCALATED` cuando el loop no converge tras 3 revisiones o hay
  `REJECT` — en ese caso documenta la discrepancia abierta y las opciones para el usuario.

### Quién lo emite

El **Head of Council**. Es el único nodo que ve los outputs del WD y del WR y puede sintetizar el
razonamiento. Los workers no lo escriben, pero **sí lo alimentan**:

| Nodo | Qué aporta obligatoriamente |
|------|------------------------------|
| Worker Developer | Decisiones técnicas tomadas, desviaciones del spec y su razón, hallazgos inesperados, supuestos que resultaron falsos. |
| Worker Reviewer | Razonamiento del verdict, riesgos residuales aceptados, acciones recomendadas. |

### Contrato de contenido

El HOC usa `templates/executive-summary.md`. El documento debe permitir entender el subplan en
**menos de 2 minutos** y contiene, como mínimo:

1. **TL;DR** (≤ 5 bullets): qué se hizo, por qué importa, cómo, qué NO se hizo, qué requiere
   atención humana.
2. **Pedido vs entregado**, con el *delta* de scope explícito y justificado.
3. **El razonamiento**: alternativas evaluadas, por qué se descartaron, evidencia de validación.
4. **Decisiones tomadas**: alternativa descartada + razón + autor + reversibilidad + costo de
   revertir. Las tomadas sin GO previo se marcan *requiere ratificación*.
5. **Historial completo del loop**: todas las revisiones R1..RN, con los issues del Reviewer y
   cómo se cerró cada uno.
6. **Hallazgos inesperados** y **riesgos abiertos / deuda asumida**.
7. **Decisiones accionables**: acciones ejecutables con tipo (decidir / hacer / verificar /
   escalar), owner, urgencia y si bloquea el siguiente subplan. Vacío solo si el subplan cerró
   limpio, y entonces se escribe "ninguna" explícito.
8. **Evidencia** dura: archivos, comandos y resultados literales.

### Checklist de calidad (el HOC lo verifica antes de cerrar)

- [ ] El TL;DR explica qué/por qué/cómo en ≤ 5 bullets.
- [ ] Cada decisión tiene alternativa descartada **y** razón (no basta "se decidió X").
- [ ] Cada riesgo abierto tiene una acción asociada, o justificación explícita de por qué no.
- [ ] Cada acción tiene owner y criterio de verificación.
- [ ] Todas las revisiones del loop están reflejadas, no solo la final.
- [ ] Ninguna afirmación de éxito sin evidencia (comando + resultado) en la sección de evidencia.
- [ ] El documento se entiende sin abrir el review-report.

### Persistencia

`.agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md`

Al cerrar el ticket (FASE 6), el HOC agrega los TL;DR y las decisiones accionables de todos los
executive summaries en el `NN_completion_summary.md`.

---

## Artefactos del review loop

| Artefacto | Path | Obligatorio |
|-----------|------|-------------|
| Review report (cada revisión) | `.agents/communications/<TICKET>_execution/NN_review_subplan-<M>_rev-<R>.md` | Sí |
| Dispatch de cambios | `.agents/communications/<TICKET>_execution/NN_dispatch_subplan-<M>_rev-<R>.md` | Sí |
| Reporte de cambios del WD | `.agents/communications/<TICKET>_execution/NN_report_subplan-<M>_rev-<R>.md` | Sí |
| **Executive summary del subplan** | `.agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md` | **Sí (Ley 6)** |

---

## Gate de subplan completado

Un subplan está completado solo cuando:
- ✅ Existe un review-report con verdict `APPROVE`.
- ✅ Todos los blockers (🔴) del review están resueltos.
- ✅ Los tests pasan.
- ✅ Los verification steps del subplan están en ✅.
- ✅ **Existe el executive summary del subplan y su checklist de calidad está verificado (Ley 6).**
