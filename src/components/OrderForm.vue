<template>
  <div>
    <p>Order No. {{ order.OrderNo }}</p>

    <form>
      <div class="form-group">
        <label for="ClientJobName">Client/Job Name</label>
        <input type="text" class="form-control" id="ClientJobName" placeholder="The Jonson Wedding">
        <p>In communications regarding this order it may be more convient to referr to the client or job name rather than having to remember the order number. If you want to use this field to give your order a <i>Title</i> that is good too.</p>
      </div>
      <div class="form-group">
        <label for="TeamMemberName">Team Member Name</label>
        <input type="text" class="form-control" id="TeamMemberName" placeholder="Kim">
        <p>If we need to reach out to you, please give us a contact name so we know who to ask for.</p>
      </div>
      <div class="form-group">
        <label for="DueDate">Delivery Date</label>
        <input type="text" class="form-control" id="DueDate" placeholder="mm/dd/yyyy">
        <p>The date you exp</p>
      </div>              
      <div class="form-group">
        <label for="Notes">Notes</label>
        <textarea class="form-control" id="Notes" rows="3"></textarea>
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