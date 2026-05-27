# Technical specifications

This section documents everything a consumer needs to integrate with the pilot TPEG service:

- the **[delivery protocol](./protocol)** — how messages are exchanged between the service and a consumer;
- the **[formats](./formats/)** — what those messages look like on the wire.

> All specifications described here are part of the pilot and are versioned. Breaking changes are possible between pilot versions; see the [pilot changelog](/pilot/changelog).

## At a glance

|                          |                                                   |
| ------------------------ | ------------------------------------------------- |
| **Standards family**     | TPEG2 (ISO 21219)                                 |
| **Encoding**             | XML                                               |
| **Delivery**             | IP-based pull / push (see [Protocol](./protocol)) |
| **Location referencing** | TMC + OpenLR (per application format)             |
| **Authentication**       | Per-subscriber, issued on subscription            |
| **Coverage**             | Czech road network, ŘSD-managed                   |

## Published formats

| Format                               | Identifier                        | Use                                                 |
| ------------------------------------ | --------------------------------- | --------------------------------------------------- |
| **[TPEG2-TEC](./formats/tpeg2-tec)** | `x-format:cz-ndic_tpeg2-tec-v0.1` | Traffic events — incidents, congestion, road works. |
| **[TPEG2-TFP](./formats/tpeg2-tfp)** | `x-format:cz-ndic-tpeg2-tfp-v0.1` | Traffic flow and prediction.                        |

Each format has a dedicated **Format Specification Package (FSP)** on GitHub: `FORMAT.yaml` metadata, the entry XSD for validation, and a sample folder. Follow the links above for details.

## How to get started

1. Read the [protocol](./protocol) page to understand transport, polling cadence, and credentials.
2. Pick the format(s) relevant to your use case and read their pages.
3. Validate your parser against the XSD and the supplied samples from the FSP repositories.
4. [Subscribe](/subscribe/) to get production credentials and a sandbox URL.
