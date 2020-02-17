<template >
  <div class="clients-container">
    <div class="staff-nav">
      <div class="dropdown">
        <select class="dropbtn">
          <option selected value>Сортировать по:</option>
          <option>Частное лицо</option>
          <option>Организация</option>
          <option>По алфавиту</option>
          <option>Дата добавления</option>
        </select>
      </div>
      <div class="search-field">
        <input type="text" v-model="search" />
        <input type="submit" class="search-btn" value="поиск" />
      </div>
      <div class="action-btns">
        <router-link to="/clientadd" class="staff-add-btn">
            <img src="@/assets/plus.svg" />Добавить Клиента
         
        </router-link>
        <router-link to="/login">
          <button class="exit-btn" @click="logOut()">
            <img src="@/assets/exit.svg" />
          </button>
        </router-link>
      </div>
    </div>

<div class="main">
  <div class="component-nav">
  <button class="component-change-btn" v-on:click="component = 'Clients'">Клиенты</button>
  <button class="component-change-btn" v-on:click="component = 'Companies'">Компании</button>
  </div>
        <keep-alive>
            <component v-bind:is="component"></component>
        </keep-alive>
</div>

  </div>
</template>

<script>
import Clients from './Clients';
import Companies from './Companies';

export default {
    name: 'ClientsMain',
    components: {
    Clients,
    Companies
    },
    data() {
      
      return {
        component: 'Clients',
        search: ''
      }
    },

      methods: {
    //     toggle(){
    //   if (this.component == 'Clients') {
    //     this.component = 'Companies';
    //   } else {
    //     this.component = 'Clients';
    //   }
    // } 
      logOut() {
      sessionStorage.removeItem("login"),
        sessionStorage.removeItem("password"),
        this.$router.push({ name: "login" });
    }
  },


}
</script>

<style scoped>

.main {
  width: 100%;
  margin: 0;
  top:-100px;
}

.clients-container {
  margin: 30px;
  margin-left: 177px;
  width: 100%;
  display: flex;
  flex-direction: column;

}
.component-nav {
  width: 60%;
  margin: 30px auto;
}

.component-nav button {
  background: #F0F2F4;
  height: 49px;
  width: 160px;
  border: none;
  border-bottom: 3px solid #CDCDCD;
  outline: none;
  line-height: 20px;
  color: #353541;
}

.component-nav button:focus {
  border-bottom: 3px solid #353541;
}

