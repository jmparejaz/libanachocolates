---
name: issue-harness-prompt
description: Genera un prompt de "Head of Council" (estructura # The Job / # The Why / # The Guardrails / # Done means) para ejecutar un ticket bajo el graph engineering harness (.agent/harness/), partiendo del contexto del ticket (issue tracker vía MCP o web), de la causa raíz verificada en el código con la rama base del repo detectada (nunca asumida), y del prior art buscado en el repo actual y en el legacy de origen. Lo guarda en .agents/plans/<TICKET>_harness_prompt.md. Usar cuando el usuario pida "crea el harness prompt", "arma el prompt de Head of Council" o "adaptá este prompt" para un ticket.
---

# Issue → Harness Prompt (Head of Council)

Skill para transformar un ticket de issue tracker (GitHub Issues, Linear, Jira, GitLab, etc.) en un **prompt de Head of Council** autocontenido, listo para ejecutar bajo el graph engineering harness de `.agent/harness/`.

## Objetivo

Producir, a partir de un ticket, un prompt que un Head of Council (cualquier agentic coding assistant / harness CLI) pueda ejecutar siguiendo el protocolo del grafo (BOOT → STRATEGIC → DETAILED → EXECUTE → REVIEW → ITERATE → CLOSE), con la causa raíz anclada a código real, el **prior art verificado**, y las decisiones abiertas explicitadas para aprobación humana.

## Cuándo usar

- El usuario pide "crea el prompt de Head of Council" / "arma el harness prompt" para un ticket.
- El usuario da un ticket (`PROJ-123`, `#456`, `ABC-789`, URL del issue tracker) y pide el prompt con la estructura `# The Job / # The Why / # The Guardrails / # Done means`.
- Hay que arrancar un ticket nuevo bajo el graph engineering harness y se necesita el prompt de arranque.
- El usuario pide "adaptá este prompt" (se recibe un prompt anterior como referencia de estilo).

## Inputs

1. **Ticket key o URL** (obligatorio): `PROJ-123`, `#456`, `https://github.com/<ORG>/<REPO>/issues/456`, `https://linear.app/<ORG>/issue/ABC-789`, etc.
2. **Repo base** (obligatorio). **La rama base NO se asume: se detecta** — ver Paso 2.0.
3. **Opcional**: prompt anterior a adaptar.

## Paso 1 — Recolectar contexto del ticket

Traer TODO el contexto posible:

- **Campos**: key, tipo, título, estado, prioridad, story points, assignee, reporter, labels, team, sprint/milestone, epic/parent, fixVersion, components, severidad (si es incidente).
- **Descripción / AC verbatim**: reproducir textualmente los acceptance criteria (tablas, bullets, formatos exigidos).
- **Comentarios** y **links** (referencias cruzadas, PRs vinculados, docs): suelen contener hallazgos y decisiones ya tomadas.

> **Con MCP del issue tracker (preferido):** usa las tools del MCP correspondiente (GitHub MCP, Linear MCP, Jira MCP, etc.) para resolver el ID y traer campos, descripción, comentarios y links.
>
> **Sin MCP:** usa web_search / browser sobre la URL del ticket y su página, o `gh issue view <NUM>` para GitHub Issues.

## Paso 2 — Verificar la causa raíz en el código

### Paso 2.0 — Detectar la rama base del repo (**NUNCA asumirla**)

Distintos repos usan `main`, `master`, `development`, `trunk`, etc. Asumir la rama equivocada produce un prompt que apunta a un estado inexistente del código y anclas de línea inválidas. **Detéctala siempre, antes de leer una sola línea:**

```sh
gh repo view <ORG>/<REPO> --json defaultBranchRef -q .defaultBranchRef.name   # rama por defecto real
git -C <ruta-repo> fetch origin --prune
git -C <ruta-repo> rev-parse --short origin/<BASE_BRANCH>
git -C <ruta-repo> log -1 --format="%h %ad %s" --date=short origin/<BASE_BRANCH>
```

Si no hay `gh`, usa `git remote show origin | grep "HEAD branch"` o `git symbolic-ref refs/remotes/origin/HEAD`.
Anota el resultado en el prompt de forma explícita, con la frase: *"este repo usa `<BASE_BRANCH>` como rama por defecto"*.

### Paso 2.1 — Anclar la causa raíz

El prompt debe anclar la causa raíz a **archivos y números de línea reales**, no a suposiciones:

1. Resolver el commit base: `git fetch origin <BASE_BRANCH>` y anotar `git rev-parse origin/<BASE_BRANCH>` (short hash + subject).
2. Localizar el código relevante (glob/grep sobre el dominio del ticket) y **leer** los archivos.
3. Extraer los anclas exactos con `git show origin/<BASE_BRANCH>:<ruta> | grep -nE "..."` para que los números correspondan al commit base (los números de un worktree local con rama propia pueden estar desplazados).
4. Separar **en scope** (lo que el ticket pide cambiar) de **fuera de scope** (capa adyacente: se documenta y se escala si el diseño lo exige).
5. Si un ancla no se puede verificar, marcarlo "re-verificar" — **nunca inventar números de línea**.

### Paso 2.2 — Estado del worktree (caso "retomar", no "crear")

Antes de escribir que el prompt debe **crear** el worktree, verifica si **ya existe**:

```sh
git -C <ruta-repo> worktree list
git -C <ruta-worktree> status -sb && git -C <ruta-worktree> rev-parse HEAD
git -C <ruta-repo> reflog show <BRANCH> | head -5   # ¿ya fue rebasado?
```

Si el worktree ya existe y ya fue rebasado sobre `origin/<BASE_BRANCH>`, el prompt debe decir
**"verificar, NO recrear y NO rebasar de nuevo"**, indicando el HEAD exacto. Recrear o re-rebasar
destruye trabajo no commiteado y rompe las anclas derivadas.

## Paso 3 — Buscar prior art (OBLIGATORIO antes de proponer un diseño)

**Lección aprendida:** se redactó un prompt completo para implementar desde cero un fix
que **ya existía escrito, testeado y abandonado** en un PR abierto del repo legacy del que se migró
el código. El costo fue un rediseño innecesario y una decisión abierta que ya tenía respuesta empírica.

Antes de cerrar la causa raíz, busca siempre en **los dos repos** (el actual y el legacy de origen,
si aplica):

```sh
# PRs abiertos/cerrados que mencionen el ticket o el síntoma
gh pr list --repo <ORG>/<REPO> --state all --search "<TICKET>" --limit 30
gh pr list --repo <ORG>/<REPO> --state all --limit 300 --json number,title,headRefName,state,url
# ramas remotas con posibles fixes huérfanos
git -C <ruta-repo> branch -r --sort=-committerdate | head -30
# commits que tocan los símbolos del fix en TODA la historia, no solo en la rama base
git -C <ruta-repo> log --all --oneline -S "<simbolo_clave_del_fix>" | head -20
git -C <ruta-repo> log --all --oneline --grep="<TICKET>" | head -20
```

Criterios de decisión:

- **Si existe un fix mergeado en la rama base** → el ticket probablemente ya está resuelto; verifica
  por qué el síntoma persiste antes de escribir un prompt de implementación.
- **Si existe un fix en un PR/branch NO mergeado** → el prompt debe dedicarle una sección
  **🔴 PRIOR ART** con: URL del PR, commit, autor, estado, fecha, y el diff/código de referencia.
  La primera Decisión Abierta debe ser **"portar el prior art vs implementar de cero"**, con
  recomendación de portar.
- **Si el repo actual se migró de otro** → compara el snapshot de la migración contra el repo
  legacy. Un fix posterior a la migración **nunca** llegó al repo nuevo: eso explica por qué un bug
  "reaparece". Anótalo como hallazgo del prompt.
- **Si el síntoma tiene una fecha de regresión declarada en el ticket** → verifícala con
  `git log -S`/`git log --all` sobre el símbolo afectado. Los tickets suelen atribuir la regresión
  al último cambio visible, no al que realmente la introdujo. Corrige la fecha en el prompt y dilo
  explícitamente.

## Paso 4 — Escribir el prompt y guardarlo

Rellenar la plantilla de abajo y guardar en `.agents/plans/<TICKET>_harness_prompt.md` (convención del workspace; ver ejemplos existentes en `.agents/plans/`).

---

## Plantilla del prompt (rellenar <PLACEHOLDERS>)

```markdown
# The Job

Actúa como **Head of Council** del graph engineering harness (`.agent/harness/HARNESS.md`) para ejecutar el ticket **<TICKET> — "<SUMMARY>"** (repo: `<REPO>`, epic/milestone <EPIC>, <PRIORITY>, Story Points <POINTS>, Sprint/Milestone "<SPRINT>", assignee: <ASSIGNEE>, reporter: <REPORTER>, team: <TEAM>).

**Base de trabajo (obligatoria):** este repo usa `<BASE_BRANCH>` como rama por defecto. Todo el trabajo se realiza sobre el estado actual de `origin/<BASE_BRANCH>`. Antes de crear o verificar el worktree, ejecuta `git fetch origin <BASE_BRANCH>`, verifica el HEAD y anota el commit base. **Todas las referencias de línea de este documento corresponden a `origin/<BASE_BRANCH>` @ `<BASE_COMMIT>` y fueron re-verificadas el <FECHA_VERIFICACION>**; si el HEAD avanzó, re-verifica los anclas con `git show origin/<BASE_BRANCH>:<ruta>` antes de delegar — nunca confíes en números de línea sin validarlos contra el HEAD del worktree.

**Regla de adopción:** sigue la guía de `.agent/harness/` como constitución operativa, pero **NO cambies ni sobrescribas el harness actual del equipo** (ni su checkout, ni procesos en ejecución que dependan de él). `.agent/harness/` se lee y se obedece; no se reescribe.

Secuencia obligatoria (sin saltarte fases, gates en `.agent/harness/checks/phase-gates.yaml`):

1. **FASE 0 — BOOT:** lee `HARNESS.md`, `graph/topology.md`, `graph/phases.md`, `roles/head-of-council.md`. Anuncia: "Soy el Head of Council. Iniciando protocolo de graph engineering."
2. **FASE 0.1 — Worktree:** <WORKTREE_STEP — si NO existe: "crea el worktree desde `origin/<BASE_BRANCH>` con sufijo <TICKET> (`git worktree add ../<REPO>_<TICKET> -b <BRANCH> origin/<BASE_BRANCH>`) y confirma con `git -C ../<REPO>_<TICKET> log --oneline -1` que apunta al commit esperado". Si YA existe y ya fue rebasado: "verifica con `git -C ../<REPO>_<TICKET> status -sb` y comprueba `git rev-parse HEAD` == `git rev-parse origin/<BASE_BRANCH>` — NO recrear y NO rebasar de nuevo".> Todo el trabajo de código ocurre ahí; el checkout principal no se toca.
3. **FASE 1 — STRATEGIC:** produce el plan estratégico con `templates/strategic-plan.md` → `.agents/plans/<TICKET>_strategic_plan.md`. Este plan DEBE incluir la sección "Decisiones abiertas" (ver The Why) con tu recomendación por decisión. Pide aprobación a <USUARIO> antes de avanzar.
4. **FASE 2 — DETAILED:** co-crea con los workers el plan detallado de ejecución con `templates/execution-plan.md` → `.agents/plans/<TICKET>_execution_plan.md` (subplans numerados, cada uno verificable de forma independiente).
5. **FASE 3–5 — EXECUTE/REVIEW/ITERATE:** para **cada paso** del graph engineering delega como agentes independientes, como mínimo: un **Worker Developer** (implementa) y un **Worker Reviewer** (revisa adversarialmente y emite verdict: approve / request-changes / reject). Registra cada delegación en `templates/dispatch-log.md` y cada veredicto en `templates/review-report.md`, bajo `.agents/communications/<TICKET>_execution/`.
   **Al cerrar el loop DEV-REV de cada subplan (Reviewer emite APPROVE) es OBLIGATORIO emitir el Executive Summary del subplan** con `templates/executive-summary.md` → `.agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md` (`HARNESS.md` **Ley 6**, gate de la fase `iterate`). Sin ese artefacto el subplan **no** se marca completado y **no** se avanza al siguiente. Debe llevar TL;DR, razonamiento con alternativas descartadas, decisiones tomadas (con reversibilidad y costo de revertir) y una sección de **decisiones accionables** (acción / tipo / owner / urgencia / si bloquea el siguiente subplan). Exige a los workers el **razonamiento** de sus decisiones, no solo el resultado: es la materia prima del summary.
6. **FASE 6 — CLOSE:** todos los subplans approved **y con executive summary emitido** → retrospective + handoff a <USUARIO>, agregando las decisiones accionables de todos los summaries.

**Delegación:** tú, el Head of Council, **nunca escribes código** ni revisas el tuyo. Delegas a cada worker con el **contexto más enriquecido y preciso posible**: texto del ticket y su AC, rutas de archivo + números de línea verificados contra el HEAD del worktree, convenciones del repo (`<REPO>/AGENTS.md`), comandos de validación exactos y salida esperada. Los workers son stateless: cada dispatch debe ser autocontenido.

**Modelos permitidos para tareas de dev y review:** <MODELOS_PERMITIDOS — configurar en el harness; p. ej. una lista explícita de modelos disponibles>. Registra el modelo usado por worker en cada dispatch.

**Rol de router (parte esencial de tu labor):** como Head of Council eres el **router de modelos**: decides qué modelo asignar a cada worker según la complejidad de la tarea — dev pesado/refactor complejo, review adversarial, edge-case hunting, tareas rápidas — en vez de usar un único modelo para todo. Registra en cada dispatch-log el modelo elegido y el criterio de esa decisión.

**Guía de delegación:** <DELEGATION_GUIDE — si el harness tiene una guía específica para delegación de subagent workers con modelos concretos, referenciarla; si no, describir la mecánica equivalente del runtime que se use (subagents, workflows, background/foreground, gate DEV→REV)>. Si la ejecución corre en un assistant/harness distinto al que documenta la guía, adapta la mecánica de subagents equivalente de ese runtime (no copies llamadas de API tal cual).

**Puerta de aprobación:** todo paso avanzado (boot, creación del worktree, sign-off de cada plan —incluida la resolución de las Decisiones abiertas—, avance de cada subplan, cualquier operación de git que escriba historial, close) requiere el **GO explícito de <USUARIO>, el usuario**. Sin GO, te detienes y reportas estado.

# The Why

- **Producto:** <PRODUCT_WHY — contexto de producto y qué está fallando>. **AC (verbatim):**
  <AC_VERBATIM — reproducir textualmente los acceptance criteria>
- **⚠️ Fecha de regresión (verificada, puede contradecir al ticket):** <REGRESSION_DATE — si el ticket
  declara una fecha de regresión, verifícala con `git log -S` sobre el símbolo afectado. Si la fecha
  real difiere de la declarada, escríbelo como corrección explícita con una tabla
  fecha → commit → qué hizo → ¿roto?. Si coincide, escribe "coincide con el ticket".>
- **🔴 PRIOR ART (si existe; si no, borrar esta sección):** <PRIOR_ART — URL del PR, commit, autor,
  estado (abierto/mergeado/abandonado), fecha, y el código de referencia a portar. Si el fix existe
  pero no está mergeado en la rama base, la **primera Decisión Abierta debe ser "portar el prior art
  vs implementar de cero"** con recomendación de portar. Si el repo se migró de otro y el fix es
  posterior a la migración, explica que **esa** es la razón por la que el bug reaparece aquí.>
- **Causa raíz verificada en código sobre `origin/<BASE_BRANCH>` @ `<BASE_COMMIT>`:**
  <ROOT_CAUSE — bullets con archivo + función + línea, qué falta/qué tolera el código actual>
- **Hallazgo decisivo:** <HALLAZGO — el insight clave que reubica el problema (dónde vive de verdad el defecto)>
- **Encaje con el scope:** <SCOPE_FIT — por qué se resuelve en <SCOPE_IN> y no en la capa adyacente>
- **Decisiones abiertas que el Head of Council DEBE resolver en FASE 1 y someter a <USUARIO> (con recomendación):**
  <DECISIONES — lista numerada; cada una con opciones y una recomendación explícita>
- **Proceso:** operar como grafo con workers Developer/Reviewer independientes sobre modelos explícitos hace la ejecución auditable, reversible y con calidad gateada — en vez de un agente solitario improvisando.

# The Guardrails

1. **Harness inmutable:** no modificar ni reescribir `.agent/harness/`. Solo lectura y cumplimiento.
2. **Git mínimo y aprobado:** la única operación de git sancionada sin discusión extra es `git fetch origin <BASE_BRANCH>` + la creación (o verificación) del worktree y branch de FASE 0.1. <GIT_EXTRA — si el worktree ya existe y ya fue rebasado: "NO recrear el worktree ni rebasar de nuevo".> Prohibido `commit`, `push`, `rebase`, `amend`, `--force` sin directriz explícita de <USUARIO>. Nunca ensuciar el working tree del checkout principal.
3. **Artefactos:** planes, dispatch-logs, review-reports y executive summaries viven en la carpeta `.agents/` de la **raíz del monorepo** (`.agents/plans/`, `.agents/communications/<TICKET>_execution/`). **Nunca** hacer `git add` ni commitear `.agents/`, `.agent/` ni artefactos del harness al repo de código.
4. **Cerca de scope:** <SCOPE_IN — rutas exactas que sí se tocan>. Fuera de scope: <SCOPE_OUT — rutas/capas que NO se tocan; cualquier necesidad se documenta y se escala, nunca se implementa de facto>.
5. **Convenciones del repo (`<REPO>/AGENTS.md`):** <CONVENCIONES — gestor de paquetes, no heredocs, tests en árbol top-level tests/, cambios quirúrgicos>.
6. **Invariantes de diseño:** <INVARIANTS — qué queda intacto, qué debe ser determinístico/idempotente, qué se preserva>.
7. **Workers:** Developer y Reviewer son subagentes independientes por paso (mínimo uno de cada); el Reviewer nunca es quien implementó; el verdict de review es la condición para avanzar; en reject se itera (FASE 3→4→5) o se escala a <USUARIO>. Los reports de los workers deben incluir el **razonamiento** de sus decisiones (alternativas descartadas, desviaciones del spec, hallazgos inesperados, riesgos residuales), no solo el resultado.
8. **Executive summary obligatorio (Ley 6):** al cerrar el loop DEV-REV de **cada** subplan el HOC **debe** emitir el executive summary del subplan antes de marcarlo completado y antes de despachar el siguiente, con TL;DR, razonamiento, decisiones y **decisiones accionables** (acción / tipo / owner / urgencia / si bloquea el siguiente subplan). Vacío solo si cerró limpio, y entonces "ninguna" explícito. Gate enforced en `checks/phase-gates.yaml` (fase `iterate`).
9. **Silencio = stop:** ante cualquier ambigüedad, gate sin respuesta o conflicto de instrucciones, detente y pregunta. No hay avance unilateral.

# Done means

1. Worktree `../<REPO>_<TICKET>` existe sobre branch `<BRANCH>` sobre el `origin/<BASE_BRANCH>` **más reciente verificado** (commit base anotado en el plan); el checkout principal quedó intacto; el worktree **no** se recreó ni se rebasó si ya estaba al día.
2. `.agents/plans/<TICKET>_strategic_plan.md` (incluyendo las Decisiones abiertas **resueltas y aprobadas por escrito por <USUARIO>**) y `.agents/plans/<TICKET>_execution_plan.md` existen y siguen las plantillas del harness.
3. Cada subplan ejecutado tiene: dispatch-log (worker, modelo usado, paquete de contexto) + review-report con verdict **approve** + **executive summary emitido** (Ley 6). Ningún paso avanzó sin el GO de <USUARIO>.
4. **Estado del código:** <DONE_CODE — el comportamiento esperado ya existe, determinístico, con lo demás intacto>.
5. **Validación verde:** <DONE_TESTS — suite + linter + test nuevo que fije el comportamiento; smoke test opcional con aprobación previa>.
6. El diff final completo fue presentado a <USUARIO>; **nada commiteado ni pusheado salvo orden explícita suya**; retrospectiva escrita en `.agents/communications/<TICKET>_execution/` y ticket listo para mover de estado.
```

---

## Modelos permitidos y rol de router

Configura en el harness el conjunto de modelos autorizados para dev y review. El Head of Council actúa como **router**: elige el modelo por worker según la complejidad de la tarea (no un único modelo para todo) y lo registra en cada dispatch-log. Heurísticas orientativas (no dogmáticas):

| Complejidad de tarea | Tipo de modelo sugerido |
|---|---|
| Dev pesado / refactor complejo / lógica profunda | modelo más fuerte para código |
| Review adversarial / edge-case hunting | modelo con buen razonamiento crítico |
| SQL / orquestación / razonamiento general | modelo balanceado |
| Tareas rápidas / iteración | modelo rápido |

## Reglas de oro que el prompt debe incrustar

1. **Harness inmutable** — no reescribir `.agent/harness/`.
2. **Git mínimo** — solo `fetch` + worktree/branch; nada de commit/push sin orden explícita.
3. **Artefactos en `.agents/`** (raíz del monorepo) — nunca commitearlos.
4. **Scope quirúrgico** — solo lo que el ticket pide; lo adyacente se escala, no se implementa.
5. **Determinismo** — dedupe/filtros/formato por código, nunca delegados al LLM.
6. **Workers Developer + Reviewer** por paso, con verdict gate.
7. **Router de modelos** — asignar modelo por complejidad y registrarlo.
8. **Executive summary por subplan** — cierre obligatorio del loop DEV-REV con razonamiento y decisiones accionables (Ley 6).
9. **Silencio = stop** — GO explícito del usuario en cada gate.

## Anti-patrones a evitar (lecciones aprendidas)

| Anti-patrón | Por qué duele | Qué hacer en su lugar |
|---|---|---|
| Asumir la rama base del repo | Anclas de línea sobre un estado inexistente del código | Paso 2.0: detectar con `gh repo view --json defaultBranchRef` |
| Proponer un diseño sin buscar prior art | Se rediseña (o se duplica) algo ya escrito; la decisión abierta ya tenía respuesta | Paso 3: `gh pr list --state all`, `git log --all -S` en el repo actual **y** en el legacy |
| Dar por buena la fecha de regresión del ticket | El ticket suele culpar al último cambio visible, no al que rompió | Verificar con `git log -S` sobre el símbolo afectado |
| Anclas sin fecha de verificación | Un rebase posterior las invalida en silencio | Anotar `<FECHA_VERIFICACION>` y el commit base exacto |
| Prescribir refactors por analogía | Amplía el diff fuera de scope | Preferir la solución de menor superficie; documentar la alternativa descartada |
| Ignorar tickets hermanos | Dos personas trabajando el mismo defecto | Buscar tickets con RCA duplicado y añadir una decisión de coordinación |

## Salida

- **Archivo**: `.agents/plans/<TICKET>_harness_prompt.md` (raíz del monorepo).
- El prompt es autocontenido: puede ejecutarlo un Head of Council en **cualquier** assistant/harness CLI (DeepSeek Harness, Copilot/Claude CLI, adal, etc.). La pieza de mecánica de delegación debe adaptarse al runtime concreto que se use.

## Referencias

- Harness: `.agent/harness/HARNESS.md` (**Ley 6 — executive summary por subplan**), `.agent/harness/graph/topology.md`, `.agent/harness/graph/phases.md`, `.agent/harness/roles/head-of-council.md`, `.agent/harness/protocols/`, `.agent/harness/templates/` (incl. `executive-summary.md`), `.agent/harness/checks/phase-gates.yaml` (fase `iterate`).
- Guía de delegación: la que corresponda al runtime/harness que se use (documentar en `.agents/docs/` si aplica).
- Ejemplos de prompts generados: `.agents/plans/`.
