<!--
TEMPLATE: Dispatch Log
Fase 3 output. Creado por el Head of Council al delegar a un worker.
Copiar a: .agents/communications/<TICKET>_execution/NN_dispatch_subplan-<M>.md
-->

# Dispatch: Subplan <M> -> <Worker>

| Field | Value |
|-------|-------|
| **Ticket** | <TICKET> |
| **Subplan** | <M> --- <name> |
| **Worker** | Worker Developer / Worker Reviewer / Worker Architect |
| **Date** | <YYYY-MM-DD> |
| **From** | Head of Council |
| **Revision** | 1 (incrementar si es re-dispatch por cambios del reviewer) |

> **Recordatorio de cierre (Ley 6):** cuando este subplan reciba `APPROVE` del Reviewer, el HOC
> debera emitir el **Executive Summary** del subplan antes de cerrarlo y antes de despachar el
> siguiente. Pide al worker el razonamiento en el dispatch, no despues.

---

## Preflight (Ley 7 --- obligatorio: rellenar ANTES de despachar)

| Check | Comando / fuente | Resultado |
|-------|------------------|-----------|
| Destinatario existe y esta disponible | lista real de agentes del runtime | <si/no --- identificador exacto usado> |
| Metodo de despacho | in-process `task` / headless runner / `write_agent` | <cual> |
| Archivos del spec existen | `test -f <path> && awk 'END{print NR}' <path>` | <OK: N lineas / MISSING: ...> |
| Rangos de linea validos | `1 <= start <= end <= N` | <normalizado / clamp aplicado / n/a> |
| Herramientas requeridas disponibles | lista de herramientas del runtime | <todas / faltan: ...> |

**Si el despacho falla** (ej: `write_agent` -> `No eligible recipients`): registrar aqui la senal,
el reintento acotado y el metodo alternativo usado. Si no existe destinatario posible, escribir
`BLOQUEO DE FASE --- escalado al usuario` y **no** continuar con auto-implementacion (Ley 3 + Ley 7).

---

## Spec

<Copiar la especificacion del subplan desde el execution plan.>

### Files to create
- `path/to/file.py` --- <descripcion>

### Files to modify
- `path/to/file.py` --- <que se cambia>

### Key functions/classes
- `function_name(args) -> return` --- <que hace>

### Tests required
- `test_function_name()` --- minimo N casos

### Verification steps
- `<comando>` -> esperado: <resultado>

---

## Context

<Contexto adicional que el worker necesita:>
- Referencias a codigo existente que sirve de pattern.
- Constraints explicitos (no modificar X, seguir pattern Y).
- Decisions ya tomadas que afectan este subplan.

## Deliverables

- [ ] <archivo 1>
- [ ] <archivo 2>
- [ ] Tests: <N> casos, todos pasando
- [ ] Verification: <comando> -> <resultado>
- [ ] **Reporte con decisiones tecnicas y razonamiento** (decisiones tomadas + alternativas
      descartadas + desviaciones del spec + hallazgos inesperados + supuestos falsos).
      Obligatorio: es la materia prima del Executive Summary del subplan (HARNESS.md Ley 6).

---

## Notes

<Cualquier instruccion especial para este dispatch.>
