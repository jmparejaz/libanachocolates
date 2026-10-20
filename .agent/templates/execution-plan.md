<!--
TEMPLATE: Execution Plan (Detailed)
Fase 2 output. Co-creado por Head of Council + Workers.
Copiar a: .agents/plans/<TICKET>_execution_plan.md
-->

# Execution Plan --- <TICKET>: <Title>

| Field | Value |
|-------|-------|
| **Ticket** | <TICKET> |
| **Date** | <YYYY-MM-DD> |
| **Author** | Head of Council (co-created with workers) |
| **Status** | Draft / Confirmed |
| **Strategic plan** | `.agents/plans/<TICKET>_strategic_plan.md` |

---

## Dependency graph

```
Subplan 1 --> Subplan 2 --+--> Subplan 4 --> Subplan 6
                           |
Subplan 3 ----------------+
```

## Execution batches

| Batch | Subplanes | Paralelizable |
|-------|-----------|---------------|
| A | 1, 2 | si |
| B | 3, 4 | si |
| C | 5 | secuencial |
| D | 6 | secuencial |

---

## Subplans

### Subplan 1: `<name>`

| Field | Value |
|-------|-------|
| **Depends on** | none |
| **Risk** | low |
| **Commit type** | feat |

**Files to create:**
- `path/to/new_file.py` --- <descripcion>

**Files to modify:**
- `path/to/existing.py` --- <que se cambia>

**Key functions/classes:**
- `function_name(args) -> return` --- <que hace>

**Tests required:**
- `test_function_name()` --- minimo N casos
- Edge cases: None, empty, boundary

**Verification steps:**
- `python3 -m unittest ...` -> esperado: N tests, 0 failures
- <otro step>

**Acceptance criteria (para Reviewer):**
- [ ] <criterion 1>
- [ ] <criterion 2>
- [ ] <criterion 3>

---

### Subplan 2: `<name>`

<!-- Repetir estructura de Subplan 1 -->

---

## Worker contributions log

| Worker | Contribution | File |
|--------|-------------|------|
| Worker Architect | Architecture validation | `.agents/communications/<TICKET>_execution/02_report_architect.md` |
| Worker Developer | Complexity estimation + dependencies | `.agents/communications/<TICKET>_execution/03_report_developer.md` |
| Worker Reviewer | Acceptance criteria per subplan | `.agents/communications/<TICKET>_execution/04_report_reviewer.md` |

## Progress log

| Subplan | Dispatched | Dev report | Review verdict | Status |
|---------|-----------|------------|----------------|--------|
| 1 | pending | pending | pending | pending |
| 2 | pending | pending | pending | pending |
| 3 | pending | pending | pending | pending |
