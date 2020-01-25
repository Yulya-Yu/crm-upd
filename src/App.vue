<template>
  <div id="app">
<Navbar />
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
     beforeMount() {
         if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login') === undefined || sessionStorage.getItem('login') === ''
         && sessionStorage.getItem('password') === null || sessionStorage.getItem('password') === undefined || sessionStorage.getItem('password') === ''){
             this.$router.push('/menu')
         }
     }
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
}

a {
  text-decoration: none !important;
}

button:focus {
  outline:0 !important;
  }

</style>
