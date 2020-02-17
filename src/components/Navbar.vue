<template>
      <div id="app">
        <div id="nav">
          <div class="user_photo">
            <p class="user-name">Олег Сергеевич</p>
          </div>
          <router-link to="/requests"><img src="@/assets/zayavki.svg" class="nav-icons"/>Заявки</router-link>
          <router-link to="/orders"><img src="@/assets/zakaz.svg" />Заказы</router-link>
          <router-link to="/clientsmain"><img src="@/assets/klient.svg" />Клиенты</router-link>
          <router-link to="/stafflist"><img src="@/assets/sotrudniki.svg" />Сотрудники</router-link>
          <router-link to="/report"><img src="@/assets/otchet.svg" />Отчет</router-link>
            <router-link to="/menu"><img src="@/assets/menu.svg" />Меню</router-link>
        </div>
      </div>
    </template>

    <script>
 export default {
  name:'Navbar',
  data() {
   return {
    title:"Navbar"
   }
  }
 }
    </script>

    <style scoped>

  #nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 147px;
  height: 100vh;
  background-color: #353541;
  position: fixed;
}

#nav a {
  color: #C4C4C4;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
  padding-top: 10px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #C4C4C4;
  background: #18181E;
  padding-bottom: 10px;
}

.nav-icons {
  width: 46px;
  height: 46px;
  margin: 0 auto;
}
.user-name {
  font-size: 16px;
line-height: 20px;
color: #E1E1E1;
text-align: center;
} 
    </style>