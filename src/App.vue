<template>
  <div class="cont">
    <!-- 

      NAV

     -->
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto ">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
              </li>
            </ul>
            <!-- 

              User profile and login

             -->
            <div class="nav-item dropdown" v-if="!$auth.loading">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ $auth.user.name }}
              </button>
              <!-- <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ $auth.user.name }}
              </a> -->
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" v-if="$auth.isAuthenticated"  @click="logout">Log out</a>
                <a class="dropdown-item" href="#" v-if="!$auth.isAuthenticated" @click="login">Log in</a>
              </div>
            </div>

          </div>
        </nav>
      </div>
    </div>

    <!--  

      Page Content

    -->
    <div class="row">
      <div class="col-1"></div>
      <div class="col align-self-center">
        <router-view />
      </div>
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
</style>
