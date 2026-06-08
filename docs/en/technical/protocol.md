# Protocol

The pilot service delivers TPEG2 messages **over the internet**. This page is what an integrator needs to know to consume the feed.

::: info Public summary
Full protocol details (endpoints, credentials, polling parameters) are shared with consumers as part of [how to subscribe](/subscribe/).
:::

## Transport

- **Transport**: HTTPS over TCP/IP.
- **Encoding**: TPEG2 XML payloads.
- **Compression**: `gzip` content encoding. Clients should send `Accept-Encoding: gzip`.
- **Character set**: UTF-8.

## Interaction pattern

The pilot uses a **pull model**:

1. The consumer issues an HTTPS GET to the per-format feed endpoint.
2. The server returns a **full snapshot** of currently active messages for that format. The feed is not delta-encoded; every successful response is self-contained and replaces the previous one.
3. The consumer derives create / update / cancel transitions by comparing successive snapshots against its local state, following the TPEG2 message-lifecycle rules.

Recommended polling cadence is shared with subscribers at onboarding. Don't poll faster than recommended. The source data doesn't update faster than that.

**Conditional requests are required.** The server supports `ETag` and `Last-Modified` response headers, and consumers must send `If-None-Match` and/or `If-Modified-Since` on each poll. When nothing has changed the server returns `304 Not Modified` with no body, which keeps the feed cheap to poll and the source bandwidth predictable.

## Authentication

- **Authentication method**: access token over HTTPS.
- **Credentials**: each subscriber gets an individual access token, issued at onboarding.
- Tokens are tied to a named consumer and can be **revoked** at any time, especially if the [terms of use](/about/terms-of-use) aren't respected.

## Endpoints

One endpoint per published feed. A feed carries content for one TPEG2 application format. A format may be split across multiple feeds when the content separates cleanly (e.g. a static catalogue and the dynamic data that references it). In that case all feeds for the format share the same format identifier.

**[TPEG2-TEC](./formats/tpeg2-tec)** — `x-format:cz-ndic_tpeg2-tec-v0.1`

- Single feed: traffic events.

**[TPEG2-TFP](./formats/tpeg2-tfp)** — `x-format:cz-ndic_tpeg2-tfp-v0.1`

- **Static feed**: catalogue of predefined locations.
- **Dynamic feed**: live measurements and predictions, referencing the predefined locations.

See [Feeds](./formats/tpeg2-tfp#feeds) on the TPEG2-TFP page for what each TFP feed carries.

Endpoint URLs, polling intervals, and recommended client behaviour are shared on subscription.

See the [OpenAPI specification](#) for the full endpoint reference. _[TODO: link to format spec repository once published.]_
