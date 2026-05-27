# TPEG2-TEC — Traffic Event Compact

Czech profile of the TPEG2 **Traffic Event Compact** application format.

|                 |                                   |
| --------------- | --------------------------------- |
| **Identifier**  | `x-format:cz-ndic_tpeg2-tec-v0.1` |
| **Family**      | TPEG2 (ISO 21219)                 |
| **Application** | TEC — Traffic Event Compact       |
| **Encoding**    | XML                               |
| **Status**      | Pilot · v0.1                      |

## What it carries

TPEG2-TEC describes **events** on the road network — situations that affect drivers. Typical event categories:

- accidents and incidents;
- congestion and delays;
- road works and lane closures;
- environmental events affecting traffic (e.g. floods, fallen trees);
- restrictions (weight, height, hazardous-goods).

Each event message carries — at minimum — _what_ the event is, _where_ it is, _when_ it is in effect, and _who_ it affects (vehicle classes, directions).

## Location referencing

Events are anchored to the road network using location referencing methods supported by TPEG2:

- **TMC** — traditional TMC location codes, for backward compatibility.
- **OpenLR** — for dynamic and consumer-map-independent referencing.

The exact set of supported methods is documented in the FSP `FORMAT.yaml`.

## Where to get the spec

The full specification — `FORMAT.yaml` metadata, the entry XSD, and a `samples/` folder — lives in a dedicated GitHub repository:

- 📦 **FSP**: [tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1)

> ⚠️ The pilot format is **v0.1**. Breaking changes between minor versions are possible until the format is promoted out of pilot status.

## Validating your parser

1. Clone or download the FSP.
2. Pick a message from `samples/`.
3. Validate it against the entry XSD referenced in `FORMAT.yaml`.
4. Run it through your parser; verify your in-memory representation against the documented fields.

If the XSD or a sample does not match what the live feed produces, please [file an issue](/about/issues) — that is exactly the kind of mismatch the pilot is here to catch.

## See also

- [Protocol](/technical/protocol) — how TEC messages are delivered.
- [TPEG2-TFP](./tpeg2-tfp) — the companion flow & prediction format.
- [What is TPEG](/tpeg/) — for a primer on the standard family.