.staff-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 49px;
  width: 100%; 
}
.dropbtn {
  background-color: #353541;
  font-size: 16px;
  height: 49px;
  color: #c4c4c4;
  padding: 9px;
  border: none;
  cursor: pointer;
  width: 170px;
  border: none;
}
.fa-caret-down {
  margin-left: 15px;
}
/* The container <div> - needed to position the dropdown content */
.dropdown,
.options-container {
  position: relative;
  display: inline-block;
}
/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #353541;
  min-width: 200px;
  z-index: 1;
}
#options-content {
  display: none;
  position: absolute;
  background-color: #353541;
  min-width: 150px;
  z-index: 1;
  margin-left: 26px;
  margin-top: -45px;
}
/* Links inside the dropdown */
.dropdown-content a {
  font-size: 16px;
  line-height: 20px;
  color: #c4c4c4;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
#options-content button {
  font-size: 16px;
  line-height: 20px;
  color: #c4c4c4;
  padding: 7px 10px;
  text-decoration: none;
  display: block;
  border: none;
  background: #353541;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}
#options-content button:hover {
  background-color: #18181E;
}
/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #18181E;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
.options-container:hover #options-content {
  display: block;
}
.options-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
.dropdown-btn {
  width: 120px;
  height: 49px;
  background: #353541;
  border: none;
}
input {
  margin-left: 30px;
  margin-right: 20px;
  height: 49px;
  background: #f0f2f4;
  border: none;
  width: 300px;
  padding-left: 30px;
  font-size: 16px;
  line-height: 20px;
  color: #353541;
}
.search-btn {
  background: #353541;
  border: none;
  font-size: 16px;
  line-height: 20px;
  color: #c4c4c4;
  margin-left: 10px;
  width: 90px;
  cursor: pointer;
  padding-left: 0;
  transition: 0.3s;
}
.search-btn:hover {
  background-color: #18181E;
}
.action-btns {
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.staff-add-btn {
  height: 49px;
  background: #353541;
  font-size: 16px;
  line-height: 20px;
  color: #c4c4c4;
  border: none;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  width: 180px;
  transition: 0.3s;
}
.staff-add-btn:hover {
  background-color: #18181E;
}

.staff-add-btn img,
.staff-delete-btn img {
  margin-right: 15px;
}
router-link {
  text-decoration: none;
  color: #c4c4c4;
}

.exit-btn {
  background: #353541;
  width: 90px;
  height: 49px;
  border: none;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.3s;
}
.exit-btn:hover {
  background-color: #18181E;
}

@media screen and (max-width: 1200px) {
  .staff-nav {
    height: 40px;
  }
  .dropbtn {
    font-size: 12px;
    height: 40px;
    padding: 10px;
    width: 113px;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    min-width: 113px;
  }
  #options-content {
    display: none;
    position: absolute;
    background-color: #353541;
    min-width: 100px;
    z-index: 1;
    margin-left: 26px;
    margin-top: -45px;
  }
  /* Links inside the dropdown */
  .dropdown-content a {
    font-size: 14px;
    line-height: 20px;
    color: #c4c4c4;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-btn {
    width: 150px;
    height: 40px;
  }

  .search-btn {
    font-size: 14px;
    width: 90px;
    height: 40px;
  }

  .action-btns {
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .staff-add-btn,
  .staff-delete-btn {
    height: 40px;
    font-size: 12px;
    line-height: 20px;
    padding-left: 15px;
    padding-right: 15px;
    width: 120px;
  }

  .staff-add-btn img,
  .staff-delete-btn img {
    margin-right: 8px;
    width: 10px;
    height: auto;
  }

  .exit-btn {
    background: #353541;
    width: 93+0px;
    height: 40px;
    border: none;
    margin-left: 15px;
    cursor: pointer;
  }
  input {
    height: 40px;
    margin-right: 20px;
  }
}
@media screen and (max-width: 1050px) {
  .staff-nav {
    height: 37px;
  }
  .dropbtn {
    font-size: 12px;
    height: 37px;
    padding: 10px;
    width: 113px;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    min-width: 113px;
  }
  #options-content {
    display: none;
    position: absolute;
    background-color: #353541;
    min-width: 100px;
    z-index: 1;
    margin-left: 26px;
    margin-top: -45px;
  }
  /* Links inside the dropdown */
  .dropdown-content a {
    font-size: 12px;
    line-height: 20px;
    color: #c4c4c4;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-btn {
    width: 150px;
    height: 37px;
  }

  .search-btn {
    font-size: 12px;
    width: 60px;
    height: 37px;
  }

  .action-btns {
    margin-right: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .staff-add-btn,
  .staff-delete-btn {
    height: 37px;
    font-size: 12px;
    line-height: 20px;
    padding-left: 15px;
    padding-right: 15px;
    width: 120px;
  }

  .staff-add-btn img,
  .staff-delete-btn img {
    margin-right: 8px;
    width: 8px;
    height: auto;
  }

  .exit-btn {
    background: #353541;
    width: 53+0px;
    height: 37px;
    border: none;
    margin-left: 10px;
    cursor: pointer;
  }
  .exit-btn img {
    width: 25px;
    height: 30px;
  }
  input {
    height: 37px;
    width: 200px;
    margin-right: 20px;
  }
}
@media screen and (max-width: 1000px) {
/* .component-change-btn {

} */
.component-nav button {
  height: 40px;
  width: 120px;
  font-size: 12px;
}
}

@media screen and (max-width: 895px) {
  .exit-btn {
    width: 50px;
    height: 37px;
  }
  .exit-btn img {
    width: 20px;
    height: 25px;
  }
  input {
    height: 37px;
    width: 180px;
    margin-right: 20px;
  }
}
</style>