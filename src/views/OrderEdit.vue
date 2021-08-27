<template>
  <div id="most-outter">
    <br />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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