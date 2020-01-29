<template>
  <div class="staff-list-containers">
    <div class="staff-nav">
      <div class="dropdown">
        <select v-on:click="fetchStaff(`${whoSorted}`)" v-on:change="whichSort" class="dropbtn">
          <option selected disabled value>Сортировать по:</option>
          <option>Количеству сделок</option>
          <option>Фамилии</option>
          <option>Дате Рождения</option>
        </select>
      </div>
      <div class="search-field">
        <input type="text" v-model="search" />
        <input type="submit" class="search-btn" value="поиск" />
      </div>
      <div class="action-btns">
        <router-link to="/staffregister">
          <button class="staff-add-btn" @click="$router.push('staffregister')">
            <img src="@/assets/plus.svg" />Добавить Сотрудника
          </button>
        </router-link>
        <router-link to="/login">
          <button class="exit-btn" @click="logOut()">
            <img src="@/assets/exit.svg" />
          </button>
        </router-link>
      </div>
    </div>
    <div class="staff-cards-container">
      <div class="staff-card" v-for="staff in filteredStaff" :key="staff.id" :staff="staff">
        <div class="header">
          <div class="employee">
            <h5>{{staff.surname}} {{staff.name}} {{staff.fathername}}</h5>
            <p>{{staff.role}}</p>
          </div>
          <div class="options-container">
            <button class="options-btn">
              <img src="@/assets/dots.svg" />
            </button>
            <div id="options-content">
              <router-link v-bind:to="{name:'staffedit', params: {staff_id: staff.id}}">
                <button @click="goToEdit(staff.id)">
                  <img src="@/assets/edit.svg" class="options-icon" /> Редактировать
                </button>
              </router-link>
              <button class="delete-btn" @click="showModal(staff.id)">
                <img src="@/assets/del.svg" class="options-icon" />Уволить
              </button>
            </div>
            <transition name="slide-fade">
              <div class="modal" v-show="selectedId == staff.id">
                <p>Вы уверены что хотите уволить сторудника " {{staff.surname}} {{staff.name}} {{staff.fathername}} " ?</p>
                <div class="confirm-btns">
                  <button
                    @click="(deleteStaff(staff.id)), (closeModal), (activateConfirm=true)"
                    class="delete-btn-modal"
                  >Да</button>
                  <button @click="closeModal" class="cancel-btn">Нет</button>
                </div>
                <div class="modal" v-if="activateConfirm" @close="activateConfirm=false">
                  <p>Сотрудник " {{staff.surname}} {{staff.name}} {{staff.fathername}} " успешно удален</p>
                  <button class="confirm-btns cancel-btn" @click="activateConfirm=false">ОК</button>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="stats">
          <p class="deals">Cделки: {{staff.deals}}</p>
        </div>
        <div class="contacts">
          <div class="contact-data">
            <h5>Контакты:</h5>
            <p>
              <img src="@/assets/tel.svg" class="phone-icon" />
              +7{{staff.telephone}}
            </p>
            <p>
              <img src="@/assets/email.svg" class="email-icon" />
              {{staff.email}}
            </p>
          </div>
          <div class="passport">
            <h5>Паспорт</h5>
            <p>Дата Рождения: {{staff.birth_date}}</p>
            <p>Серия и Номер паспорта: {{staff.passport_series}} {{staff.passport_number}}</p>
            <p>Дата выдачи: {{staff.date_of_issue_of_passport}}</p>
            <p>Кем выдан: {{staff.passport_issued_by}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-link class="go-to-deleted" to="/deletedstaff">
      <button class="staff-delete-btn">Удаленные Сотрудники</button>
    </router-link>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "stafflist",
  components: {},
  data() {
    return {
      whoSorted: 'staff',
      activateConfirm: false,
      selectedId: "",
      selectedIdConfirm: "",
      isModalVisible: false,
      search: ""
    };
  },
  computed: {
    ...mapGetters(["allStaff"]),
      filteredStaff() {
          const value= this.search.charAt(0).toUpperCase() + this.search.slice(1);
          return this.allStaff.filter(function(allStaff){
              return allStaff.name.indexOf(value) > -1 ||
                  allStaff.surname.indexOf(value) > -1 ||
                  allStaff.fathername.indexOf(value) > -1
          })
      }
  },

  methods: {
      ...mapActions(["fetchStaff", "deleteStaff"]),
      whichSort(id){
        if(id.target.value === 'Фамилии'){
            this.whoSorted = 'sort-by?sort=surname'
        }
          else if(id.target.value === 'Количеству сделок'){
              this.whoSorted = 'sort-by?sort=deals'
          }
          else if(id.target.value === 'Дате Рождения'){
              this.whoSorted = 'sort-by?sort=birth_date'
          }
          else {
            this.whoSorted = 'staff'
        }
          // eslint-disable-next-line no-console
            console.log(id)
      },

    showModal(id) {
      this.selectedId = id;
      this.selectedIdConfirm = id;
    },
    closeModal() {
      this.selectedId = "";
    },
    goToEdit() {
      // eslint-disable-next-line no-unused-vars
      this.$router.push({ name: "staffedit" }).catch(err => {});
    },
    logOut() {
      sessionStorage.removeItem("login"),
        sessionStorage.removeItem("password"),
        this.$router.push({ name: "login" });
    }
  },

  created() {
    this.fetchStaff();
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.staff-list-containers {
  margin: 30px;
  margin-left: 177px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
}
#options-content button:hover {
  background-color: #18181e;
}
/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #18181e;
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
}
.search-btn:hover {
  background-color: #18181e;
}
.action-btns {
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.staff-add-btn,
.staff-delete-btn {
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
  width: 220px;
}
.staff-add-btn:hover,
.staff-delete-btn:hover {
  background-color: #18181e;
}
.staff-add-btn img,
.staff-delete-btn img {
  margin-right: 15px;
}
router-link {
  text-decoration: none;
}
.go-to-deleted router-link {
  text-decoration: none;
  color: #c4c4c4;
  height: 49px;
  position: absolute;
  bottom: 30px;
}
.exit-btn {
  background: #353541;
  width: 93px;
  height: 49px;
  border: none;
  margin-left: 30px;
  cursor: pointer;
}
.exit-btn:hover {
  background-color: #18181e;
}
.staff-cards-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  width: 100%;
}
.options-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
#options-content button:hover {
  background-color: #18181e;
}
.modal {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 300px;
  position: absolute;
  height: 124px;
  z-index: 10;
  background: #353541;
  margin-left: -300px;
  top: 100px;
}
.modal p {
  width: 80%;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #c4c4c4;
  margin-bottom: 20px;
}
.confirm-btns button {
  border: none;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #353541;
}
.delete-btn-modal {
  width: 39px;
  height: 24px;
  background: #ff7373;
  margin-right: 20px;
}
.cancel-btn {
  width: 46px;
  height: 24px;
  background: #c4c4c4;
}
.staff-card {
  background: #f0f2f4;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.4);
  width: 350px;
  height: auto;
  margin: 30px 30px 30px 0;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.employee {
  margin: 25px 5px 30px 20px;
}
.employee h5 {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #353541;
  width: 180px;
}
.employee p {
  font-size: 14px;
  line-height: 18px;
  color: #848484;
  width: 180px;
}
.options-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 21px;
  height: 21px;
  margin-top: 20px;
  margin-right: 5px;
}
.stats {
  width: 100%;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.stats p {
  font-size: 14px;
  line-height: 18px;
  color: #848484;
}
.deals {
  padding: 10px 51px;
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
}
.contacts h5,
.passport h5 {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #848484;
}
.contact-data {
  margin-bottom: 20px;
}
.contact-data p {
  font-size: 14px;
  line-height: 18px;
  color: #353541;
}
.phone-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  margin-top: 5px;
}
.email-icon {
  width: 23px;
  height: 18px;
  margin-right: 10px;
  margin-top: 5px;
}
.passport {
  margin-bottom: 20px;
}
.passport p {
  font-size: 14px;
  line-height: 18px;
  color: #353541;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@media screen and (max-width: 1074px) {
  .staff-nav {
    height: 40px;
  }
  .dropbtn {
    font-size: 14px;
    height: 40px;
    padding: 10px;
    width: 100px;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    min-width: 100px;
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
  }
}

