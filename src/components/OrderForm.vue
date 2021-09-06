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

            
      <div class="form-row">
        <div class="col">
            <p><small class="form-text text-muted">All varieties sold at 10 stems per bunch (spb) unless stated otherwise</small></p>  
        </div>
        <div class="col-2">
          <p></p>
        </div>
      </div>

        
      <hr>
      <!-- prototype order detial layout -->
      <ul class="pl-0">
        <li class="orderDetailList" v-for="(detail, index ) in orderDetails" :key="index">
          <div class="lineItem">
            
            <div class="top-row d-flex flex-row justify-content-between align-items-start">
                                                                                    <!-- :style="{color:detail.Color}" -->
              <span class="lead">{{detail.Crop}}</span> <i class="color-dot fas fa-leaf" style="color:#F4C9C9"></i>
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

      <div id="search-filter">
        <!-- Color Dots/Swatches -->
        <ul class="d-flex flex-row justify-content-around">
          <li v-for="swatch in colorOptions" :key="swatch" >
            <input type="checkbox" :id="swatch" :value="swatch" class="mr-1" v-model="checkedColors">
            <label for="swatch">
              <i class="color-dot fas fa-seedling" :style="{color:swatch}"></i>
            </label>
          </li>
        </ul>

        <!-- checkbox for select by category -->
        <div class="d-flex flex-row justify-content-between">
          <div>
            <input type="checkbox" id="flower" value="Flower" class="mr-1" v-model="checkedCategories">
            <label for="flower" >Flower</label>
          </div>
          <div>
            <input type="checkbox" id="filler" value="Filler" class="mr-1" v-model="checkedCategories">
            <label for="flower" class="form-check-label">Filler</label>
          </div>
          <div >
            <input type="checkbox"  id="foliage" value="Foliage" class="mr-1" v-model="checkedCategories">
            <label for="flower" >Foliage</label>
          </div>          
        </div>

        <form class="search d-flex flex-row align-items-center " @submit.prevent="addSearchTerm" >
          
          <input id="searchBar" type="text" class="form-control" v-model="searchTerm" placeholder="Search by Crop or Variety">

          <div id="priceFilter" class="d-flex flex-column align-items-center">
            <select name="price-range" id="price-range" v-model="priceRange">
              <option value="null" > </option>
              <option value="2">$</option>
              <option value="4" selected>$$</option>
              <option value="6">$$$</option>
            </select>
          </div>

        </form>
          <div>
            <button @click.prevent="resetSearch">Reset</button>
          </div>

        <!-- Search Results -->
        <div>
          <ul>
            <li v-for="(rec, i) in filteredForecast" :key="i" class="my-1 d-flex flex-row no-wrap justify-content-between align-items-center">
              <div>
                <p v-if='rec["Stems per Bunch"] != 10'>{{rec.Color}} || {{rec.Tier}}{{ rec.Crop }}, {{ rec.Variety }}  ({{ rec["SKU #"] }}), ${{rec["Price per Bunch"] }}/bu @ {{ rec["Stems per Bunch"] }} spb</p>
                <p v-else>{{rec.Color}} || {{rec.Tier}} {{ rec.Crop }}, {{ rec.Variety }},  ({{ rec["SKU #"] }}), ${{rec["Price per Bunch"] }}/bu</p>
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
     colorOptions: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
     priceRange: null,
     searchCriteria: [],
     checkedCategories: [],
     checkedColors: []
    }
    
  },

  methods: {
    resetSearch(){
      this.searchCriteria = []
      this.checkedColors = []
      this.checkedColors = []
    },
    
    addSearchTerm(){
      this.searchCriteria.push(this.searchTerm)

      this.searchTerm = ''
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
    // Populate forecastMap from array
    //
    populateForecastMap(){
      if (this.forecastMap.size == 0) {
        for (let i = 0; i < this.forecastRecords.length; i++) {
          this.forecastMap.set(this.forecastRecords[i].SKU,this.forecastRecords[i])
        }
      }
    },

  },
  mounted(){
    this.getForecastRecords()
    this.getOrder()
  },
  updated(){   
    this.populateForecastMap()
  },

  computed: {
    filteredForecast(){

      let filteredList = this.forecastRecords

      // For each record in forcast, if record does not contain the selected color remove it from the list
      // Right now this does not work for Mixes, but if Color was an Array it would
      if (this.checkedColors.length > 0) {

        filteredList = filteredList.filter(rec => {
          
          return this.checkedColors.includes(rec.Color.toLowerCase())
        })
      }

      if (this.searchCriteria.length > 0) {
        
        this.searchCriteria.forEach(term => {

          filteredList = filteredList.filter(rec => {
  
            let cropVarietySKU = rec.Crop + ' ' + rec.Variety + ' ' + rec.SKU
            
            return cropVarietySKU.toLowerCase().includes(term.toLowerCase())
          })
        })
      }

      if (this.priceRange) {
        console.log('filter by price');
        filteredList = filteredList.filter(rec => {
          
          return parseInt(rec.Tier) <= this.priceRange
        })
      }

      // Filter out any record in the search result that does not belong to one of the selected categories
      if (this.checkedCategories.length > 0) {
        
        filteredList = filteredList.filter(rec => {

          return this.checkedCategories.includes(rec.Category)
        })
      }

      // if search criteria have been provided, return result of search. else return the unfiltered forecast
      if (this.checkedCategories.length > 0 || this.checkedColors.length > 0 || this.searchCriteria.length > 0 || this.priceRange) {
        
        return filteredList
      }
      else {

        return this.forecastRecords
      }

    },
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

</style>