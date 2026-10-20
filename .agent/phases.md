# Phases — Enforced Phase Sequence

> Define la secuencia **obligatoria** de fases que el Head of Council debe ejecutar.
> Ninguna fase puede saltarse. Los gates estructurales (`checks/phase-gates.yaml`) validan
> que los artefactos requeridos existan antes de avanzar.

---

## Diagrama de fases

```
┌─────────┐   ┌────────────┐   ┌────────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────┐
│  FASE 0 │──►│   FASE 1   │──►│   FASE 2   │──►│  FASE 3  │──►│  FASE 4  │──►│  FASE 5  │──►│ FASE 6 │
│  BOOT   │   │ STRATEGIC  │   │  DETAILED  │   │ EXECUTE  │   │  REVIEW  │   │ ITERATE  │   │ CLOSE  │
└─────────┘   └────────────┘   └────────────┘   └──────────┘   └──────────┘   └──────────┘   └────────┘
                     │                 │              ▲              │              │
                     ▼                 ▼              │              ▼              ▼
                [USER GATE]       [WORKERS          ┌───────┐   APPROVE?      EXECUTIVE SUMMARY
                confirmar plan   co-crean plan]      │ LOOP  │   REQUEST_CHANGES?   del subplan (Ley 6)
                                                      └───────┘   → back to FASE 3   → next subplan
                                                                                      → FASE 6 si es el último
```

---

## FASE 0 — BOOT

**Propósito:** Cargar el harness y preparar el contexto.

**Acciones del Head of Council:**
1. Leer `.agent/harness/HARNESS.md` (la constitución).
2. Leer `.agent/harness/graph/topology.md` (el grafo).
3. Leer `.agent/harness/roles/head-of-council.md` (su system prompt).
4. Leer `AGENTS.md` (raíz) para contexto del workspace.
5. Leer `protocols/tool-preflight.md` (Ley 7) y verificar la **superficie de herramientas** del
   runtime actual: qué herramientas existen realmente. Los planes y prompts no son fuente de
   verdad de la superficie de herramientas.
6. Identificar el ticket/proyecto y crear el thread de comunicación:
   `.agents/communications/<TICKET>_execution/00_thread_header.md`

**Gate para avanzar a FASE 1:**
- ✅ Thread header creado.
- ✅ HOC ha anunciado su identidad: "Soy el Head of Council."

---

## FASE 1 — STRATEGIC PLANNING

**Propósito:** El Head of Council crea el **Plan Estratégico** — visión, alcance, desglose
en subplanes, riesgos. **El HOC hace esto solo** (con input del usuario), sin workers aún.

**Acciones:**
1. Entender la tarea del usuario.
2. Usar `templates/strategic-plan.md` para crear `.agents/plans/<TICKET>_strategic_plan.md`.
3. El plan debe incluir:
   - Objetivo y contexto.
   - Desglose en **Commit Subplans** (cada uno independiente, reversible, testeable).
   - Riesgos y mitigaciones.
   - Workers necesarios (mínimo: WD + WR; opcionales: WA, WT, etc.).
4. Presentar el plan al usuario para **confirmación**.

**Protocolo detallado:** `protocols/strategic-planning.md`

**Gate para avanzar a FASE 2:**
- ✅ `<TICKET>_strategic_plan.md` existe en `.agents/plans/`.
- ✅ Usuario ha confirmado el plan (o el HOC ha iterado hasta confirmación).
- ✅ Lista de Commit Subplanes definida.

---

## FASE 2 — DETAILED PLANNING (co-creación con workers)

**Propósito:** El Head of Council y los workers **co-crean** el **Plan Detallado de Ejecución**
que será la guía para completar el proyecto. Este plan especifica cada subplan a nivel de
archivo, función, test y verification step.

**Acciones:**
1. El HOC delega a workers (en paralelo si es posible) para que aporten:
   - **Worker Architect (si activo):** validación técnica del plan estratégico, riesgos.
   - **Worker Developer:** estimación de complejidad, dependencias, orden óptimo.
   - **Worker Reviewer:** definición de criteria de aceptación por subplan.
