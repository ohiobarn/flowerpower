<template>
  <div>
    <br />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <OrderForm :order="order" :forecastRecords="forecastRecords"/>
  </div>
</template>

<script>
import OrderForm from '@/components/OrderForm.vue'

export default {
  props: ['id'],

  components: {
    OrderForm
  },

  data() {
    return {
      forecastRecords: [],
      // forecastMap: Map,
      order: { 
        id: 1, 
        OrderNo: 1,
        ClientJobName: 'Job 1',
        TeamMemberName: 'Frank',
        Notes: 'Order Notes',
        DueDate: '1/1/2020',
        items: [
          {
            SKU: 'AGE-BLUHZ',
            Crop: 'Ageratum',
            Variety: 'Blue Horizon',
            StemsPerBunch: 5,
            PricePerBunch: "3,50",
            Quantity: 1, 
            ItemNotes: 'Item notes 1'
          }
        ]
      }
    }
  },
  mounted(){
    //
    // Array to hold query records
    //
    var recs = []
    // let recMap = new Map();

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
            rec.id = record.getId()
            recs.push(rec)
            // recMap.set(record.getId(),rec)
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
    // this.forecastMap = recMap
  }
}



</script>

<style>

</style>