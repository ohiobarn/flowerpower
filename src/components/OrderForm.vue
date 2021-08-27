<template>
  <div>
    <h3>Order No. {{ order.OrderNo }}</h3>

    <form>
      <hr />
      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="ClientJobName">Client/Job Name</label>
            <input type="text" v-model="order['Client/Job']" class="form-control" id="ClientJobName" placeholder="The Johnson Wedding"/>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="TeamMemberName">Team Member Name</label>
            <input type="text" v-model="order['Team Member']" class="form-control" id="TeamMemberName" placeholder="Karen"/>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <small class="form-text text-muted">
            When you need to contact us about this order it may be more convenient
            to use the client or job name rather than having to remember the
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
            <input type="text" v-model="order['Due Date']" class="form-control" id="DueDate" placeholder="mm/dd/yyyy" aria-describedby="DueDateHelp"/>
            <small id="DueDateHelp" class="form-text text-muted">This is the pickup or delivery date the order.</small>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <div class="form-group">
            <label for="Notes">Notes</label>
            <textarea v-model="order.Notes" class="form-control" id="Notes" rows="3"></textarea>
            <small id="NotesHelp" class="form-text text-muted">Please provide any notes that may be useful in fulfilling this order.</small>
          </div>
        </div>
      </div>

      <br />
      <h3>Order Detail</h3>
      <br />

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


      <div class="form-row" v-for="(detail, index ) in orderDetails" :key="index">
        <div class="col">
          
          <select class="form-control form-control-sm"  v-on:change="onChangeVariety" v-model="orderDetails[index].SKU">
            <option value="" placeholder="select variety" ></option>
            <option v-for="rec in forecastRecords" :key="rec.SKU" :value="rec.SKU" >
              <p v-if='rec["Stems per Bunch"] != 10'>{{ rec.Crop }}, {{ rec.Variety }} {{rec.Color}} ({{ rec["SKU #"] }}), ${{rec["Price per Bunch"] }}/bu @ {{ rec["Stems per Bunch"] }} spb</p>
              <p v-else>{{ rec.Crop }}, {{ rec.Variety }}, {{rec.Color}} ({{ rec["SKU #"] }}), ${{rec["Price per Bunch"] }}/bu</p>
            </option>  
          </select>
          <!-- <small><i>{{ detail.Crop }} - {{ detail.Variety }} ({{ detail.SKU }}) - ${{detail["Price per Bunch"] }}/bu @ {{ detail["Stems per Bunch"] }} spb</i></small>
          <p></p> -->
        </div>

        <div class="col-2">
          <input v-model="orderDetails[index].Bunches" type="number" class="form-control" placeholder="" v-on:change="onChangeQuantity"/>
        </div>

        <div class="col-3">
          <input v-model="detail.Extended" type="number" class="form-control" placeholder="" readonly="true"/>
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
            <p><small class="form-text text-muted">All varieties sold at 10 stems per bunch (spb) unless stated otherwise</small></p>  
        </div>
        <div class="col-2">
          <p></p>
        </div>

        <div class="col-3">
          <input :value="orderTotal" type="number" class="form-control" placeholder="0.00" readonly="true"/>
        </div>        
      </div>

        
      <hr>

      <div class="form-row">
        <div class="col">
            <button type="button" class="btn btn-primary" v-on:click="saveOrder" >Save</button>  
        </div>
        <!-- <div class="col">
            <p></p>
        </div> -->
        <div class="col">
          <router-link to="/order" class="btn btn-secondary">Cancel</router-link> 
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

    RecID: String
  },
  data(){
    
    return {
     orderTotal: 0,
     order: Object,
     orderDetails: [],
     forecastRecords: [],
     forecastMap: new Map(),
    }
    
  },

  methods: {
    onChangeVariety() {
      this.refreshLines() 
    },
    onChangeQuantity() {
      this.refreshLines()
    },

    //
    // refresh line
    //
    refreshLines(){
      let orderTotal = 0

      var noLines = Number(this.orderDetails.length)
      for (let i = 0; i < noLines; i++) {
      
        // Don't let the quantity go negative
        if (Number(this.orderDetails[i].Bunches) < 0 ) {
          this.orderDetails[i].Bunches = 0
        }

        // Only need to refresh line if a variety is selected
        if (this.orderDetails[i].SKU.length > 0) {

          let forecastRec = this.forecastMap.get(this.orderDetails[i].SKU)

          this.orderDetails[i].Crop = forecastRec.Crop
          this.orderDetails[i].Variety = forecastRec.Variety
          this.orderDetails[i].Color = forecastRec.Color
          this.orderDetails[i]["Price per Bunch"] = forecastRec["Price per Bunch"]
          
          // Extend the price
          let extended = Number(this.orderDetails[i]["Price per Bunch"]) * Number(this.orderDetails[i].Bunches)
          this.orderDetails[i].Extended = Number(extended).toFixed(2)

          orderTotal = orderTotal + extended
        }
        
         
      }

      this.orderTotal = Number(orderTotal).toFixed(2)
    },

    //
    // Save order to AirTable
    //
    saveOrder(){

      var Airtable = require('airtable');
      Airtable.configure({
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      });
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC
      
      var atOrder = {
        "Notes": this.order.Notes,
        "Account": this.order.Account,
        "Client/Job": this.order['Client/Job'],
        "Team Member": this.order['Team Member'],
        "Due Date": this.order['Due Date']
      }
      base('Order')
      .update(this.order.RecID, atOrder)
      .then( record => {
        // DEVTODO - how do I NOT use record?
        console.log(record)

        // Update Order Detail
        this.saveOrderDetail()

        // Go back to the Order List
        this.$router.push({ path: '/order' })
      })
      .catch( err => {
        console.log(err)
      })


 
    },

    //
    // Save Order Detail to AirTable
    //
    saveOrderDetail(){

      var Airtable = require('airtable');
      Airtable.configure({
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      });
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC

      //
      // Loop through detail and if Bunches is > 0 then
      // add or update the OrderDetail
      //
      for (let i = 0; i < this.orderDetails.length; i++) {
        if (this.orderDetails[i].Bunches > 3){


          let detail = {
            // id: this.orderDetails[i].RecID,
            // RecID: this.orderDetails[i].RecID, 
            // Account: this.order.Account,
            SKU: this.orderDetails[i].SKU, 
            Crop: this.orderDetails[i].Crop,
            Variety: this.orderDetails[i].Variety, 
            Color: this.orderDetails[i].Color,
            Bunches: this.orderDetails[i].Bunches,
            "Price per Bunch": Number(this.orderDetails[i]["Price per Bunch"]),
            "Stems per Bunch": Number(this.orderDetails[i]["Stems per Bunch"]),
            Extended: Number(this.orderDetails[i].Extended)
            // OrderRecID: [this.order.RecID]
          }

          if(this.orderDetails[i].RecID == ""){
            //DEVTODO - handle adds
          } else {
            //update
            base('OrderDetail').update(this.orderDetails[i].RecID, detail)
            .then( record => {
              console.log("updated record")
              console.log(record)
            })
            .catch( err => {
              console.log(err)
            })

          }
        }

      }

    },

    //
    // Get order from AirTable
    //
    getOrder(){

      var orderDetails = []
      // var account = this.$auth.user.email

      var Airtable = require('airtable');
      Airtable.configure({
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      });
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC

      base('Order').find(this.RecID)
      .then( record => {
        this.order = record.fields

        ///////////////////////////////////////////////////////
        // Get Order Detail
        //////////////////////////////////////////////////////
        base('OrderDetail').select({
          pageSize: 25,
          view: "fp-grid",
          // filterByFormula: 'Account = "' + account + '"',
          filterByFormula: 'OrderRecID = "' + record.id + '"'

        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
              var orderDetail = record.fields
              orderDetails.push(orderDetail)
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
        });

        //
        // Populate data
        //
        this.orderDetails = orderDetails

      })
      .catch( err => {
        console.log(err)
      })

    },

    //
    // Get forecast records from AirTable
    //
    getForecastRecords() {
      //
      // Array to hold query records
      //
      var recs = []
      var Airtable = require('airtable');
      Airtable.configure({
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      });
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC
      base('Forecast (MRFC)').select({
          maxRecords: 999,
          pageSize: 100,
          view: "MRFC Grid Public"
      }).eachPage(function page(records, fetchNextPage) {
          
          // This function (`page`) will get called for each page of records.
          records.forEach(function(record) {
              var rec = record.fields
              recs.push(rec)
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();

      }, function done(err) {
          if (err) { console.error(err); return; }
      });

      // DEVTODO - if multiple pages are needed I am not sure if this works
      //           currently the number of forecast records is < 100

      //
      // Populate data
      //
      this.forecastRecords = recs

    },

    //
    // Add one empty line for user to add new items
    //
    addBlankLine(){

      let blankLine = {
        RecID: "", 
        Account: this.order.Account,
        SKU: "", 
        Crop: "",
        Variety: "", 
        Color: "",
        Bunches: 0,
        "Price per Bunch": 0,
        "Stems per Bunch": 0, 
        Extended: 0
      }

      //
      // If orderDetails has elements then look a the last element
      // and if the last element is not an "empty line" then add 
      // and "empty line"
      //
      if (this.orderDetails.length > 0){
        var last = Number(this.orderDetails.length - 1)
        if (this.orderDetails[last].Bunches > 0 || this.orderDetails[last].SKU.length > 0){
          this.orderDetails.push(blankLine)
        }
      }

    },

    //
    // Populate forecastMap from array
    //
    populateForecastMap(){
      if (this.forecastMap.size == 0) {
        for (let i = 0; i < this.forecastRecords.length; i++) {
          this.forecastMap.set(this.forecastRecords[i].SKU,this.forecastRecords[i])
        }
      }
    }

  },
  mounted(){
    this.getForecastRecords()
    this.getOrder()
  },
  beforeUpdate() {
    this.addBlankLine()
  },
  updated(){   
    this.populateForecastMap()
  },


}
</script>

<style>
</style>