@media screen and (max-width: 1300px) {
  .staff-nav {
    justify-content: flex-start;
    height: 49px;
    width: 100%;
  }
  .dropbtn {
    width: 190px;
  }
  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    width: 190px;
  }
  /* Links inside the dropdown */
  .dropdown-btn {
    width: 130px;
  }
  input {
    margin-left: 30px;
    width: 180px;
    padding-left: 30px;
  }
  .search-btn {
    margin-left: 10px;
    width: 70px;
  }
  .staff-add-btn {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 30px;
  }

  .staff-delete-btn {
    padding-left: 20px;
    padding-right: 20px;
  }

  .exit-btn {
    width: 50px;
    margin-left: 30px;
  }
}
@media screen and (min-width: 1515px) {
  .staff-nav {
    justify-content: space-between;
    height: 49px;
    width: 100%;
  }

  .dropbtn {
    width: 250px;
  }
  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    min-width: 190px;
  }
  /* Links inside the dropdown */
  .dropdown-btn {
    width: 314px;
  }
  input {
    margin-left: 30px;
    width: 500px;
    padding-left: 30px;
    height: 49px;
  }
  .search-btn {
    margin-left: 10px;
    width: 105px;
  }
  .staff-add-btn {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 30px;
    width: 220px;
  }

  .staff-delete-btn {
    padding-left: 20px;
    padding-right: 20px;
    width: 220px;
  }

  .exit-btn {
    width: 93px;
    margin-left: 30px;
  }
}
@media screen and (min-width: 1800px) {
  input {
    max-width: 600px;
  }
}
</style>