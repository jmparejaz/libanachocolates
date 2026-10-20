# Protocol: Delegation (FASE 3)

> El **Head of Council** delega un Commit Subplan al **Worker Developer**.

---

## Objetivo

Transferir la responsabilidad de implementación de un subplan al Worker Developer,
con un spec suficientemente preciso para que el WD no tenga que adivinar.

---

## Pasos

### 0. Preflight del destinatario (Ley 7 — obligatorio)

Antes de escribir el dispatch, verifica que el destinatario **existe y está disponible en el
runtime actual** (no en el plan estratégico). Registra en el dispatch log el rol, el identificador
exacto usado, el método de despacho y el resultado del preflight.

| Señal del runtime | Acción obligatoria |
|-------------------|--------------------|
| `write_agent` → `No eligible recipients` | lista los agentes realmente disponibles; reintenta **una** vez contra un destinatario válido; si sigue sin destinatario, cambia de método (in-process `task` / headless runner) |
| agente admitido pero sin progreso | aplica `.agents/docs/worker_watchdog_protocol.md` (900 s de presupuesto total) y escala si expira |
| worker terminal sin reporte | registra el fallo; permite **un** reemplazo acotado (mismo scope, otro modelo disponible) |
| runtime sin subagentes / sin método de despacho | **escala al usuario**. El HOC no implementa |

**Prohibido:** reinterpretar `No eligible recipients` como "el worker no hacía falta" y caer en
auto-implementación. Un fallo de delegacion que impide el gate de EXECUTE es un **bloqueo de fase**:
se documenta en el thread, se escala y el subplan no se marca completado.

### 1. Preparar el dispatch

El HOC extrae del Plan Detallado de Ejecución la especificación del subplan a ejecutar.

### 2. Crear el dispatch log

Usar `templates/dispatch-log.md`. Guardar como:
`.agents/communications/<TICKET>_execution/NN_dispatch_subplan-<M>.md`

El dispatch log contiene:
- **Subplan ID y nombre.**
- **Spec completo** (archivos, funciones, tests, verification) — copiado del plan detallado.
- **Contexto adicional** que el WD necesita:
  - Referencias a código existente que sirve de pattern.
  - Constraints explícitos ("no modificar X", "seguir pattern Y").
  - Decisions ya tomadas que afectan este subplan.
- **Deliverables esperados** (lista concreta de archivos + test results).
- **Worker al que se delega** (Worker Developer).

### 3. Ejecutar la delegación

Según el CLI agent disponible:

| Método | Cuándo |
|--------|--------|
| **In-process subagent** (`task(mode=background, subagent=general-purpose)`) | Subplan rápido (< 5 min), no necesita aislamiento. |
| **Headless subagent** (`bmad-headless-runner` → copilot/adal CLI) | Subplan largo, necesita aislamiento en worktree, o debe sobrevivir entre sesiones. |
| **Skill BMAD** (`bmad-quick-dev`) | Cuando el subplan encaja en el flow de quick-dev (clarify → plan → implement → review → present). |

Independiente del método, el prompt que se le pasa al worker incluye:
1. El system prompt del rol: `.agent/harness/roles/worker-developer.md`
2. El spec del subplan (del dispatch log).
3. El contexto del proyecto (AGENTS.md, plans relevantes).

### 4. Recibir el reporte del WD

El WD devuelve:
- Archivos creados/modificados.
- Test results.
- Verification results.
- Notes (desviaciones, problemas).

### 5. Persistir el reporte

El HOC guarda el reporte del WD en el thread:
`.agents/communications/<TICKET>_execution/NN_report_subplan-<M>_dev.md`

### 6. Avanzar a FASE 4 (REVIEW)

El HOC prepara la delegación al Worker Reviewer con el output del WD.

---

## Delegación paralela

Si el plan detallado define un **batch** de subplanes independientes:
- El HOC crea un dispatch log por cada subplan.
- Delega todos en paralelo (Promise.all / background subagents).
- Espera todos los reportes antes de avanzar al batch de reviews.

---

## Manejo de bloqueos del WD

Si el WD reporta que no puede completar el subplan:

| Razón | Acción del HOC |
|-------|----------------|
| Spec ambiguo | Clarifica el spec, actualiza el dispatch log, re-delega. |
| Scope creep detectado | Detiene, evalúa si el plan detallado necesita actualización. |
| Bloqueo técnico externo (ej: dependencia rota) | Escala al usuario. |
| Discrepa con una decisión del plan | Escucha al WD, decide, o escala al usuario si es arquitectural. |
| **El destinatario no está disponible** (no eligible recipients, no admitido, runtime sin despacho) | Declara el bloqueo de fase en el thread y **escala al usuario**. El HOC no toma el rol del WD (Ley 3 + Ley 7). |
| El worker no puede leer un archivo (ruta/rango inválido) | Exige el preflight (Ley 7). Si la ruta viene del dispatch, corrige el dispatch: el spec citaba una ruta inexistente. |

**El HOC nunca deja al WD "atascado".** Si el WD no puede avanzar, el HOC actúa.
