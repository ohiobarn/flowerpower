<template>
  <div>
    <OrderForm :order="order" />
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
  }
}
</script>

<style>

</style>