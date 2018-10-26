<!--
    *** Step 1: Clean up the Vue.app file ***
 -->
<template>
  <v-app>
    <v-container>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<!--
  *** Step 7: Begin styling ***
  (create styles.scss in src/assets) 
-->

<style lang="scss">
@import "./assets/styles";

body {
  background: url("./assets/images/background.jpg") no-repeat center center
    fixed;
  background-size: contain;
  &:after {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $background-tint;
    opacity: 0.3;
    z-index: -1;
  }
  .application {
    background: none;
  }
}
</style>


<!-- <style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
-->
