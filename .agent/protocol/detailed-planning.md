# Protocol: Detailed Planning (FASE 2)

> El **Head of Council** + **Workers** co-crean el Plan Detallado de Ejecución.

---

## Objetivo

Transformar el Plan Estratégico (high-level) en un **Plan Detallado de Ejecución** que
especifique cada Commit Subplan a nivel de: archivos, funciones, tests, verification steps
y criterios de aceptación. Este plan es la **guía de ejecución** del proyecto.

---

## Pasos

### 1. Delegar aportes de workers (en paralelo si es posible)

El HOC delega a cada worker un aporte específico para el plan detallado:

| Worker | Aporte esperado |
|--------|----------------|
| **Worker Architect** (si activo) | Validar el enfoque técnico del plan estratégico. Identificar riesgos de arquitectura. Sugerir patterns. |
| **Worker Developer** | Estimar complejidad por subplan. Identificar dependencias entre subplanes. Sugerir orden óptimo de ejecución. Validar que los subplanes son factibles. |
| **Worker Reviewer** | Definir **criterios de aceptación** por subplan. ¿Qué debe cumplir el código para que el Reviewer lo apruebe? |

Cada delegación produce un dispatch log y un reporte que se persiste en el thread. Antes de cada
una aplica el **preflight de delegación** (Ley 7; Regla 5 de `protocols/tool-preflight.md`, paso 0 de
`protocols/delegation.md`): destinatario
elegible y disponible, registrado en el dispatch log. Si un worker no está disponible, el aporte no
se improvisa: se escala al usuario.

### 2. Sintetizar aportes

El HOC lee todos los reportes de los workers y:
- Integra sus aportes en un plan cohesivo.
- Resuelve conflictos (si el Architect y el Developer discrepan, el HOC decide o escala).
- Identifica dependencias entre subplanes (¿cuáles pueden paralelizarse?).

### 3. Especificar cada Commit Subplan

Por cada subplan, el plan detallado debe especificar:

```markdown
### Subplan <M>: <name>

**Depends on:** Subplan <X> (o "none")
**Risk level:** low / medium / high
**Commit type:** feat / fix / chore / refactor

**Files to create:**
- `path/to/new_file.py` — descripción

**Files to modify:**
- `path/to/existing.py` — qué se cambia

**Key functions/classes:**
- `function_name(args) -> return` — qué hace

**Tests required:**
- `test_function_name()` — casos mínimos (≥ N)
- Cobertura de edge cases: None, empty, boundary

**Verification steps:**
- `python3 -m unittest ...` → esperado: N tests, 0 failures
- `python3 -m json.tool <config>` → esperado: parse OK

**Acceptance criteria (para Reviewer):**
- [ ] criterion 1
- [ ] criterion 2
- [ ] criterion 3
```

### 4. Definir el orden de ejecución

- Identificar qué subplanes pueden ejecutarse en paralelo (sin dependencias).
- Agrupar en **batches** (Batch A: subplanes 1+2 en paralelo, Batch B: subplanes 3+4, etc.).
- El plan detallado incluye un diagrama de dependencias.

### 5. Escribir el plan detallado
- Usar `templates/execution-plan.md`.
- Guardar en `.agents/plans/<TICKET>_execution_plan.md`.
- Enlazar desde el thread header.

### 6. Presentar al usuario (GATE opcional)
- Si el plan detallado cambia significativamente el alcance del plan estratégico, confirmar con el usuario.
- Si solo agrega detalle, se puede proceder a ejecución.

---

## Artefactos producidos

| Artefacto | Path |
|-----------|------|
| Dispatch logs (worker aportes) | `.agents/communications/<TICKET>_execution/NN_dispatch_planning_<worker>.md` |
| Worker reports (aportes) | `.agents/communications/<TICKET>_execution/NN_report_<worker>.md` |
| Plan detallado de ejecución | `.agents/plans/<TICKET>_execution_plan.md` |

## Gate de salida

- ✅ Plan detallado existe con todos los Commit Subplanes especificados.
- ✅ Cada subplan tiene criterios de aceptación.
- ✅ Orden de ejecución definido (con batches de paralelización si aplica).
- ✅ Workers han aportado (registrado en thread).

→ Avanza a FASE 3 (EXECUTE) con el primer subplan/batch.
