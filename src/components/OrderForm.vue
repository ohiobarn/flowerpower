<template>
  <div>
    <h3>Order No. {{ order.OrderNo }}</h3>

    <form>
      <hr />
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="ClientJobName">Client/Job Name</label>
            <input type="text" class="form-control" id="ClientJobName" placeholder="The Jonson Wedding"/>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="TeamMemberName">Team Member Name</label>
            <input type="text" class="form-control" id="TeamMemberName" placeholder="Karen"/>
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
      <hr>

      <div class="form-row">
        <div class="col">
          <label for="Variety">Variety</label>
        </div>
        <div class="col-2">
          <label for="Quantity">Bu</label>
        </div>
        <div class="col-3">
          <label for="ExtendPrice">Extended</label>
        </div>
      </div>

      <div class="form-row" v-for="line of lines" :key="line.idx">

        <div class="col">
          <select class="form-control" :id="'Variety_'+line.idx" v-on:change="onChangeVariety()" v-model="lines[line.idx].id">
            <option value="" placeholder="" ></option>
            <option v-for="rec in forecastRecords" :key="rec.id" :value="rec.id" >
              <!-- if using a map <option v-for="(recKey, rec) in forecastMap" :key="recKey" :value="recKey"> -->
              <p v-if='rec["Stems per Bunch"] != 10'>{{ rec.Crop }} - {{ rec.Variety }} ({{ rec["SKU #"] }}) - ${{rec["Price per Bunch"] }}/bu @ {{ rec["Stems per Bunch"] }} spb</p>
              <p v-else>{{ rec.Crop }} - {{ rec.Variety }} ({{ rec["SKU #"] }}) - ${{rec["Price per Bunch"] }}/bu</p>
            </option>  
          </select>
        </div>

        <div class="col-2">
          <input :id="'Quantity_'+line.idx"  v-model="lines[line.idx].quantity" type="number" class="form-control" placeholder="" v-on:change="onChangeQuantity()"/>
        </div>

        <div class="col-3">
          <input :id="'Extended_'+line.idx" :value="lines[line.idx].extended" type="number" class="form-control" placeholder="" readonly="true"/>
        </div>

      </div>

      <div class="form-row">
        <div class="col">
            <p></p>
        </div>
        <div class="col-2">
          <p></p>
        </div>

        <div class="col-3">
          <hr>
        </div>        
      </div>
      
      <div class="form-row">
        <div class="col">
            <small class="form-text text-muted">All varieties sold at 10 stems per bunch (spb) unless stated otherwise</small>  
        </div>
        <div class="col-2">
          <p></p>
        </div>

        <div class="col-3">
          <input :id="orderTotal"  :value="orderTotal" type="number" class="form-control" placeholder="0.00" readonly="true"/>
        </div>        
      </div>
      

    </form>
    <br />
    <br />
    <br />
    <br />
    

  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    forecastRecords: [],
    
  },
  data(){
    
    return {
      var1: "",
      lines: [ 
      { idx: 0, id: "", sku: "", quantity: 0, price: 0, extended: 0},
      { idx: 1, id: "", sku: "", quantity: 0, price: 0, extended: 0},
      { idx: 2, id: "", sku: "", quantity: 0, price: 0, extended: 0},
      { idx: 3, id: "", sku: "", quantity: 0, price: 0, extended: 0}
     ],
     orderTotal: 0,
     forecastMap: new Map()
    }
    
  },
  methods: {
    onChangeVariety() {
      this.refreshLines() 
    },
    onChangeQuantity() {
      this.refreshLines()
    },
    refreshLines(){
      console.log("refreshing lines")
      let orderTotal = 0

      for (let i = 0; i < this.lines.length; i++) {
        
        // get record information from Map
        let rec = this.forecastMap.get(this.lines[i].id)

        // Don't set the quantity go negative
        if (this.lines[i].quantity < 0 ) {
          this.lines[i].quantity = 0
        }

        // Only need to refresh line if a variety is selected
        if (typeof rec != "undefined") {
          
          // Get the price from forecastMap for selected item
          this.lines[i].price = rec["Price per Bunch"]

          // Extend the price
          let extended = Number(this.lines[i].price) * Number(this.lines[i].quantity)
          this.lines[i].extended = Number(extended).toFixed(2)

          orderTotal = orderTotal + extended
        }
        
         
      }
      this.orderTotal = Number(orderTotal).toFixed(2)
    }

  },
  // Create map from array
  updated(){                                                                     

    if (this.forecastMap.size == 0) {
      console.log("Load forecastMap")
      for (let i = 0; i < this.forecastRecords.length; i++) {
        this.forecastMap.set(this.forecastRecords[i].id,this.forecastRecords[i])
      }
    }
    
    // Not sure if this is needed but it is fast
    // this.refreshLines()
  },


}
</script>

<style>
</style>