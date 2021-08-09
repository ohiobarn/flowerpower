<template>
  <div>
    <h3>Order Manager</h3>
    <br>
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
      orders: [
        { id: 1, OrderNo: 1, ClientJobName: 'Job 1', TeamMemberName: 'Frank', Notes: 'Order notes'},
        { id: 2, OrderNo: 2, ClientJobName: 'Job 2', TeamMemberName: 'Bill', Notes: 'Order notes'},
        { id: 3, OrderNo: 3, ClientJobName: 'Job 3', TeamMemberName: 'Bob', Notes: 'Order notes'}
      ]
    }

  },
  methods: {
    //todo
  }
}
</script>

<style>

</style>