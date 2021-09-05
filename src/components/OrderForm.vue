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

        <!-- <div class="col-2">
          <input v-model="orderDetails[index].Bunches" type="number" class="form-control" placeholder="" v-on:change="onChangeQuantity"/>
        </div> -->
        <div class="col-2">
          <select class="form-control form-control-sm" name="bunches" id="bunches"  v-model="orderDetails[index].Bunches"  v-on:change="onChangeQuantity">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="24">24</option>
          </select>
          
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
      <!-- prototype order detial layout -->
      <ul class="pl-0">
        <li class="orderDetailList" v-for="(detail, index ) in orderDetails" :key="index">
          <div class="lineItem">
            
            <div class="top-row d-flex flex-row justify-content-between align-items-start">
              <span class="lead">{{detail.Crop}}</span> <i class="color-dot fas fa-circle" style="color:#F4C9C9"></i>
            </div>
            
            <div class="middle-row my-2 d-flex flex-row justify-content-around">
              <span><strong> {{detail.Variety}} </strong></span> 
            </div>
            
            <div class="label-row text-muted d-flex flex-row justify-content-between align-items-center">
              <small class="sku">SKU</small> <small class="bunches">BUNCHES</small> <small class="extended">EXTENDED</small> 
            </div>
            
            <div class="bottom-row d-flex flex-row justify-content-between align-items-center">
              <small class="sku">{{detail.SKU}}</small> <span class="bunches">{{detail.Bunches}} x ${{detail["Price per Bunch"]}}</span> <span class="extended">${{detail.Extended}}</span> 
            </div>
          
          </div>
        </li>
      </ul>

      <div>
        <!-- Color Dots/Swatches -->
        <ul class="d-flex flex-row justify-content-around">
          <li v-for="swatch in colorOptions" :key="swatch" @click="filterByColor(swatch)" :class="{inactiveSwatch: !searchCriteria.includes(swatch)}" >
            <i class="color-dot fas fa-circle" :style="{color:swatch}"></i>
          </li>
        </ul>

        <form class="search d-flex flex-row align-items-center " @submit.prevent="searchForecast" >
          
          <input id="searchBar" type="text" class="form-control" v-model="searchTerm" placeholder="Search Forecast">

          <div id="priceFilter" class="d-flex flex-column align-items-center">
            <i class="fas fa-angle-up" @click="increasePrice"></i>
            <div style="width:3em; text-align:center">{{dollarSigns}}</div>
            <i class="fas fa-angle-down" @click="decreasePrice"></i>
          </div>
        </form>

        <div>
          <ul class="d-flex flex-row flex-wrap mt-1">
            <li v-for="(term, i) in searchCriteria" :key="i" class="mx-1">
              <span class="badge rounded-pill">{{term}}<i class="far fa-times-circle ml-1" @click="removeSearchTerm(term)"></i> </span> 
            </li>
          </ul>
          <ul>
            <li v-for="(rec, i) in searchResults" :key="i" class="my-1 d-flex flex-row no-wrap justify-content-between align-items-center">
              <div>
                <p v-if='rec["Stems per Bunch"] != 10'>{{rec.Tier}}{{ rec.Crop }}, {{ rec.Variety }} {{rec.Color}} ({{ rec["SKU #"] }}), ${{rec["Price per Bunch"] }}/bu @ {{ rec["Stems per Bunch"] }} spb</p>
                <p v-else>{{rec.Tier}} {{ rec.Crop }}, {{ rec.Variety }}, {{rec.Color}} ({{ rec["SKU #"] }}), ${{rec["Price per Bunch"] }}/bu</p>
              </div>
              <div>
                <i class="far fa-plus-square ml-1" @click="addToOrder(rec)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="form-row ">
        <div class="col d-flex flex-row justify-content-center">
            <button type="button" class="btn-primary-custom" v-on:click="saveOrder" >Save</button>  
        </div>
        <!-- <div class="col">
            <p></p>
        </div> -->
        <div class="col d-flex flex-row justify-content-center">
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
     searchTerm: '',
     searchCriteria: [],
     searchResults: [],
     colorOptions: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
     priceRange: 2
    }
    
  },

  methods: {
    increasePrice(){
      if (this.priceRange < 5) {
        this.priceRange += 2
        this.updateForecastSearch()
      }
    },
    decreasePrice(){
      if (this.priceRange > 2) {
        this.priceRange -= 2
        this.updateForecastSearch()
      }
    },
    filterByColor(color){
      if (this.searchCriteria.includes(color)) {
        console.log('colord already selected')
        
        let index = this.searchCriteria.indexOf(color)
        
        this.searchCriteria.splice(index, 1)

        this.updateForecastSearch()
      }
      else {
        
        this.searchTerm = color
  
        this.searchForecast()
      }
    },
    searchForecast(){
      this.searchCriteria.push(this.searchTerm)

      this.updateForecastSearch()

      this.searchTerm = ''
    },
    updateForecastSearch(){

      if (this.searchCriteria.length === 0) {
        this.searchResults = []
      }

      this.searchCriteria.forEach(term => {
        this.filterByTerm(term)
      })

    },
    filterByTerm(term){
      let forecastList
      
      if (this.searchCriteria.length === 1) {
        forecastList = this.forecastRecords
      }
      else{
        forecastList = this.searchResults
      }
      
      let narrowedList = []

      forecastList.forEach(rec => {
        
        if (rec.Crop.toLowerCase().includes(term.toLowerCase())) {
          
          narrowedList.push(rec)
        }

        if (rec.Variety.toLowerCase().includes(term.toLowerCase())) {
          
          narrowedList.push(rec)
        }

        if (rec.Color.toLowerCase().includes(term.toLowerCase())) {
          
          narrowedList.push(rec)
        }
      })

      this.searchResults = narrowedList.filter(r => {
        return parseInt(r.Tier) <= this.priceRange
      })
    },
    removeSearchTerm(term){

      this.searchCriteria = this.searchCriteria.filter(t => t !==term)

      this.updateForecastSearch()
    },
    addToOrder(rec){
      console.log(rec)

      rec.Bunches = 1
      let extended = Number(rec["Price per Bunch"]) * Number(rec.Bunches)
      rec.Extended = extended
      this.orderDetails.push(rec)
    },
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

      //
      // Save Order Detail to AirTable
      //
      const doDetail = () => {
        // Update Order Detail
        this.saveOrderDetail()

        // Go back to the Order List
        this.$router.push({ path: '/order' })
      }
 
      //
      // Done
      //
      const done = (err) => {
        if (err) { console.error(err); return; }
      }

      var Airtable = require('airtable');
      var atConf = {
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      }

      Airtable.configure(atConf);
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC
      
      var order = {
        "Notes": this.order.Notes,
        "Account": this.order.Account,
        "Client/Job": this.order['Client/Job'],
        "Team Member": this.order['Team Member'],
        "Due Date": this.order['Due Date']
      }

      base('Order')
      .update(this.order.RecID, order)
      .then(doDetail)
      .catch(done)

    },
    //
    // Save Order Detail to AirTable
    //
    saveOrderDetail(){

      //
      // Done
      //
      const done = (err) => {
          if (err) { console.error(err); return; }
      }

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
 
        // if (this.orderDetails[i].SKU.length > 0) {


          let detail = {
            Account: this.order.Account, 
            SKU: this.orderDetails[i].SKU, 
            Crop: this.orderDetails[i].Crop,
            Variety: this.orderDetails[i].Variety, 
            Color: this.orderDetails[i].Color,
            Bunches: Number(this.orderDetails[i].Bunches),
            "Price per Bunch": Number(this.orderDetails[i]["Price per Bunch"]),
            "Stems per Bunch": Number(this.orderDetails[i]["Stems per Bunch"]),
            Extended: Number(this.orderDetails[i].Extended),
            OrderRecID: [this.order.RecID]
          }

          // If New and SKU and Bunches specified then create
          if(this.orderDetails[i].isNew && this.orderDetails[i].SKU.length > 0 && this.orderDetails[i].Bunches > 0 ){
            base('OrderDetail').create(detail).catch(done)
          }

          // If existing and SKU and Bunches specified then update
          else if (!this.orderDetails[i].isNew && this.orderDetails[i].SKU.length > 0 && this.orderDetails[i].Bunches > 0){
            base('OrderDetail').update(this.orderDetails[i].RecID, detail).catch(done)
          } 

          // If existing and SKU is blank then delete
          else if (!this.orderDetails[i].isNew && this.orderDetails[i].SKU.length == 0){
            base('OrderDetail').destroy(this.orderDetails[i].RecID).catch(done)
          }

          // If existing and Bunches = 0 then delete
          else if (!this.orderDetails[i].isNew && this.orderDetails[i].Bunches == 0){
            base('OrderDetail').destroy(this.orderDetails[i].RecID).catch(done)
          } 

          else {
            console.log("No action taken?")
          }

        // }
      }

    },
    //
    // Get order from AirTable
    //
    getOrder(){

      //
      // Get Order Detail from AirTable
      //
      const getOrderDetail = (record) => {

        // Order Header
        this.order = record.fields

        // Get Order Detail
        var selectRecord = {
          pageSize: 25,
          view: "fp-grid",
          // filterByFormula: 'Account = "' + account + '"',
          filterByFormula: 'OrderRecID = "' + record.id + '"'

        }

        base('OrderDetail')
        .select(selectRecord)
        .eachPage(page, orderDetailDone);

        // Populate model
        this.orderDetails = orderDetails



      }


      //
      // Page
      //
      const page = (records, fetchNextPage) => {
          // This function (`page`) will get called for each page of records.

          records.forEach(function(record) {
            var orderDetail = record.fields
            orderDetails.push(orderDetail)
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();

      }

      //
      // Done
      //
      const done = (err) => {
          if (err) { console.error(err); return; }
      }

      // Done
      //
      const orderDetailDone = (err) => {
          if (err) { 
            console.error(err); 
            return; 

          } else {
            // Add blank line even if list is empty
            this.addBlankLine(true)
          }
      }


      var orderDetails = []
      // var account = this.$auth.user.email

      var Airtable = require('airtable');
      var atConf = {
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      }
      Airtable.configure(atConf);
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC

      base('Order')
      .find(this.RecID)
      .then(getOrderDetail)
      .catch(done)

    },
    //
    // Get forecast records from AirTable
    //
    getForecastRecords() {

      //
      // Page
      //
      const page = (records, fetchNextPage) => {
          
          // This function (`page`) will get called for each page of records.
          records.forEach(function(record) {
              var rec = record.fields
              recs.push(rec)
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();

      }

      //
      // Done
      //
      const done= (err) => {
        if (err) { console.error(err); return; }
      }

      var recs = []
      var Airtable = require('airtable');
      var atConf = {
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      }

      Airtable.configure(atConf);
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC
      var selConf = {
          // maxRecords: 999,
          pageSize: 100,
          view: "MRFC Grid Public"
      }

      base('Forecast (MRFC)')
      .select(selConf)
      .eachPage(page,done);

      // Populate model
      this.forecastRecords = recs

    },

    //
    // Add one empty line for user to add new items
    //
    addBlankLine(addIfEmpty){

      let blankLine = {
        isNew: true,
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

      //
      // This is used on initial load of db but not 
      // during the order edit phase
      if (this.orderDetails.length == 0 && addIfEmpty){
          this.orderDetails.push(blankLine)
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
    
  },
  updated(){   
    this.populateForecastMap()
    this.addBlankLine(false)
  },

  computed: {
    dollarSigns(){
      switch (this.priceRange) {
        case 1:
          return '$';
        case 2:
          return '$';
        case 3:
          return '$$';
        case 4:
          return '$$';
        case 5:
          return '$$$';
        case 6:
          return '$$$';
        default:
          return 'NA';
      }
    }
  }


}
</script>

<style scoped>

/* possible button styling instead of bootstrap's primary */
.btn-primary-custom {
  background-color: #F4C9C9;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
}

#priceFilter{
  display: flex;
  flex-flow: column nowrap;
  color: grey;
  margin-left: 1em;
  margin-right: 1em;

}

span.badge{
  background-color: #F4C9C9;
}

.lineItem{
  border: solid 2px lightgray;
  border-radius: .25em;
  margin: 0.5em 0;
  padding: 0.5em 0.5em;
}

i.color-dot{
  border-radius: 50%;
}

li{
  list-style-type: none;
}

ul{
  padding-left: 0;
}

small.sku {
  width: 100px;
  display: inline-block;
  text-align: center;
}

.bunches{
  width: 125px;
  display: inline-block;
  text-align: center;
}

.extended{
  width: 125px;
  display: inline-block;
  text-align: center;
}

p{
  margin-bottom: 0;
}

.inactiveSwatch{
  opacity: 0.5;
}

</style>
