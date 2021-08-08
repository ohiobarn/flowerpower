<template>
  <div>
    <div>
      <img :src="$auth.user.picture">
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>

    
    <div>
      <hr>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
      <hr>  
    </div>
  </div>
</template>