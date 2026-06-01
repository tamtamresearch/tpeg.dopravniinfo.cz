# Technical

This section documents what a consumer needs to integrate with the pilot TPEG service:

- the **[delivery protocol](./protocol)**, how messages are exchanged between the service and a consumer;
- the **[formats](./formats/)**, what those messages look like on the wire.

::: info Pilot stage
This is pilot-stage documentation. Breaking changes are announced to active subscribers by e-mail in advance.
:::

## At a glance

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Standards family**     | TPEG2 ([ISO 21219-1:2023](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-1:ed-1:v1:en)) |
| **Encoding**             | XML                                                                                       |
| **Delivery**             | IP-based pull (see [Protocol](./protocol))                                                |
| **Location referencing** | TMC + OpenLR (per application format)                                                     |
| **Authentication**       | Per-subscriber, issued on subscription                                                    |
| **Coverage**             | Czechia (CZ0), see [Coverage](#coverage)                                                  |
| **Upstream source**      | DATEX II feeds from ŘSD / NDIC, see [Upstream data](/pilot/#upstream-data)                |

## Published formats

| Format                               | Identifier                        | Use                                                |
| ------------------------------------ | --------------------------------- | -------------------------------------------------- |
| **[TPEG2-TEC](./formats/tpeg2-tec)** | `x-format:cz-ndic_tpeg2-tec-v0.1` | Traffic events. Incidents, congestion, road works. |
| **[TPEG2-TFP](./formats/tpeg2-tfp)** | `x-format:cz-ndic_tpeg2-tfp-v0.1` | Traffic flow and prediction.                       |

Each format has its own **Format Specification Package (FSP)** on GitHub. The FSP holds `FORMAT.yaml` metadata, the entry XSD for validation, and a sample folder. Follow the links above for details.

## Coverage

The pilot's coverage matches the upstream ŘSD / NDIC source data, for both published formats:

| Parameter           | Value                                                                   |
| ------------------- | ----------------------------------------------------------------------- |
| **Area**            | CZ0 (Czechia, NUTS-1)                                                   |
| **Network**         | Motorways, arterial road network, regional roads, urban and local roads |
| **Transport modes** | Car, truck, motorcycle, bus                                             |

## How to get started

1. Read the [protocol](./protocol) page for transport, polling cadence, and credentials.
2. Pick the format you care about and read its page.
3. Validate your parser against the XSD and the samples in the FSP.
4. [Subscribe](/subscribe/) to get credentials and the feed endpoint URLs.
