<!--
TEMPLATE: Strategic Plan
Fase 1 output. Creado por el Head of Council.
Copiar a: .agents/plans/<TICKET>_strategic_plan.md
-->

# Strategic Plan --- <TICKET>: <Title>

| Field | Value |
|-------|-------|
| **Ticket** | <TICKET> |
| **Title** | <one-line description> |
| **Date** | <YYYY-MM-DD> |
| **Author** | Head of Council |
| **Status** | Draft / Confirmed |
| **Source** | <link to PRD, research notes, or user request> |

---

## 1. Context & Objective

<Que hay que construir/cambiar y por que? 2-3 parrafos.>

**Goal:** <una oracion que defina el exito>

## 2. Scope

### In scope
- <item 1>
- <item 2>

### Out of scope
- <item 1>
- <item 2>

## 3. Commit Subplanes (breakdown)

| # | Name | Description | Risk | Depends on |
|---|------|-------------|------|------------|
| 1 | `<name>` | <breve descripcion> | low | none |
| 2 | `<name>` | <breve descripcion> | low | 1 |
| 3 | `<name>` | <breve descripcion> | medium | 2 |
| 4 | `<name>` | <breve descripcion> | high | 3 |

### Execution order

<Describir el orden y que batches pueden paralelizarse.>

## 4. Workers

| Role | Worker | Activado | Skill BMAD |
|------|--------|----------|------------|
| Head of Council | (yo) | siempre | bmad-orchestrator |
| Worker Developer | <nombre> | siempre | bmad-quick-dev |
| Worker Reviewer | <nombre> | siempre | bmad-code-review |
| Worker Architect | <nombre> | opcional | bmad-agent-architect |
| Worker Tester | <nombre> | opcional | bmad-tea |

## 5. Risks & Mitigations

| ID | Risk | Severity | Mitigation |
|----|------|----------|------------|
| R1 | <riesgo> | medium | <mitigacion> |
| R2 | <riesgo> | high | <mitigacion> |

## 6. Open questions

1. <pregunta para el usuario o architect>
2. <pregunta>

## 7. Success criteria

El proyecto esta completo cuando:
- [ ] Todos los Commit Subplanes tienen review APPROVE.
- [ ] Tests pasan.
- [ ] <criterio especifico del proyecto>.
- [ ] <criterio especifico del proyecto>.

---

## User confirmation

- [ ] Usuario ha confirmado este plan estrategico.
- [ ] Fecha de confirmacion: <YYYY-MM-DD>
