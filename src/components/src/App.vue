<template>
  <div id="app">
<Navbar v-if="!$route.meta.hideNavigation"/>
 <router-view/>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
      components:{
        Navbar
     },

}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
} 

#app {
    display: flex;
    flex-direction: row;
    background: #E1E1E1;
    min-height: 100vh;
}

a {
  text-decoration: none !important;
}

button:focus {
  outline:0 !important;
  }

</style>
