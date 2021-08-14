<template>

  <div class="cont">

    <!-- Nav Row -->
    <div class="row fp-nav">
      <div class="col">
        <!-- Flow left and right -->
        <router-link id="logo" class="inline" to="/"><img alt="flowerpower" width="40" height="40" src="./assets/logo-clear-bg.png" /></router-link>
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


        <!--  Nav Bar -->
        <ul class="nav nav-tabs ">

          <!--  Home -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active" >Home</router-link>
          </li>

          <!--  Availability List -->
          <li class="nav-item" v-if="$auth.isAuthenticated" >
            <router-link class="nav-link" to="/browse" active-class="active" >Availability List</router-link>
          </li>

          <!--  Order Manager -->
          <li class="nav-item" v-if="$auth.isAuthenticated" >
            <router-link class="nav-link" to="/order" active-class="active" >Orders</router-link>
          </li>

          <!--  Help -->
          <li class="nav-item" v-if="$auth.isAuthenticated">
            <router-link class="nav-link" to="/help" active-class="active" >Help</router-link>
          </li>

          
          <!-- User -->
          <!-- <li>
            <div class="nav-item dropdown"> 
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
          </li> -->
        </ul>
      </div>

    </div>

    <!--  Page Content-->
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <router-view />
      </div>
      <div class="col-1"></div>
    </div>

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

#logo {
    float:left; 
    background:#f6edf9;
    width:50px;
    height:40px;
    text-align: left;
}
#user-dropdown{
    float:right;
    background:#f6edf9;
    width:50%;
    height:40px;
    text-align: right;
}
</style>
