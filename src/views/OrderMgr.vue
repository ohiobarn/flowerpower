<template>
  <div id="most-outter">
    <br>
    <h3>Order Manager</h3>
    <br>
    <router-link class="btn btn-primary" tag="button" :to="{name: 'OrderEdit', params: {id: 'new'}}">New Order</router-link>
    <br>&nbsp;
    <OrderList :orders="orders" />
  </div>
</template>

<script>
import OrderList from '@/components/OrderList.vue'

export default {
  components: {
    OrderList
  },

  data() {
    return {
      orders: []
    }

  },
  mounted() {
    this.getOrders()
  },

  methods: {
    getOrders() {
      //
      // Array to hold query records
      //
      var orders = []
      var account = this.$auth.user.email

      var Airtable = require('airtable');
      Airtable.configure({
          endpointUrl: 'https://api.airtable.com',
          apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
      });
      var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC

      base('Order').select({
          // maxRecords: 999,
          pageSize: 25,
          view: "fp-grid",
          filterByFormula: 'Account = "' + account + '"'
      }).eachPage(function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function(record) {
              var order = record.fields
              order.id = record.getId()
              orders.push(order)
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
      this.orders = orders

    }
  }
}
</script>

<style>

#most-outter{
  padding: 10px;
}

</style>