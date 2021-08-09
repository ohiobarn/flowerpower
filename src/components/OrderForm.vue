<template>
  <div>
    <p>Order No. {{ order.OrderNo }}</p>

    <form>
      <h3>Order Header</h3>
      <hr>
      <div class="form-group">
        <label for="ClientJobName">Client/Job Name</label>
        <input type="text" class="form-control" id="ClientJobName" placeholder="The Jonson Wedding" aria-describedby="ClientJobNameHelp">
        <small id="ClientJobNameHelp" class="form-text text-muted">In communications regarding this order it may be more convient to referr to the client or job name rather than having to remember the order number. If you want to use this field to give your order a <i>Title</i> that is good too.</small>
      </div>

      <div class="form-group">
        <label for="TeamMemberName">Team Member Name</label>
        <input type="text" class="form-control" id="TeamMemberName" placeholder="Kim" aria-describedby="TeamMemberNameHelp">
        <small id="TeamMemberNameHelp" class="form-text text-muted">If we need to reach out to you, please give us a contact name so we know who to ask for.</small>
      </div>
      <div class="form-group">
        <label for="DueDate">Due Date</label>
        <input type="text" class="form-control" id="DueDate" placeholder="mm/dd/yyyy" aria-describedby="DueDateHelp">
        <small id="DueDateHelp" class="form-text text-muted">This is the pickup or delivery date the order.</small>
      </div>              
      <div class="form-group">
        <label for="Notes">Notes</label>
        <textarea class="form-control" id="Notes" rows="3"></textarea>
      </div>
      <h3>Order Detail</h3>
      <hr>
        <div class="form-row">
          <div class="col-7">
            <label for="Variety">Variety</label>
            <input type="text" class="form-control" placeholder="">
          </div>
          <div class="col">
            <label for="Quantity">Quantity</label>
            <input type="text" class="form-control" placeholder="">
          </div>
          <div class="col">
            <label for="ItemNotes">Notes</label>
            <input type="text" class="form-control" placeholder="">
          </div>
        </div>
        <div class="form-row">
          <div class="col-7">
            <input type="text" class="form-control" placeholder="">
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="">
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="">
          </div>
        </div>
        <div class="form-row">
          <div class="col-7">
            <input type="text" class="form-control" placeholder="">
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="">
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="">
          </div>
        </div>                  
    </form>
  </div>
</template>

<script>
export default {
  props: {

    order: Object
  }

}
</script>

<style>

</style>