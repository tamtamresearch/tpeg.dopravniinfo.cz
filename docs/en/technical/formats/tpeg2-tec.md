# TPEG2-TEC, Traffic Event Compact

Czech profile of the TPEG2 **Traffic Event Compact** application format.

|                 |                                   |
| --------------- | --------------------------------- |
| **Identifier**  | `x-format:cz-ndic_tpeg2-tec-v0.1` |
| **Family**      | TPEG2 (ISO 21219)                 |
| **Application** | TEC, Traffic Event Compact        |
| **Encoding**    | XML                               |
| **Status**      | Pilot                             |

## What it carries

TPEG2-TEC describes **events** on the road network: situations that affect drivers. Typical categories:

- accidents and incidents;
- congestion and delays;
- road works and lane closures;
- environmental events affecting traffic (e.g. floods, fallen trees);
- restrictions (weight, height, hazardous-goods).

Each event message carries, at minimum, _what_ the event is, _where_ it is, _when_ it's in effect, and _who_ it affects (vehicle classes, directions).

## Location referencing

Events are anchored to the road network using TPEG2's supported location referencing methods:

- **TMC**: traditional TMC location codes, for backward compatibility.
- **OpenLR**: for dynamic and consumer-map-independent referencing.

The exact set of supported methods is in the FSP `FORMAT.yaml`.

## Where to get the spec

The full specification (`FORMAT.yaml` metadata, entry XSD, and `samples/` folder) is in a dedicated GitHub repository:

- **FSP**: [tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1)

If the XSD or a sample doesn't match what the live feed produces, [file an issue](/about/issues). That's exactly the kind of mismatch the pilot is here to catch.

## See also

- [Protocol](/technical/protocol), how TEC messages are delivered.
- [TPEG2-TFP](./tpeg2-tfp), the companion flow & prediction format.
- [What is TPEG](/tpeg/), the primer.
