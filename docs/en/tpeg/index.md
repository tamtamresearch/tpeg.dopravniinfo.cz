# What is TPEG

**TPEG**, the _Transport Protocol Experts Group_ format, is a family of open standards for encoding **traffic and travel information** (TTI). It's designed to be exchanged between systems, languages, and delivery channels.

TPEG was developed under the **[TISA](https://tisa.org/)** (Traveller Information Services Association) umbrella and is standardised by ISO and CEN. Together with DATEX II it's one of the two families of TTI formats in wide use today. DATEX II tends to dominate back-office exchange between road authorities. TPEG sits closer to the end user.

For a short, non-paywalled overview of the standard, see the **[TPEG primer](https://tisa.org/tpeg-primer/)** on the TISA site.

## A short history

- **TPEG1** (early 2000s): the original binary/XML toolkit, built for broadcast (DAB).
- **TPEG2** (current): a modernised, UML-based generation. Same conceptual model, cleaner data structures, multiple physical encodings (XML, binary).

This pilot uses **TPEG2** application formats **over the internet**. It's not a DAB broadcast.

## Anatomy of TPEG

TPEG2 is a family of standards, not a single format. It's specified in the **ISO 21219 series**, authored in UML, and rendered in two physical encodings: **binary** and **XML**.

Every TPEG2 message has a three-container structure:

1. **Message management** (TPEG2-MMC, [ISO 21219-6](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-6:ed-1:v1:en)): identifiers, versioning, lifecycle, validity.
2. **Application**: the actual payload. One application format per use case (see below).
3. **Location referencing** (TPEG2-LRC, [ISO 21219-7](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-7:ed-1:v1:en)): how the message points at a real-world place. Several methods are supported and can travel side-by-side in the same message; **OpenLR** ([ISO/TS 21219-22](https://www.iso.org/obp/ui/en#iso:std:iso:ts:21219:-22:ed-1:v1:en)) and **TMC** location codes ([ISO 17572-2](https://www.iso.org/obp/ui/en#iso:std:iso:17572:-2:ed-3:v1:en)) are the common ones in use today.

A toolkit of framework parts (introduction, modelling rules, service-frame wrapper) sits underneath. Consumers rarely interact with those directly.

### Application formats

| Application                                   | ISO part                                                                       | Subject                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **[TPEG2-TEC](/technical/formats/tpeg2-tec)** | [ISO 21219-15](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-15:ed-1:v1:en) | Traffic Event Compact. Incidents, congestion, road works.               |
| **[TPEG2-TFP](/technical/formats/tpeg2-tfp)** | [ISO 21219-18](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-18:ed-1:v1:en) | Traffic Flow & Prediction. Current and predicted flow on road segments. |
| TPEG2-PKI                                     | [ISO 21219-14](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-14:ed-1:v1:en) | Parking information.                                                    |
| TPEG2-FPI                                     | [ISO 21219-16](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-16:ed-1:v1:en) | Fuel price information.                                                 |
| TPEG2-WEA                                     | [ISO 21219-19](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-19:ed-1:v1:en) | Weather.                                                                |
| TPEG2-EMI                                     | [ISO 21219-25](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-25:ed-1:v1:en) | Electromobility information.                                            |

The **bold** rows are what this pilot publishes.

### Location referencing

| Part      | ISO part                                                                             | Subject                                              |
| --------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| TPEG2-OLR | [ISO/TS 21219-22](https://www.iso.org/obp/ui/en#iso:std:iso:ts:21219:-22:ed-1:v1:en) | OpenLR. Map-agnostic location encoding.              |
| TPEG2-GLR | [ISO 21219-21](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-21:ed-1:v1:en)       | Geographic location referencing (coordinates).       |
| TPEG2-TLR | [ISO 17572-2](https://www.iso.org/obp/ui/en#iso:std:iso:17572:-2:ed-3:v1:en)         | Pre-coded location references (TMC location tables). |
| TPEG2-DLR | [ISO 17572-3](https://www.iso.org/obp/ui/en#iso:std:iso:17572:-3:ed-2:v1:en)         | Dynamic location references.                         |

### Toolkit

| Part      | ISO part                                                                     | Subject                                                              |
| --------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| TPEG2-SFW | [ISO 21219-5](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-5:ed-1:v1:en) | Service Frame Wrapper. Outer envelope for a TPEG2 service.           |
| TPEG2-MMC | [ISO 21219-6](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-6:ed-1:v1:en) | Message Management Container. Lifecycle, versioning, validity.       |
| TPEG2-LRC | [ISO 21219-7](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-7:ed-1:v1:en) | Location Referencing Container. Holds the per-message location refs. |

### Special applications

| Part      | ISO part                                                                     | Subject                                                                   |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| TPEG2-SNI | [ISO 21219-9](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-9:ed-1:v1:en) | Service and Network Information. Service-level metadata for a TPEG2 feed. |

## What TPEG offers

**Open data model.** TPEG2 is specified in ISO 21219. A client built against the spec can be reused across countries and providers. You're not locked to one supplier.

**Built for end-user delivery.** DATEX II is mostly a back-office exchange format between authorities. TPEG2's application formats (TEC, TFP, and the rest) are designed for delivery to navigation devices, in-car systems, and traffic apps. They're compact, language-aware, and message-management aware.

**Stable location referencing.** TPEG2 supports several location referencing methods, including TMC and OpenLR. Messages can be resolved against your own map without coupling tightly to ours.

**Incremental updates.** The protocol works with message lifecycles: _create_, _update_, _cancel_. You don't have to re-parse the full traffic picture on every cycle.

## Caveats

- **TPEG2 is heavier than RDS-TMC.** Message volume and complexity are higher. If your channel is very constrained, RDS-TMC may still be the better pick. However, RDS-TMC rides on FM broadcast, which is on a sunset path across much of Europe in favour of DAB. Long-term planning around RDS-TMC needs to account for that.
- **Tooling is thinner than for DATEX II.** Open-source TPEG2 tooling is less mature. Part of the point of the pilot is to surface and fix this.
- **It's a pilot.** The technical value is real, but there are no operational commitments. See [scope and status](/pilot/).

## Further reading

- [TPEG primer](https://tisa.org/tpeg-primer/), a short introduction maintained by TISA.
- [TPEG explained](https://tisa.org/tpeg-explained/), TISA's longer walk-through of the standard.
- [TISA, Traveller Information Services Association](https://tisa.org/)
- [ISO 21219-1:2023](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-1:ed-1:v1:en), the TPEG2 framework document.
