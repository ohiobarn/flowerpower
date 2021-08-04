<template>
  <div class="home">

    <img alt="flowerpower" width="400" height="400" src="../assets/seedling-solid.svg" />
    <Splash msg="Welcome to Flower Power!" />

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Splash from '@/components/Splash.vue'

export default {
  name: "home",
  components: {
    Splash
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
