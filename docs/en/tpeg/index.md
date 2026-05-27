# What is TPEG

**TPEG** — _Transport Protocol Experts Group_ — is a family of open, vendor-neutral standards for encoding **traffic and travel information** (TTI) in a way that can be exchanged between systems, languages, and delivery channels.

It was developed under the **TISA** (Traveller Information Services Association) umbrella and is standardised by ISO and CEN. Today TPEG is one of two widely-used families of TTI formats — the other being DATEX II, which is more common as a back-office exchange format between road authorities.

## A short history

- **TPEG1** (early 2000s) — the original binary/XML toolkit, designed primarily for broadcast delivery (DAB).
- **TPEG2** (current) — a modernised, UML-based generation of the standard. Same conceptual model, cleaner data structures, multiple physical encodings (XML, binary).

This pilot uses **TPEG2** application formats over an **IP-based protocol** — not DAB broadcast.

## Anatomy of TPEG

TPEG is a _family_, not a single format. It is layered:

1. **Toolkit (TPEG2-MMC, TPEG2-SNI, …)** — common building blocks: message management, service & network information, datetime, etc.
2. **Location referencing (TPEG2-ULR, TMC, OpenLR)** — how a message points at a real-world place on the road network.
3. **Application formats** — what the message is _about_. Each application is a separate specification:

| Application   | Subject                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| **TPEG2-TEC** | Traffic Event Compact — incidents, congestion, road works.                       |
| **TPEG2-TFP** | Traffic Flow & Prediction — current and predicted traffic flow on road segments. |
| TPEG2-PKI     | Parking Information.                                                             |
| TPEG2-WEA     | Weather.                                                                         |
| TPEG2-FPI     | Fuel Price Information.                                                          |
| _…and more_   |                                                                                  |

For the pilot we publish **[TPEG2-TEC](/technical/formats/tpeg2-tec)** and **[TPEG2-TFP](/technical/formats/tpeg2-tfp)**.

## Why TPEG, why now

See the [value proposition](./value) for the reasoning behind choosing TPEG2 for this pilot.

## Further reading

- [TISA — Traveller Information Services Association](https://tisa.org/)
- [ISO 21219 — Intelligent transport systems — Traffic and Travel Information (TTI) via TPEG2](https://www.iso.org/standard/63110.html)
