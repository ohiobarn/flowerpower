# Orders

The Order lifecycle is intended to facilitate communication between the collectives and its members form early planning to fulfillment.

``` mermaid
graph TB
  start([Start]) 
  -- Create Order --> draft(Draft<br>Order)
  -- Submit Order --> req(Requested<br>Order)
  -- MRFC Acknowledge --> pending(Pending<br>Order)
  -- MRFC Mark As Settled --> settled(Settled<br>Order)
  -- MRFC Mark As Fulfield --> fulfield(Fulfield<br>Order)
  -- MRFC Mark As Invoiced or Paid --> archived(Archived<br>Order)

  draft -- Cancel Order --> stop1([End])
  req -- Edit Order --> req
  pending -- Edit Order --> pending
  pending -- MFRC Edit Order --> pending
  pending -- Cancel Order --> stop2([End])
  settled -- View --> settled
  fulfield -- View --> fulfield
  archived -- View via Order History --> archived
  
```
