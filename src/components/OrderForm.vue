<template>
  <div>
    <h3>Order No. {{ order.OrderNo }}</h3>

    <form>
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
            <input type="text" class="form-control" id="TeamMemberName" placeholder="Karen"
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
      
      <div class="form-row">
        <div class="col-8">
          <label for="Variety">Variety</label>
        </div>
        <div class="col-1">
          <label for="Quantity">Bunches</label>
        </div>
        <div class="col-2">
          <label for="ExtendPrice">Extended</label>
        </div>
      </div>

      <div class="form-row" v-for="line of lines" :key="line.id">
        <div class="col-8">
          <select class="form-control" :id="'Variety_'+line.id">
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
          <input :id="'Quantity_'+line.id" :value="lines[line.id].quantity" type="number" class="form-control" placeholder="" v-on:click="extend(line.id,$event)"/>
        </div>
        <div class="col-2">
          <input :id="'Extended_'+line.id" :value="lines[line.id].extended" type="text" class="form-control" placeholder=""/>
        </div>
      </div>
      <small class="form-text text-muted">All varieties sold at 10 stems per bunch (spb) unless stated otherwise</small>  

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
      { id: 0 , quantity: 0, extended: ''},
      { id: 1 , quantity: 0, extended: ''},
      { id: 2 , quantity: 0, extended: ''},
      { id: 3 , quantity: 0, extended: ''}
     ]
    }
    
  },
  methods: {
    extend: function (lineID, event) {

      // DEVTODO - get price from selection
      // fake price
      let p = 1.23
      this.lines[lineID].quantity = event.target.value
      this.lines[lineID].extended = "$" + parseInt(this.lines[lineID].quantity, 10) * parseFloat(p)

    }
  }

}
</script>

<style>
</style>