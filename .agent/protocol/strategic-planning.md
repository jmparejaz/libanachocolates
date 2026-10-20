# Protocol: Strategic Planning (FASE 1)

> Ejecutado por el **Head of Council** solo (sin workers aún), con input del usuario.

---

## Objetivo

Producir un **Plan Estratégico** que defina la visión, el alcance, el desglose en
Commit Subplanes, los riesgos y los workers necesarios. Este plan es el primer artefacto
persistido del proyecto y el primer gate de confirmación con el usuario.

---

## Pasos

### 1. Entender la tarea
- Leer el request del usuario.
- Identificar el ticket/proyecto (ej: DATA-10XXX).
- Leer contexto relevante: `AGENTS.md`, plans previos, research notes en `.agents/docs/`.

### 2. Crear el thread de comunicación
- Crear `.agents/communications/<TICKET>_execution/00_thread_header.md`
- El header define: ticket, participantes (HOC + workers mínimos), source plan, protocolo.

### 3. Analizar el problema
- ¿Qué hay que construir/cambiar?
- ¿Qué partes del codebase se ven afectadas?
- ¿Hay research previo disponible?
- ¿Hay decisions ya tomadas (en plans previos, PRs, etc.)?

### 4. Desglosar en Commit Subplanes
- Cada subplan debe ser:
  - **Independiente:** puede ejecutarse sin otros subplanes (salvo dependencias explícitas).
  - **Reversible:** produce commits que se pueden revertir sin romper el resto.
  - **Testeable:** tiene verification steps definidos.
  - **Atomic:** un subplan = un concepto lógico (ej: "foundation", "config", "dag-wiring").
- Ordenar subplanes para **minimizar riesgo** (foundation primero, wiring al final).

### 5. Identificar riesgos
- Por cada subplan: ¿qué puede salir mal?
- Riesgos de regresión, de performance, de seguridad, de dependencias.
- Mitigación para cada riesgo.

### 6. Decidir workers necesarios
- **Mínimo garantizado:** Worker Developer + Worker Reviewer.
- **Opcionales:** Worker Architect (si hay decisiones de diseño), Worker Tester (si hay test strategy compleja), Worker Researcher (si falta contexto).

### 7. Escribir el plan estratégico
- Usar `templates/strategic-plan.md`.
- Guardar en `.agents/plans/<TICKET>_strategic_plan.md`.

### 8. Presentar al usuario (GATE)
- Mostrar el plan al usuario.
- Esperar confirmación o feedback.
- Iterar hasta confirmación.

---

## Artefactos producidos

| Artefacto | Path |
|-----------|------|
| Thread header | `.agents/communications/<TICKET>_execution/00_thread_header.md` |
| Plan estratégico | `.agents/plans/<TICKET>_strategic_plan.md` |

## Gate de salida

- ✅ Plan estratégico confirmado por el usuario.
- ✅ Lista de Commit Subplanes definida y ordenada.
- ✅ Workers necesarios declarados.
- ✅ Riesgos identificados con mitigación.

→ Avanza a FASE 2 (DETAILED PLANNING).
