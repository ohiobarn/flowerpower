<template>
    <div class="container">
      <div class="row">
        <div class="col-sm"><hr></div>
      </div>

      <div class="row">
        <div class="col-sm">
          <img :src="$auth.user.picture" class="rounded-circle">
          <h3>{{ $auth.user.name }}</h3>
          <p>{{ $auth.user.nickname }}</p>
          <p>{{ $auth.user.email }}</p>
          <hr>
        </div>
        <div class="col-sm">
          <h3>Client Portal</h3>
          <hr>
          <p>Your client portal is a secure location where you can view any documents that have been sent to you from MFRC.  
             Depending on your specific situation you may use the portal to complete questionnaires, pay invoices and view event details; 
             without having to dig through emails to find the documents you need!</p>
            <!-- DEVTODO - get this from the profile not hardcoded  -->
            <a href="https://649107.17hats.com/portal/#/zseROZIA7B" target="_blank">Open your client portal in a separate window</a>
          <hr>
        </div>
      </div>


    </div>
    <!-- <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre> -->
  
</template>