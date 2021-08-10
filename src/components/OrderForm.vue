<template>
  <div>
    <p>Order No. {{ order.OrderNo }}</p>

    <form>
      <h3>Order Header</h3>
      <hr />
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="ClientJobName">Client/Job Name</label>
            <input type="text" class="form-control" id="ClientJobName" placeholder="The Jonson Wedding"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="TeamMemberName">Team Member Name</label>
            <input type="text" class="form-control" id="TeamMemberName" placeholder="Kim"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <small class="form-text text-muted">
            When you need to contact us about this order it may be more convient
            to use to the client or job name rather than having to remember the
            order number. And if we need to reach out to you, please give us a
            contact name so we know who to ask for.
          </small>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <p></p>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="DueDate">Due Date</label>
            <input type="text" class="form-control" id="DueDate" placeholder="mm/dd/yyyy" aria-describedby="DueDateHelp"/>
            <small id="DueDateHelp" class="form-text text-muted">This is the pickup or delivery date the order.</small>
          </div>
        </div>
        <div class="col">
          <p></p>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="Notes">Notes</label>
            <textarea class="form-control" id="Notes" rows="3"></textarea>
            <small id="NotesHelp" class="form-text text-muted">Please provide any notes that may be useful in fulfilling this order.</small>
          </div>
        </div>
      </div>

      <br />
      <h3>Order Detail</h3>
      <hr />

      <!--
        Line items
      -->
      <small class="form-text text-muted">All varieties sold at 10 stems per bunch (spb) unless stated otherwise</small>
      <div class="form-row">
        <div class="col-8">
          <label for="Variety">Variety</label>
        </div>
        <div class="col-1">
          <label for="Quantity">Bunches</label>
        </div>
        <div class="col-2">
          <label for="ExtendPrice">Extend Price</label>
        </div>
      </div>

      <div class="form-row" v-for="line of lines" :key="line.id">
        <div class="col-8">
          <select class="form-control" id="Variety">
            <option value=""></option>
            <option v-for="rec in forecastRecords" :key="rec.id" :value="rec.id">
              <p v-if='rec["Stems per Bunch"] != 10'>
                {{ rec.Crop }} - {{ rec.Variety }} ({{ rec["SKU #"] }}) - ${{rec["Price per Bunch"] }}/bu @ {{ rec["Stems per Bunch"] }} spb
              </p>
              <p v-else>
                {{ rec.Crop }} - {{ rec.Variety }} ({{ rec["SKU #"] }}) - ${{rec["Price per Bunch"] }}/bu
              </p>
            </option>  
          </select>
        </div>
        <div class="col-1">
          <input id="Quantity" type="text" class="form-control" placeholder=""/>
        </div>
        <div class="col-2">
          <input id="ExtendPrice" type="text" class="form-control" placeholder=""/>
        </div>
      </div>


    </form>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    forecastRecords: Array,
  },
  data(){
    return {
      lines: [ 
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
      { id: '6' },
      { id: '7' },
      { id: '8' },
      { id: '9' }
     ]
    }
    
  }
};
</script>

<style>
</style>