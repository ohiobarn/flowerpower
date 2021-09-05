# Orders

The Order lifecycle is intended to facilitate communication between the collectives and its members form early planning to fulfillment.

## Order Status

``` mermaid
flowchart LR;

draft(Draft) --> submit("Submitted") --> pending(Pending) --> settled(Settled) --> fulfilled(Fulfilled) --> archived(Archived)
```

## Order Status Flow

``` mermaid
flowchart TD;

  subgraph Draft-Phase;
    start(["Start"]) 
    -- Create Order --> draft("Draft<br>Order")
    -- Submit Order --> submit(Submitted<br>Order)
  end

  subgraph Collaboration-Phase;
    submit -- MRFC Acknowledge --> pending(Pending<br>Order)
  end

  subgraph Fulfillment-Phase;
    pending
    -- MRFC Mark As Settled --> settled(Settled<br>Order)
    -- MRFC Mark As Fulfilled --> fulfilled(Fulfilled<br>Order)
    -- MRFC Mark As Invoiced or Paid --> archived(Archived<br>Order)
  end

note1[/Modify order untill it is just right<br>Orders can stay in this phase for as longe as needed/] -.-> Draft-Phase

note2[/Work with MRFC to finalize the order<br>Additional edits may be required/] -.-> Collaboration-Phase

note3[/No edits can be made during this phase the<br>order is in view only mode. Once archived <br>the order will no longer display in your active order <br>list but can be view via Order History/] -.-> Fulfillment-Phase

```
