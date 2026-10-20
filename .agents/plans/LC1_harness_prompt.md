# The Job

Actúa como **Head of Council** del graph engineering harness (`.agent/HARNESS.md`) para ejecutar el ticket **LC-1 — "Sitio web codificado para Líbana Chocolates (migración desde Hostinger Web Designer)"** (repo: `jmparejaz/libanachocolates`, GitHub Issue [#1](https://github.com/jmparejaz/libanachocolates/issues/1), prioridad **High**, sin sprint ni assignee previos; reporter y owner: @jmparejaz).

**Base de trabajo (obligatoria):** este repo usa `main` como rama por defecto. Todo el trabajo se realiza sobre el estado actual de `origin/main`. Antes de crear o verificar el worktree, ejecuta `git fetch origin main`, verifica el HEAD y anota el commit base. **Todas las referencias de este documento corresponden a `origin/main` @ `fd5967b` ("Create skill for issue harness prompt generation", 2026-10-20) y fueron re-verificadas el 2026-10-20**; si el HEAD avanzó, re-verifica los anclas con `git show origin/main:<ruta>` antes de delegar — nunca confíes en números de línea sin validarlos contra el HEAD del worktree.

**Regla de adopción:** sigue la guía de `.agent/` como constitución operativa, pero **NO cambies ni sobrescribas el harness actual del equipo** (ni su checkout, ni procesos en ejecución que dependan de él). `.agent/` se lee y se obedece; no se reescribe.

Secuencia obligatoria (sin saltarte fases, gates en `.agent/checks/phase-gates.yaml`):

1. **FASE 0 — BOOT:** lee `HARNESS.md`, `graph/topology.md`, `graph/phases.md`, `roles/head-of-council.md`. Anuncia: "Soy el Head of Council. Iniciando protocolo de graph engineering."
2. **FASE 0.1 — Worktree:** crea el worktree desde `origin/main` con sufijo LC-1 (`git worktree add ../libanachocolates_LC-1 -b vibe/lc1-coded-site origin/main`) y confirma con `git -C ../libanachocolates_LC-1 log --oneline -1` que apunta a `fd5967b`. Todo el trabajo de código ocurre ahí; el checkout principal no se toca.
3. **FASE 1 — STRATEGIC:** produce el plan estratégico con `templates/strategic-plan.md` → `.agents/plans/LC1_strategic_plan.md`. Este plan DEBE incluir la sección "Decisiones abiertas" (ver The Why) con tu recomendación por decisión. Pide aprobación a @jmparejaz antes de avanzar.
4. **FASE 2 — DETAILED:** co-crea con los workers el plan detallado de ejecución con `templates/execution-plan.md` → `.agents/plans/LC1_execution_plan.md` (subplanes numerados, cada uno verificable de forma independiente).
5. **FASE 3–5 — EXECUTE/REVIEW/ITERATE:** para **cada paso** del graph engineering delega como agentes independientes, como mínimo: un **Worker Developer** (implementa) y un **Worker Reviewer** (revisa adversarialmente y emite verdict: approve / request-changes / reject). Registra cada delegación en `templates/dispatch-log.md` y cada veredicto en `templates/review-report.md`, bajo `.agents/communications/LC1_execution/`.
   **Al cerrar el loop DEV-REV de cada subplan (Reviewer emite APPROVE) es OBLIGATORIO emitir el Executive Summary del subplan** con `templates/executive-summary.md` → `.agents/communications/LC1_execution/NN_executive_summary_subplan-<M>.md` (`HARNESS.md` **Ley 6**, gate de la fase `iterate`). Sin ese artefacto el subplan **no** se marca completado y **no** se avanza al siguiente. Debe llevar TL;DR, razonamiento con alternativas descartadas, decisiones tomadas (con reversibilidad y costo de revertir) y una sección de **decisiones accionables** (acción / tipo / owner / urgencia / si bloquea el siguiente subplan). Exige a los workers el **razonamiento** de sus decisiones, no solo el resultado: es la materia prima del summary.
6. **FASE 6 — CLOSE:** todos los subplanes approved **y con executive summary emitido** → retrospective + handoff a @jmparejaz, agregando las decisiones accionables de todos los summaries. Actualiza el Knowledge Base de Notion (páginas "Knowledge Base", "Arquitectura y Stack", "Decisiones y Registro" bajo "🍫 Líbana Chocolates") con el estado final.

**Delegación:** tú, el Head of Council, **nunca escribes código** ni revisas el tuyo. Delegas a cada worker con el **contexto más enriquecido y preciso posible**: texto del ticket y sus AC, rutas de archivo verificadas contra el HEAD del worktree, convenciones del repo, comandos de validación exactos y salida esperada. Los workers son stateless: cada dispatch debe ser autocontenido.

**Modelos permitidos para tareas de dev y review:** el modelo del runtime actual (`zai-glm-5-3`) para todos los workers, salvo indicación posterior del usuario. Registra el modelo usado por worker en cada dispatch.

**Rol de router:** asigna workers según la complejidad — dev pesado para scaffolding y diseño de UI, review adversarial para el Reviewer, edge-case hunting para responsive/SEO. Registra en cada dispatch-log el modelo elegido y el criterio.

**Guía de delegación:** la mecánica de subagents del runtime (dispatch a worker-developer / worker-reviewer como agentes independientes con contexto autocontenido, gate DEV→REV). Si la ejecución corre en un assistant/harness distinto al que documenta la guía, adapta la mecánica de subagents equivalente de ese runtime.

**Puerta de aprobación:** todo paso avanzado (boot, creación del worktree, sign-off de cada plan —incluida la resolución de las Decisiones abiertas—, avance de cada subplan, cualquier operación de git que escriba historial, close) requiere el **GO explícito de @jmparejaz, el usuario**. Sin GO, te detienes y reportas estado.

# The Why

- **Producto:** libanachocolates.com hoy vive en el Web Designer de Hostinger y no puede cobrar: dLocalGo (única pasarela integrada) rechazó la cuenta. Mientras tanto, lanzar campañas publicitarias generaría pedidos imposibles de cobrar pero con envíos obligatorios ⇒ el negocio está bloqueado. La salida es un sitio codificado, desplegado en el hosting de Hostinger, con pasarela de pagos propia. **AC (verbatim):**
  - [ ] Sitio estático multi-página (o one-page con secciones) que replica la estructura de libanachocolates.com usando las imágenes originales del Drive.
  - [ ] Estética inspirada en graza.co: paleta cálida, tipografía grande/chunky, copy casual, layout amigable.
  - [ ] Responsive y con rendimiento adecuado (Lighthouse móvil razonable).
  - [ ] Flujo de compra/checkout preparado para integrar una pasarela de pagos colombiana (elección documentada como decisión abierta).
  - [ ] Desplegable en Hostinger por upload/FTP sin dependencia del Web Designer.
  - [ ] Metadatos SEO preservados (título, descripción actuales).
  - [ ] Knowledge base en Notion actualizado con decisiones del proyecto.
- **🔴 PRIOR ART:** no existe. Búsqueda realizada (2026-10-20): `gh pr list` (0 PRs), `git branch -r` (solo `origin/main`), `git log --all` (solo historia del harness). El repo es greenfield para código de sitio: no hay fix huérfano ni migración legacy que comparar.
- **Causa raíz verificada sobre `origin/main` @ `fd5967b`:** el repo **no contiene ningún archivo de sitio web** — el árbol es exclusivamente `.agent/` (harness), `.agents/skills/harness-prompt/` y `.agents/plans/x`. No hay `package.json`, `index.html`, ni directorio de assets. El defecto es la ausencia total de implementación: todo el sitio se crea desde cero.
- **Hallazgo decisivo:** el "defecto" no vive en este repo sino en la plataforma: el Web Designer de Hostinger acopla el sitio a dLocalGo. Por eso el scope correcto es **nuevo sitio estático**, no un fix.
- **Encaje con el scope:** se resuelve creando un sitio estático (HTML/CSS/JS vanilla o build estático ligero) en este repo, con assets descargados del Drive (enlazado en la página MADE del KB de Notion). Fuera de scope: la integración real de la pasarela (requiere selección de proveedor y credenciales — se documenta y se escala), y el deploy real en Hostinger (requiere credenciales del panel).
- **Decisiones abiertas que el Head of Council DEBE resolver en FASE 1 y someter a @jmparejaz (con recomendación):**
  1. **Stack del sitio estático.** Opciones: (a) HTML/CSS/JS vanilla sin build; (b) Astro con output estático; (c) Next.js `export`. **Recomendación: (a) vanilla** — cero toolchain, despliegue por upload directo, sin riesgo de frameworks no soportados por Hostinger.
  2. **Estructura: one-page vs multi-página.** El sitio actual es one-page con secciones. Opciones: (a) mantener one-page con anclas; (b) multi-página por categoría. **Recomendación: (a) one-page** con productos como sección destacada y página separada solo si el volumen de productos lo exige.
  3. **Pasarela de pagos objetivo.** Opciones para Colombia: PayU, Mercado Pago, Wompi, Stripe. **Recomendación: Mercado Pago o PayU** (cobertura local, PSE/tarjetas; definir en FASE 1 con el usuario según costos y facilidad de aprobación).
  4. **Tipografía y assets gráficos.** Usar las imágenes originales del Drive + fuentes libres con estética chunky (ej. sistema de fuentes tipo Graza: display bold + sans). **Recomendación:** fuentes Google libres (sin costo de licencia) e ilustraciones originales del Drive.
- **Proceso:** operar como grafo con workers Developer/Reviewer independientes hace la ejecución auditable, reversible y con calidad gateada — en vez de un agente solitario improvisando.

# The Guardrails

1. **Harness inmutable:** no modificar ni reescribir `.agent/`. Solo lectura y cumplimiento.
2. **Git mínimo y aprobado:** la única operación de git sancionada sin discusión extra es `git fetch origin main` + la creación (o verificación) del worktree y branch de FASE 0.1. Prohibido `commit`, `push`, `rebase`, `amend`, `--force` sin directriz explícita de @jmparejaz. Nunca ensuciar el working tree del checkout principal.
3. **Preflight obligatorio (Ley 7):** antes de cada llamada de herramienta valida la precondición barata (existencia de archivo con `test -f`, longitud con `awk 'END{print NR}'`, ancla única antes de editar, destinatario elegible antes de delegar). Si un worker no está disponible, **escala al usuario — nunca auto-implementes**.
4. **Scope congelado:** solo el sitio web nuevo y sus artefactos de plan. No tocar el harness, no modificar el Web Designer, no iniciar integraciones de pago con credenciales reales, no crear infraestructura externa.
5. **Assets:** usar exclusivamente las imágenes del Google Drive del proyecto (página MADE del KB de Notion). No hotlink a libanachocolates.com en producción; los assets se copian al repo bajo `assets/`.
6. **Estándares de código:** HTML5 semántico, CSS moderno con fallbacks razonables, JS progresivo (el sitio debe funcionar sin JS para contenido estático), accesibilidad AA básica, `lang="es"`, metadatos SEO del sitio actual preservados (title: "Líbana Chocolates: Cacao orgánico de un solo origen | Líbana Chocolates").
7. **No exponer secretos:** ninguna credencial de Hostinger, pasarelas o Drive en el repo.
8. **Verificación local:** el sitio debe poder servirse localmente (`python3 -m http.server` o equivalente) y validarse con verificación de estructura (ej. validación HTML básica, revisión de rutas de assets, revisión responsive por breakpoints de CSS). Todo check que falle es blocker del subplan.
9. **Comunicaciones persistentes:** toda delegación y verdict en `.agents/communications/LC1_execution/` con numeración `NN_`.
10. **Notion:** cada decisión del proyecto se refleja en el KB de Notion al cierre de cada subplan (update de "Decisiones y Registro").

# Done means

- [ ] Worktree `../libanachocolates_LC-1` creado sobre `origin/main @ fd5967b`, rama `vibe/lc1-coded-site`.
- [ ] `.agents/plans/LC1_strategic_plan.md` aprobado (decisiones abiertas resueltas con GO del usuario).
- [ ] `.agents/plans/LC1_execution_plan.md` aprobado.
- [ ] Sitio implementado: one-page con Hero ("Sabor intenso y puro", CTA "Compra ya"/"Ver cacao"), "Sabores Únicos" (Cacao Fino de Aroma, Barras de Chocolate Oscuro, Regalos), Newsletter ("Únete a Líbana"), storytelling (cacao de ritual, fundaciones de rescate animal), footer con datos de contacto. Estética graza.co: paleta cálida (chocolate/crema/acento), tipografía display grande, copy casual en español.
- [ ] Assets originales copiados del Drive a `assets/` y referenciados localmente (sin hotlinks).
- [ ] Responsive (breakpoints móvil/tablet/desktop), accesibilidad básica, SEO preservado.
- [ ] Estructura de checkout preparada (botón de compra → página/sección de checkout desacoplada, sin integración real de pasarela; elección de pasarela documentada como decisión pendiente en el KB).
- [ ] Todos los subplanes con `review-report.md` APPROVE y su `executive_summary` emitido.
- [ ] Retrospective + handoff a @jmparejaz con decisiones accionables agregadas.
- [ ] KB de Notion actualizado ("Arquitectura y Stack" con el stack final, "Decisiones y Registro" con las decisiones tomadas, checkboxes de "Recursos y Assets" cerrados según corresponda).
- [ ] Issue [#1](https://github.com/jmparejaz/libanachocolates/issues/1) actualizado con el resultado (o cerrado si el usuario lo aprueba).
