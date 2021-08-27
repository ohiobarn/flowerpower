<template>
  <div>
    <center>
      <img alt="flowerpower" width="370" height="370" src="../assets/splash.png" />
      <!-- <Splash msg="Welcome to Flower Power!" /> -->
    </center>
  </div>
</template>

<script>
// @ is an alias to /src
// import Splash from '@/components/Splash.vue'

export default {
  name: "home",
  components: {
    // Splash
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

#most-outter{
  padding: 20px;
}

</style>