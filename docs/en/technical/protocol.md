# Protocol

The pilot service delivers TPEG2 messages over an **IP-based protocol**. This page summarises what an integrator needs to know to consume the feed.

> This page is a public summary. Full protocol details — endpoints, credentials, polling parameters — are shared with consumers as part of the [subscription process](/subscribe/).

## Transport

- **Transport**: HTTPS over TCP/IP.
- **Encoding**: TPEG2 XML payloads.
- **Compression**: `gzip` content encoding is supported; clients are recommended to send `Accept-Encoding: gzip`.
- **Character set**: UTF-8.

## Interaction pattern

The pilot supports a **pull model** as the primary interaction:

1. The consumer issues an HTTPS GET against the per-format feed endpoint.
2. The server returns the current TPEG2 service frame, containing the active messages for that format.
3. The consumer applies the message-lifecycle rules (create / update / cancel) from the TPEG2 toolkit to maintain its local state.

Recommended polling cadence is documented in the per-format FSP metadata. Polling more frequently than recommended is discouraged; the source data does not update faster than the recommended cadence.

A push-style delivery may be offered to specific consumers on request.

## Authentication

- Each subscriber receives an **individual credential** (HTTP header or basic auth — confirmed at onboarding).
- Credentials are tied to a named consumer and may be **rotated** or **revoked** at any time, especially if the [terms of use](/about/license) are not respected.

## Endpoints

There is one endpoint per published format:

| Format                           | Identifier                        |
| -------------------------------- | --------------------------------- |
| [TPEG2-TEC](./formats/tpeg2-tec) | `x-format:cz-ndic_tpeg2-tec-v0.1` |
| [TPEG2-TFP](./formats/tpeg2-tfp) | `x-format:cz-ndic-tpeg2-tfp-v0.1` |

Endpoint URLs (sandbox + production), polling intervals, and recommended client behaviour are shared on subscription.

## Versioning

- Protocol changes are versioned in the [pilot changelog](/pilot/changelog).
- Backwards-incompatible changes during the pilot are possible but will be announced to active subscribers in advance via e-mail.

## Reference implementations

We are not publishing a reference client in the pilot phase. If you are working on an open-source TPEG2 client and would like to coordinate, please [get in touch](/about/contacts).