2. El HOC sintetiza los aportes en `.agents/plans/<TICKET>_execution_plan.md` usando
   `templates/execution-plan.md`.
3. Cada Commit Subplan en el plan detallado debe especificar:
   - Archivos a crear/modificar.
   - Funciones/clases principales.
   - Tests requeridos.
   - Verification steps.
   - Criterios de aceptación para el Reviewer.
4. El plan detallado se persiste y se enlaza en el thread header.

**Protocolo detallado:** `protocols/detailed-planning.md`

**Gate para avanzar a FASE 3:**
- ✅ `<TICKET>_execution_plan.md` existe con todos los Commit Subplanes especificados.
- ✅ Cada subplan tiene criterios de aceptación definidos.
- ✅ Workers han aportado (registrado en el thread de comunicación).

---

## FASE 3 — EXECUTE (delegación a Worker Developer)

**Propósito:** El Head of Council delega un Commit Subplan al Worker Developer para
implementación. **Un subplan a la vez** (o en paralelo solo si son independientes y el
plan lo indica).

**Acciones:**
1. El HOC crea un dispatch log usando `templates/dispatch-log.md`:
   `.agents/communications/<TICKET>_execution/NN_dispatch_subplan-<M>.md`
2. El HOC delega al Worker Developer con:
   - El spec del subplan (extraído del plan detallado).
   - Contexto relevante (referencias al código, patterns a seguir).
   - Constraints (no modificar X, seguir pattern Y).
3. El Worker Developer:
   - Implementa el código + tests.
   - Ejecuta verification steps.
   - Reporta resultados al HOC (archivos creados, test results, commit SHA).
4. El HOC persiste el reporte del WD en el thread.

**Protocolo detallado:** `protocols/delegation.md`

**Gate para avanzar a FASE 4:**
- ✅ Dispatch log creado **con la sección Preflight rellenada** (destinatario elegible y disponible,
  archivos del spec verificados: existencia + longitud).
- ✅ Worker Developer ha reportado resultados.
- ✅ Verification steps del subplan ejecutados (tests pasan).

> Si el destinatario no estaba disponible (ej: `write_agent` → *"No eligible recipients"*), este
> gate **no** se puede cumplir: es un bloqueo de fase. El HOC lo documenta en el thread y escala al
> usuario. Nunca cumple el gate implementando él mismo el subplan (Ley 3 + Ley 7).

---

## FASE 4 — REVIEW (delegación a Worker Reviewer)

**Propósito:** El Head of Council delega al Worker Reviewer para revisar adversarialmente
el output del Worker Developer. El Reviewer **no es el HOC** — es un nodo independiente.

**Acciones:**
1. El HOC delega al Worker Reviewer con:
   - El diff/código producido por el WD.
   - Los criterios de aceptación del subplan.
   - El contexto del subplan.
2. El Worker Reviewer verifica primero la **existencia y la longitud** de cada archivo que va a
   citar (preflight de lectura, Ley 7) y normaliza los rangos; una lectura incompleta no puede
   producir un `APPROVE`.
3. El Worker Reviewer usa `templates/review-report.md` para producir:
   `.agents/communications/<TICKET>_execution/NN_review_subplan-<M>.md`
4. El Reviewer emite un **verdict**:
   - `APPROVE` — el subplan cumple los criterios. Avanza.
   - `REQUEST_CHANGES` — hay issues menores. El WD debe corregir. Loop a FASE 3.
   - `REJECT` — hay issues graves. Escalar al HOC + usuario. Re-planificar.

**Protocolo detallado:** `protocols/review-loop.md`

**Gate para avanzar:**
- ✅ Review report existe con verdict.
- Si `APPROVE`: ir a FASE 5 (ITERATE) — **no** se avanza directo al siguiente subplan.
- Si `REQUEST_CHANGES`: loop a FASE 3 con los cambios solicitados.
- Si `REJECT`: pausar, escalar al usuario.

