<template>
  <div>
    <hr>
    <div class="container">
      <div class="row">
        <div class="col font-weight-bold">Order No.</div>
        <div class="col font-weight-bold">Client/Job</div>
        <div class="col font-weight-bold">Due Date</div>
      </div>
      <div class="row"  v-for="order in orders" :key="order.RecID">
        <div class="col">
          <router-link :to="{name: 'OrderEdit', params: {RecID: order.RecID}}">{{ order.OrderNo }}</router-link> 
        </div>
        <div class="col">{{ order["Client/Job"] }}</div>
        <div class="col">{{ order["Due Date"] }}</div>
      </div>
    </div>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    orders: Array
  }
}
</script>

<style>

</style>