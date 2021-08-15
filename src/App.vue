<template>

  <div class="cont">
        
    <nav class="navbar navbar-expand-md navbar-light  fp-nav">
      <router-link id="logo" class="inline" to="/"><img alt="flowerpower" width="40" height="40" src="./assets/logo-clear-bg.png" /></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link" to="/" exact-active-class="active" >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/browse" active-class="active" >Availability List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/order" active-class="active" >Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/help" active-class="active" >Help</router-link>
          </li>
        </ul>
        <span class="navbar-text">
            <div id="user-dropdown" class="inline dropdown user-dropdown"> 
              <button v-if="$auth.loading" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Log in
              </button>
              <button v-if="!$auth.loading" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ $auth.user.name }}
              </button>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" v-if="$auth.isAuthenticated"  @click="logout">Log out</a>
                <a class="dropdown-item" href="#" v-if="!$auth.isAuthenticated" @click="login">Log in</a>
              </div>
            </div>
        </span>
      </div>
    </nav>



    <!--  Page Content-->
    <router-view />
  </div>

</template>

<script>

export default {
  name: "app",
  components: {},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style>

.fp-nav {
background-color: #f6edf9;
}

.user-dropdown  { text-align: right; }


</style>
