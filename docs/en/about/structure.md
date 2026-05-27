# Types of Information in the Registry

The purpose of registry is to provide complete information for traffic information data subscription including implementation of data access and import.

## Format Specifications

Format specification includes:

- Description of format purpose and it's general concept.
- Data samples
- Schemas (W3C XML schema, JSON schema etc.)

Format specification should be sufficient for subscriber to implement
data import into it's own information system.

## Protocol Specifications

Protocol specification clearly states technical aspects of data transfer to subscriber.
This specification should be fully sufficient for data access implementation.

## Specification of the Subscription Process

Subscription process describes steps necessary to subscribe to source of traffic information.

This process can refer to specific people, access points, subscription administrator, or responsible administrator of provider as given by context of given source of traffic information such.

Subscription process is specific for each provider.

## Specification of the Traffic Information Source

Complete specification of traffic information source includes:

- **textual description** of provided information and their basic concept
- refers to **one or more usable formats** (one source can for example
  request one format for description of measurement locations and second for
  provision of actual measured values).
- refers to **one or more used protocols**
- states **set of formal parameters**, which are necessary for description of
  specific source of traffic information to be expressed by a value
- values of specific parameters of the source
- **state of implementation of given source**, for example if it is currently in testing or production mode, when changes of implementation can be expected etc.
- identity of **provider**
- optionally link to the **source administrator** of traffic information
- link to the **subscription process**
