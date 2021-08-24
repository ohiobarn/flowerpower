# Orders

The Order lifecycle is intended to facilitate communication between the collectives and its members form early planning to fulfillment.

``` mermaid
flowchart TD;

  subgraph Draft-Phase;
    start(["fa:fa-play-circle Start"]) 
    -- Create Order --> draft("fa:fa-drafting-compass Draft<br>Order")
    -- Submit Order --> req(Requested<br>Order)
  end

  subgraph Negotiation-Phase;
    req -- MRFC Acknowledge --> pending(Pending<br>Order)
  end

  subgraph Fulfillment-Phase;
    pending
    -- MRFC Mark As Settled --> settled(Settled<br>Order)
    -- MRFC Mark As Fulfilled --> Fulfilled(Fulfilled<br>Order)
    -- MRFC Mark As Invoiced or Paid --> archived(Archived<br>Order)
  end

note1[/Modify order untill it is just right<br>Orders can stay in this phase for as longe as needed/] -.-> Draft-Phase

note2[/Work with MRFC to finalize the order<br>Additional edits may be required/] -.-> Negotiation-Phase

note3[/No edits can be made during this phase the<br>order is in view only mode. Once archived <br>the order will no longer display in your active order <br>list but can be view via Order History/] -.-> Fulfillment-Phase

```
