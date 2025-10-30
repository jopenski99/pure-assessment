<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <GetAgents />
</template>

<script>
import GetAgents  from './components/GetAgents.vue'

export default {
  name: 'App',
  components: {
    GetAgents
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
