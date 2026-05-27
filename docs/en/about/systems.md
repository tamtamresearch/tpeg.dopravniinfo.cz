# Sources of Traffic Information and Involved Parties

The process of traffic information exchange includes number of systems, participants and processes, which are described further, for better understanding of context of traffic information registry.

## Sources and Their Access Points

**Traffic information source** describes certain type of traffic information,
for example: accidents, closures, data from weather units etc. and is available for subscription.

Those information are provided through **access points** (also data distribution interfaces), which is usually an url, to which subscriber
can send a HTTP request and get requested information in response. It could also be a system, which actively dispatches data to subscriber url (PUSH).

## Provider and his Representatives

One or more of traffic information sources and related access points are
operated by a specific **traffic information provider**

Every traffic information source can be administrated by **traffic information source administrator**, with whom the subscription is set-up and technical problems are sorted out, if necessary.
Potential problems can be also solved with **responsible administrator of provider**.

![Systems and parties involved in the traffic information distribution](/docs/img/en/domain.png)

## National Traffic Information Registry (this web)

**National registry of traffic information** provides information necessary for subscription to access traffic information. It's a list of providers and their traffic information sources including technical description of format, exchange protocols and information about process of subscribing.

## Subscriber

**Subscriber representative** would find necessary information in registry and use them to:

- Evaluate suitability of specific traffic information source.
- Subscribing to access traffic information.
- Implementation of traffic information data access..
- Implementation of import of accepted information to own IT system.
