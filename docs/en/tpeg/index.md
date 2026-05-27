# What is TPEG

**TPEG**, the _Transport Protocol Experts Group_ format, is a family of open standards for encoding **traffic and travel information** (TTI). It's designed to be exchanged between systems, languages, and delivery channels.

TPEG was developed under the **TISA** (Traveller Information Services Association) umbrella and is standardised by ISO and CEN. Together with DATEX II it's one of the two families of TTI formats in wide use today. DATEX II tends to dominate back-office exchange between road authorities. TPEG sits closer to the end user.

## A short history

- **TPEG1** (early 2000s): the original binary/XML toolkit, built for broadcast (DAB).
- **TPEG2** (current): a modernised, UML-based generation. Same conceptual model, cleaner data structures, multiple physical encodings (XML, binary).

This pilot uses **TPEG2** application formats over an **IP-based protocol**. It's not a DAB broadcast.

## Anatomy of TPEG

TPEG is a family, not a single format. It's layered:

1. **Toolkit (TPEG2-MMC, TPEG2-SNI, …)**: common building blocks. Message management, service and network information, datetime, and so on.
2. **Location referencing (TPEG2-ULR, TMC, OpenLR)**: how a message points at a real-world place on the road network.
3. **Application formats**: what a message is about. Each application is a separate specification:

| Application   | Subject                                                                         |
| ------------- | ------------------------------------------------------------------------------- |
| **TPEG2-TEC** | Traffic Event Compact. Incidents, congestion, road works.                       |
| **TPEG2-TFP** | Traffic Flow & Prediction. Current and predicted traffic flow on road segments. |
| TPEG2-PKI     | Parking information.                                                            |
| TPEG2-WEA     | Weather.                                                                        |
| TPEG2-FPI     | Fuel price information.                                                         |
| _…and more_   |                                                                                 |

For the pilot we publish **[TPEG2-TEC](/technical/formats/tpeg2-tec)** and **[TPEG2-TFP](/technical/formats/tpeg2-tfp)**.

## Why TPEG, why now

See [why TPEG fits this pilot](./value) for the reasoning behind the choice.

## Further reading

- [TISA, Traveller Information Services Association](https://tisa.org/)
- [ISO 21219, TPEG2](https://www.iso.org/standard/63110.html)
