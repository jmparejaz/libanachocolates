# Graph Topology — Directed Role Graph

> Define los **nodos** (roles) y **aristas** (relaciones de delegación/review) del grafo
> que el CLI coding agent debe seguir. Este es el grafo enforced por el harness.

---

## Nodos

### Nodos obligatorios (siempre presentes)

| ID | Rol | Descripción | Skill BMAD asociado |
|----|-----|-------------|---------------------|
| `HOC` | **Head of Council** | Orquestador. Planifica, delega, sintetiza, persiste. Nunca escribe código. | `bmad-orchestrator`, `bmad-agent-pm` |
| `WD` | **Worker Developer** | Implementa código + tests a partir de specs. Produce commits. | `bmad-quick-dev`, `bmad-dev-story` |
| `WR` | **Worker Reviewer** | Revisa adversarialmente. Emite verdict: approve / request-changes / reject. | `bmad-code-review`, `bmad-review-adversarial-general` |

### Nodos opcionales (según necesidad del proyecto)

| ID | Rol | Cuándo activar | Skill BMAD asociado |
|----|-----|----------------|---------------------|
| `WA` | Worker Architect | Proyectos con decisiones de arquitectura no triviales | `bmad-agent-architect` (Winston) |
| `WT` | Worker Tester | Proyectos que requieren test strategy o ATDD | `bmad-tea` (Murat), `bmad-testarch-*` |
| `WR` | Worker Researcher | Proyectos que requieren research previo (domain/market/technical) | `bmad-domain-research`, `bmad-technical-research` |

---

## Aristas (relaciones dirigidas)

### Aristas de delegación (Head of Council → Worker)

```
HOC ──delegates──► WD    (implementa subplan)
HOC ──delegates──► WR    (revisa output del WD)
HOC ──delegates──► WA    (valida arquitectura — opcional)
HOC ──delegates──► WT    (diseña tests — opcional)
HOC ──delegates──► WR    (research previo — opcional)
```

**Regla:** Toda arista de delegación produce un artefacto persistente:
- Dispatch: `NN_dispatch_<worker>.md` en `.agents/communications/<TICKET>_execution/`
- Result: el worker devuelve findings/código/verdict al HOC.

### Aristas de retorno (Worker → Head of Council)

```
WD ──reports──► HOC    (código + tests + verification log
                       + decisiones técnicas y razonamiento)
WR ──reports──► HOC    (review-report.md con verdict
                       + razonamiento del verdict + riesgos residuales + acciones recomendadas)
WA ──reports──► HOC    (architecture review / approval)
WT ──reports──► HOC    (test plan / test results)

**Regla adicional:** los reports de WD y WR deben incluir el *razonamiento* de sus decisiones,
no solo el resultado. El HOC los consume para emitir el Executive Summary del subplan (Ley 6);
un report que solo diga "quedó listo, tests pasan" obliga al HOC a interpretar y degrada el
executive summary.
```

### Aristas de coordinación (Worker ↔ Worker — mediadas por HOC)

```
WD ──(via HOC)──► WR    (el output del WD llega al WR para review)
WR ──(via HOC)──► WD    (los cambios solicitados por el WR llegan al WD)
```

**Regla:** Los workers **nunca se comunican directamente**. Toda comunicación entre workers
pasa por el Head of Council, que la persiste en el thread de comunicación. Esto garantiza
auditabilidad y evita conversaciones paralelas no rastreables.

---

## Grafo visual completo

```
                         ┌─────────────────────────┐
                         │     HEAD OF COUNCIL     │
                         │      (orchestrator)     │
                         │  - Plan estratégico     │
                         │  - Plan detallado       │
                         │  - Delega + sintetiza   │
                         │  - Persiste todo        │
                         └──┬─────┬─────┬─────┬────┘
                            │     │     │     │
              ┌─────────────┘     │     │     └─────────────┐
              ▼                   ▼     ▼                   ▼
     ┌────────────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────────┐
     │ WORKER         │  │ WORKER       │  │ WORKER     │  │ WORKER       │
     │ DEVELOPER      │  │ REVIEWER     │  │ ARCHITECT  │  │ TESTER       │
     │                │  │              │  │ (optional) │  │ (optional)   │
     │ - Implementa   │  │ - Review     │  │ - Valida   │  │ - Test plan  │
     │ - Tests        │  │   adversarial│  │   diseño   │  │ - ATDD       │
     │ - Commits      │  │ - Verdict    │  │ - Riesgos  │  │ - Coverage   │
     └───────┬────────┘  └──────┬───────┘  └─────┬──────┘  └──────┬───────┘
             │                  │                │                │
             └──────► HOC ◄─────┘◄───────────────┘◄───────────────┘
                      │
                      ▼
              ┌───────────────┐
              │    USER       │
              │ (human gate)  │
              └───────────────┘
```

---

## Reglas de topología

1. **El HOC es el único nodo que habla con el usuario.** Workers no se dirigen al usuario
   directamente; sus outputs llegan al HOC que los sintetiza y presenta.

2. **Toda delegación es explícita y persistida.** No existe "delegación implícita". El HOC
   debe escribir un dispatch log antes de delegar.

3. **El Reviewer es el gate de calidad.** Ningún subplan avanza a "completado" sin verdict
   del Reviewer. El HOC no puede auto-aprobar.

4. **El grafo puede expandirse pero no contraerse por debajo del mínimo.** Siempre hay
   HOC + WD + WR. Workers opcionales se activan declarándolos en el plan estratégico.

5. **Ciclo de vida de un subplan:**
   ```
   HOC dispatches → WD implements → WD reports → HOC forwards to WR → WR reviews
                                                                            │
                                                                    ┌───────┴───────┐
                                                                    ▼               ▼
                                                              APPROVE         REQUEST-CHANGES
                                                                  │               │
                                                                  ▼               ▼
                                                   EXECUTIVE SUMMARY      HOC re-dispatches to WD
                                                   del subplan (Ley 6)
                                                                  │
                                                                  ▼
                                                            SUBPLAN DONE  →  siguiente subplan
   ```

6. **El loop DEV-REV siempre retorna un Executive Summary.** Cuando el subplan alcanza
   `APPROVE`, el HOC emite —antes de dar el subplan por cerrado y antes de despachar el
   siguiente— el executive summary del subplan (`templates/executive-summary.md`,
   `.agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md`), con el
   razonamiento y las decisiones accionables. Es el artefacto que hace el grafo *navegable*:
   sin él, el porqué de las decisiones vive solo en la cabeza del HOC y en el diff. Si el loop
   escala (`REJECT` o 3 revisiones sin converger), el summary se emite igualmente en estado
   `ESCALATED`. Enforced en `checks/phase-gates.yaml`, fase `iterate` (HARNESS.md Ley 6).

7. **Toda arista de delegación exige un destinatario elegible.** El HOC verifica que el nodo
   destino existe y está disponible en el runtime **antes** de despachar (`protocols/tool-preflight.md`,
   Ley 7). Si la arista no se puede recorrer (`write_agent` → *"No eligible recipients"*, agente no
   admitido, runtime sin método de despacho), el HOC **no** colapsa dos roles en sí mismo: declara el
   bloqueo de fase y escala al usuario. Colapsar HOC y WD/WR viola la Ley 3 y destruye la
   auditabilidad del grafo.
