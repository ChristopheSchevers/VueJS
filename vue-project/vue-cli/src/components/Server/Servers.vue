<template>
  <div>
    <app-server-status v-for="server in 5" v-bind:key="server"></app-server-status>
  </div>
</template>

<script>
  import ServerDetails from './ServerDetails.vue'
  export default {
    components: {
      'app-server-status': ServerDetails
    }
  }
</script>
