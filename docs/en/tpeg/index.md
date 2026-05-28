# What is TPEG

**TPEG**, the _Transport Protocol Experts Group_ format, is a family of open standards for encoding **traffic and travel information** (TTI). It's designed to be exchanged between systems, languages, and delivery channels.

TPEG was developed under the **[TISA](https://tisa.org/)** (Traveller Information Services Association) umbrella and is standardised by ISO and CEN. Together with DATEX II it's one of the two families of TTI formats in wide use today. DATEX II tends to dominate back-office exchange between road authorities. TPEG sits closer to the end user.

For a short, non-paywalled overview of the standard, see the **[TPEG primer](https://tisa.org/tpeg-primer/)** on the TISA site.

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

## What TPEG offers

**Open data model.** TPEG2 is specified in ISO 21219. A client built against the spec can be reused across countries and providers. You're not locked to one supplier.

**Built for end-user delivery.** DATEX II is mostly a back-office exchange format between authorities. TPEG2's application formats (TEC, TFP, and the rest) are designed for delivery to navigation devices, in-car systems, and traffic apps. They're compact, language-aware, and message-management aware.

**Stable location referencing.** TPEG2 supports several location referencing methods, including TMC and OpenLR. Messages can be resolved against your own map without coupling tightly to ours.

**Incremental updates.** The protocol works with message lifecycles: _create_, _update_, _cancel_. You don't have to re-parse the full traffic picture on every cycle.

## Caveats

- **TPEG2 is heavier than TMC.** Message volume and complexity are higher. If your channel is very constrained, TMC may still be the better pick.
- **Tooling is thinner than for DATEX II.** Open-source TPEG2 tooling is less mature. Part of the point of the pilot is to surface and fix this.
- **It's a pilot.** The technical value is real, but there are no operational commitments. See [scope and status](/pilot/).

## Further reading

- [TPEG primer](https://tisa.org/tpeg-primer/), a short introduction maintained by TISA.
- [TISA, Traveller Information Services Association](https://tisa.org/)
- [ISO 21219-1, TPEG2 framework](https://www.iso.org/standard/79437.html), current edition.
