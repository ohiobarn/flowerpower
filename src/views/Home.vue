<template>
  <div>

    <img alt="flowerpower" width="400" height="400" src="../assets/seedling-solid.svg" />
    <Splash msg="Welcome to Flower Power!" />

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button class="button button1" v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button class="button button1" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
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

<style scoped>

.button {
  transition-duration: 0.4s;
}

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}

.button1:hover {
  background-color: #4CAF50;
  color: white;
}

</style>