---

## FASE 5 — ITERATE (cierre del loop DEV-REV + Executive Summary)

**Propósito:** Cerrar formalmente el loop Developer → Reviewer del subplan. El loop termina
cuando el Reviewer emite `APPROVE`; en ese momento el HOC **produce el Executive Summary del
subplan** (Ley 6 de `HARNESS.md`) y solo entonces el subplan pasa a *completado* y se avanza.

> El Executive Summary es el artefacto que hace **navegable el razonamiento**. El review-report
> responde *"¿es correcto?"*; el executive summary responde *"¿qué pasó, por qué se decidió así,
> y qué hay que hacer ahora?"*. Sin él, entender un subplan obliga a leer el plan detallado, el
> dispatch, el reporte del WD, cada review-report y el diff — y las decisiones tomadas durante la
> ejecución quedan invisibles.

**Acciones:**
1. El HOC consolida el historial del loop: todas las revisiones R1..RN, con los issues que el
   Reviewer levantó en cada una y cómo se cerraron.
2. El HOC recoge de los workers el material de razonamiento que alimenta el summary:
   - del **Worker Developer**: decisiones técnicas tomadas, desviaciones del spec y por qué,
     hallazgos inesperados, supuestos que resultaron falsos.
   - del **Worker Reviewer**: razonamiento del verdict, riesgos residuales aceptados y acciones
     que recomienda.
3. El HOC emite el executive summary con `templates/executive-summary.md` en:
   `.agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md`
4. El HOC verifica el **checklist de calidad** incluido al final de la plantilla antes de cerrar
   (TL;DR ≤ 5 bullets; cada decisión con alternativa descartada y razón; cada riesgo de §7 con
   acción en §8 o "ninguna"; todas las revisiones reflejadas; ninguna afirmación de éxito sin
   evidencia).
5. Con el summary emitido y el checklist verde:
   - si quedan subplanes → FASE 3 con el siguiente subplan;
   - si era el último → FASE 6 (CLOSE).
6. Si el loop no converge tras **3 revisiones**, o hay `REJECT`: pausar y escalar al usuario con
   el executive summary en estado `ESCALATED` (documentando la discrepancia sin resolver).

**Protocolo detallado:** `protocols/review-loop.md`

**Gate para avanzar:**
- ✅ Existe `.agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md`.
- ✅ El summary tiene TL;DR, decisiones con razonamiento, historial del loop y §8 de decisiones
  accionables (con acciones o "ninguna" explícito).
- ✅ Checklist de calidad de la plantilla verificado por el HOC.
- ✅ Ninguna decisión tomada sin GO previo quedó sin marcar como *requiere ratificación*.

---

## FASE 6 — CLOSE

**Propósito:** Todos los Commit Subplanes han sido implementados, aprobados y **documentados con
su executive summary**. Cierre formal.

**Acciones:**
1. El HOC verifica que todos los subplanes del plan detallado tengan verdict `APPROVE`
   **y** executive summary emitido (Ley 6).
2. El HOC crea un summary de cierre en el thread:
   `.agents/communications/<TICKET>_execution/NN_completion_summary.md`
   — agregando los TL;DR y las decisiones accionables de todos los subplanes (esta es la vista
   ejecutiva del ticket completo).
3. El HOC presenta al usuario:
   - Lista de commits landed.
   - Test results finales.
   - Archivos creados/modificados.
   - **Decisiones accionables acumuladas** de todos los executive summaries, deduplicadas y
     priorizadas.
   - **Riesgos y deuda abiertos** acumulados.
   - Próximos pasos recomendados.
4. Opcional: retrospective con `bmad-retrospective`, alimentado con la sección *"Lecciones
   candidatas"* de cada executive summary.

**Gate de completitud:**
- ✅ Todos los subplanes tienen review-report con `APPROVE`.
- ✅ Todos los subplanes tienen executive summary emitido.
- ✅ Completion summary creado (con decisiones accionables agregadas).
- ✅ Usuario notificado.
