<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Order Number</th>
          <th scope="col">Client/Job</th>
          <th scope="col">Team Member</th>
          <th scope="col">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th scope="row">
              <router-link :to="{name: 'OrderEdit', params: {id: order.id}}">{{ order.OrderNo }}</router-link>
          </th>
          <td>{{ order.ClientJobName }}</td>
          <td>{{ order.TeamMemberName }}</td>
          <td>{{ order.Notes }}</td>
        </tr>
      </tbody>
    </table>

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