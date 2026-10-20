<!--
TEMPLATE: Review Report
Fase 4 output. Creado por el Worker Reviewer.
Copiar a: .agents/communications/<TICKET>_execution/NN_review_subplan-<M>.md

Este reporte es el GATE de calidad del subplan. Su razonamiento (secciones "Razonamiento del
verdict", "Riesgos residuales" y "Acciones recomendadas") alimenta el Executive Summary que el
HOC emite al cerrar el loop (HARNESS.md Ley 6) — no las omitas.
-->

# Review: Subplan <M> --- <name>

| Field | Value |
|-------|-------|
| **Ticket** | <TICKET> |
| **Subplan** | <M> --- <name> |
| **Reviewer** | Worker Reviewer |
| **Date** | <YYYY-MM-DD> |
| **Revision** | 1 (incrementar si es re-review despues de cambios) |
| **Verdict** | APPROVE / REQUEST_CHANGES / REJECT |

---

## Summary

<1-2 oraciones: el subplan cumple? Hay issues?>

## Findings

### Blockers (must fix before approve)
- [ ] [B1] <archivo:linea> --- <descripcion del problema>

### Warnings (should fix, not blocking)
- [ ] [W1] <archivo:linea> --- <descripcion>

### Suggestions (optional improvements)
- [ ] [S1] <descripcion>

## Test assessment

- Tests creados: <N>
- Calidad: <suficiente / insuficiente>
- Edge cases cubiertos: <si / no --- cuales faltan?>

## Acceptance criteria check

| Criterion | Met? | Notes |
|-----------|------|-------|
| <criterion 1> | yes/no | <notas> |
| <criterion 2> | yes/no | <notas> |
| <criterion 3> | yes/no | <notas> |

## Preflight de lectura (Ley 7)

| Archivo | Existe? | Lineas (N) | Rango revisado | Clamp aplicado |
|---------|---------|------------|----------------|----------------|
| `<path>` | si/no | <N> | <start-end> | <ninguno / si: end->N> |

<Si algun archivo citado en el dispatch o en el reporte del WD no existe, o no pudo leerse completo:
decirlo aqui. Un verdict `APPROVE` exige lectura completa y verificada de lo que se aprueba.>

## Razonamiento del verdict (OBLIGATORIO)

> El HOC lo consume para el Executive Summary del subplan (HARNESS.md Ley 6). No lo omitas.

<Por que este verdict y no otro. Que evidencia concreta lo sustenta. Que asumiste para llegar
ahi. Que te habria hecho cambiar de opinion.>

**Evidencia que sustenta el verdict:**
- <test / comando / lectura de codigo concreta>

**Lo que NO pudiste verificar:** <o "nada relevante">

## Riesgos residuales aceptados (obligatorio si APPROVE)

| Riesgo | Por que es aceptable | Accion que deberia registrarse |
|--------|----------------------|--------------------------------|
| <descripcion> | <razon> | <accion para el usuario, o "ninguna"> |

## Acciones recomendadas para el usuario

> Que crees que el usuario deberia decidir o verificar, desde tu posicion de revisor
> independiente. El HOC las incorpora a las decisiones accionables del executive summary.
> Si no hay ninguna: escribir "ninguna".

- [ ] <accion concreta> — urgencia: <ahora / antes de merge / backlog>

## Verdict

**<APPROVE / REQUEST_CHANGES / REJECT>**

<Justificacion del verdict en 2-3 oraciones.>

## Action items (si no es APPROVE)

- [ ] [B1] <cambio especifico requerido>
- [ ] [B2] <cambio especifico requerido>
