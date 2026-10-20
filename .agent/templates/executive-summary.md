<!--
TEMPLATE: Executive Summary de Subplan (cierre de loop DEV-REV)
Fase 5 output (ITERATE). Creado por el Head of Council.
Copiar a: .agents/communications/<TICKET>_execution/NN_executive_summary_subplan-<M>.md

REGLA (HARNESS.md Ley 6): se emite UNO por subplan, al cerrar su loop DEV-REV
(es decir, cuando el Worker Reviewer emite APPROVE). No es un duplicado del
review-report: el review-report es el GATE de calidad; este documento es la
NAVEGACION del razonamiento y las DECISIONES ACCIONABLES.

PROPOSITO: que cualquier persona (o el HOC que retome el ticket) entienda en
< 2 minutos que paso, por que se decidio asi, y que hay que hacer ahora.
Si un lector necesita abrir otros 4 archivos para entender este subplan,
este documento esta mal escrito.
-->

# Executive Summary — Subplan <M>: <name>

| Field | Value |
|-------|-------|
| **Ticket** | <TICKET> |
| **Subplan** | <M> — <name> |
| **Estado** | APPROVED / APPROVED-WITH-OPEN-ITEMS / ESCALATED |
| **Revisiones del loop DEV-REV** | <R> (R1..R<R>) |
| **Verdict final** | APPROVE / REQUEST_CHANGES / REJECT |
| **Workers y modelos** | WD: <modelo> · WR: <modelo> |
| **Fecha de cierre** | <YYYY-MM-DD> |
| **Emite** | Head of Council |

---

## 1. TL;DR (leer esto si no lees nada mas)

- **Que se hizo:** <1 linea — el cambio concreto, en terminos de comportamiento observable>
- **Por que importa:** <1 linea — el impacto sobre el ticket / el usuario / produccion>
- **Como se hizo:** <1 linea — el enfoque elegido, en una frase>
- **Que NO se hizo:** <1 linea — limites explicitos del entregable>
- **Que necesita tu atencion:** <1 linea — o "nada, subplan cerrado limpio">

---

## 2. Pedido vs Entregado

| | |
|---|---|
| **Spec original (execution plan)** | <que decia el subplan que habia que hacer> |
| **Entregado** | <que se entrego realmente> |
| **Delta (scope drift explicito)** | <que se agrego, quito o difirio respecto al spec; si nada, escribir "sin delta"> |
| **Justificacion del delta** | <por que; si el delta no fue aprobado antes, marcar como decision accionable en §8> |

---

## 3. El razonamiento en una pagina

<La narrativa de por que este camino. No repitas el diff. Explica el arbol de
decisiones: que se asumio, que se descarto, y con que evidencia.>

**Punto de partida:** <estado del codigo/sistema antes de este subplan>

**Restricciones activas:** <invariantes, contratos publicos, scope fence, convenciones>

**Alternativas evaluadas:**

| Alternativa | Por que se descarto |
|---|---|
| <opcion A> | <razon — tecnica, de scope, de riesgo, de evidencia> |
| <opcion B> | <razon> |

**Camino elegido y por que:** <2-4 oraciones>

**Como se valido que era el camino correcto:** <evidencia concreta: test, medicion, doc, prior art>

---

## 4. Decisiones tomadas

> Cada decision tecnica o de scope que se tomo DURANTE la ejecucion y que un
> lector futuro necesitaria conocer. Si una decision se tomo sin aprobacion
> previa y es relevante, marcar **Requiere ratificacion: SI** y repetirla en §8.

| ID | Decision | Alternativas descartadas | Razon | Tomada por | Reversible? | Costo de revertir |
|----|----------|--------------------------|-------|------------|-------------|-------------------|
| D1 | <que se decidio> | <que no> | <por que> | HOC / WD / WR / usuario | si/no | bajo/medio/alto |
| D2 | | | | | | |

---

## 5. Historial del loop DEV-REV

| Rev | Dispatch → WD | Review del WR | Resultado |
|-----|---------------|---------------|-----------|
| R1 | <que se delego> | <verdict + issues principales: B1..Bn / W1..Wn> | <que cambio> |
| R2 | <cambios re-dispatchados> | <verdict> | <que cambio> |
| … | | | |

**Puntos de friccion recurrentes:** <si un issue aparecio mas de una vez, decirlo — es deuda de spec, no del worker>

**Discrepancias WD ↔ WR y como se arbitro:** <o "ninguna">

---

## 6. Hallazgos inesperados

<Descubrimientos durante la ejecucion que NO estaban en el plan: bugs adyacentes,
supuestos que resultaron falsos, deuda tecnica encontrada, comportamiento del
sistema real distinto al documentado. Si no hubo: "ninguno".>

- **H1 — <titulo>:** <que se encontro> · <evidencia> · <impacto sobre el ticket>

---

## 7. Riesgos abiertos y deuda asumida

| ID | Riesgo / deuda | Probabilidad | Impacto | Mitigacion actual | Owner |
|----|----------------|--------------|---------|-------------------|-------|
| R1 | <descripcion> | baja/media/alta | bajo/medio/alto | <que lo contiene hoy> | <quien> |

---

## 8. Decisiones accionables

> Esta seccion es el producto principal del documento. Cada fila debe ser algo
> que alguien pueda EJECUTAR sin volver a leer el resto. Vacio = subplan cerrado limpio.

| ID | Accion | Tipo | Owner | Urgencia | Bloquea siguiente subplan? |
|----|--------|------|-------|----------|----------------------------|
| A1 | <accion concreta y verificable> | decidir / hacer / verificar / escalar | usuario / HOC / WD | ahora / antes de merge / backlog | si/no |
| A2 | | | | | |

**Requiere ratificacion del usuario:** <lista de decisiones tomadas sin GO previo, o "ninguna">

---

## 9. Evidencia

- **Archivos tocados:** `<ruta>` (<+/->), `<ruta>` (<+/->)
- **Diff resumido:** `<comando git diff> — N archivos, +X/-Y`
- **Comandos de validacion ejecutados:**
  ```
  <comando> → <resultado literal: N passed / 0 failed>
  ```
- **Cobertura:** <si aplica>
- **Artefactos del thread:** <NN_dispatch…>, <NN_report…>, <NN_review…>

---

## 10. Lecciones candidatas (para el retrospective de FASE 6)

<Si este subplan ensena algo reusable (un patron que funciono, un supuesto que
fallo, una instruccion ambigua del plan), registralo aqui. Si no: "ninguna".>

---

## 11. Handoff al siguiente subplan

- **Dependencias satisfechas por este subplan:** <que desbloquea>
- **Estado del codigo al cerrar:** <rama, HEAD, working tree limpio?, notas que el siguiente WD necesita>
- **Contexto que el siguiente subplan debe asumir:** <2-4 bullets>

<!--
CHECKLIST DE CALIDAD (el HOC lo verifica antes de cerrar el subplan):
[ ] TL;DR explica que/por que/como en <= 5 bullets, sin jerga innecesaria.
[ ] Cada decision de §4 tiene alternativa descartada Y razon (no solo "se decidio X").
[ ] §8 tiene al menos una accion POR CADA riesgo abierto de §7, o dice explicitamente "ninguna".
[ ] Cada accion de §8 tiene owner y criterio de verificacion implicito o explicito.
[ ] §5 refleja TODAS las revisiones del loop, no solo la final.
[ ] Ninguna afirmacion de exito sin evidencia en §9 (comando + resultado).
[ ] El documento se entiende sin abrir el review-report.
-->
