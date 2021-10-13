<template>
  <div id="most-outter">
    <OrderForm  :RecID="RecID" />
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

    }
  },

  mounted(){

  },
  methods: {

  }

}



</script>

<style>

#most-outter{
  padding: 20px;
}

</style>