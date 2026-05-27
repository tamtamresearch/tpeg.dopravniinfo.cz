# Protocol

The pilot service delivers TPEG2 messages over an **IP-based protocol**. This page is what an integrator needs to know to consume the feed.

> This is a public summary. Full protocol details (endpoints, credentials, polling parameters) are shared with consumers as part of [how to subscribe](/subscribe/).

## Transport

- **Transport**: HTTPS over TCP/IP.
- **Encoding**: TPEG2 XML payloads.
- **Compression**: `gzip` content encoding. Clients should send `Accept-Encoding: gzip`.
- **Character set**: UTF-8.

## Interaction pattern

The pilot supports a **pull model** as the primary interaction:

1. The consumer issues an HTTPS GET to the per-format feed endpoint.
2. The server returns the current TPEG2 service frame with the active messages for that format.
3. The consumer applies the message-lifecycle rules (create, update, cancel) from the TPEG2 toolkit to maintain its local state.

Recommended polling cadence is in the per-format FSP metadata. Don't poll faster than recommended. The source data doesn't update faster than that.

Push-style delivery may be offered to specific consumers on request.

## Authentication

- Each subscriber gets an **individual credential** (HTTP header or basic auth, confirmed at onboarding).
- Credentials are tied to a named consumer and can be **rotated** or **revoked** at any time, especially if the [terms of use](/about/license) aren't respected.

## Endpoints

One endpoint per published format:

| Format                           | Identifier                        |
| -------------------------------- | --------------------------------- |
| [TPEG2-TEC](./formats/tpeg2-tec) | `x-format:cz-ndic_tpeg2-tec-v0.1` |
| [TPEG2-TFP](./formats/tpeg2-tfp) | `x-format:cz-ndic-tpeg2-tfp-v0.1` |

Endpoint URLs (sandbox and production), polling intervals, and recommended client behaviour are shared on subscription.

## Versioning

- Backwards-incompatible changes are possible during the pilot. We'll announce them to active subscribers by e-mail in advance.

## Reference implementations

We're not publishing a reference client in the pilot phase. If you're working on an open-source TPEG2 client and want to coordinate, [get in touch](/about/contacts).
