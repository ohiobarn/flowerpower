<template>
  <div id="most-outter">
    <br />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <OrderForm :order="order" :orderDetails="orderDetails" :forecastRecords="forecastRecords"/>
  </div>
</template>

<script>
import OrderForm from '@/components/OrderForm.vue'

export default {
  props: ['RecID'],

  components: {
    OrderForm
  },

  data() {
    return {
      forecastRecords: [],
      order: {},
      orderDetails: []
    }
  },

  mounted(){
    this.getForecastRecords()
    this.getOrder()
  },
  methods: {
    getOrder(){

      var orderDetails = []
      var account = this.$auth.user.email

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
          filterByFormula: 'Account = "' + account + '"'
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
          // maxRecords: 999,
          pageSize: 25,
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

      //
      // Populate data
      //
      this.forecastRecords = recs
    }
  }

}



</script>

<style>

#most-outter{
  padding: 20px;
}

</style>