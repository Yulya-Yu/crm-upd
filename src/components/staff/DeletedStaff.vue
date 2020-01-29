<template>
  <div class="staff-list-containers">
    <div class="staff-nav">
      <div class="dropdown">
        <select class="dropbtn">
          <option selected disabled value>Сортировать по:</option>
          <option>Стажу</option>
          <option>Количеству сделок</option>
          <option>Фамилии</option>
          <option>Дате Рождения</option>
        </select>
      </div>
      <div class="search-field">
        <input type="text" />
        <input type="submit" class="search-btn" value="поиск" />
      </div>
      <div class="action-btns">
        <router-link to="/login">
          <button class="exit-btn" @click="logOut()">
            <img src="@/assets/exit.svg" />
          </button>
        </router-link>
      </div>
    </div>
    <div class="staff-cards-container">
      <div
        class="staff-card"
        v-for="delStaff in allDeletedStaff"
        :key="delStaff.id"
        :delStaff="delStaff"
      >
        <div class="header">
          <div class="employee">
            <h5>{{delStaff.surname}} {{delStaff.name}} {{delStaff.fathername}}</h5>
            <p>{{delStaff.role}}</p>
          </div>
          <div class="options-container">
            <button class="options-btn">
              <img src="@/assets/dots.svg" />
            </button>
            <div id="options-content">
              <button class="delete-btn" @click="showModal(delStaff.id)">
                <img src="@/assets/del.svg" class="options-icon" />Восстановить
              </button>
            </div>
            <div class="modal" v-show="selectedId == delStaff.id">
              <p>Вы уверены что хотите восстановить сторудника " {{delStaff.surname}} {{delStaff.name}} {{delStaff.fathername}} " ?</p>
              <div class="confirm-btns">
                <button
                  @click="(restoreStaff(delStaff.id)), (closeModal), (activateConfirm=true)"
                  class="delete-btn-modal"
                >Да</button>
                <button @click="closeModal" class="cancel-btn">Нет</button>
              </div>
              <div class="modal" v-if="activateConfirm" @close="activateConfirm=false">
                <p>Сотрудник " {{delStaff.surname}} {{delStaff.name}} {{delStaff.fathername}} " успешно восстановлен</p>
                <button class="confirm-btns cancel-btn" @click="activateConfirm=false">ОК</button>
              </div>
            </div>
          </div>
        </div>
        <div class="stats">
          <p class="deals">сделки: {{delStaff.deals}}</p>
          <p class="exp">стаж: 3 года 2 месяца</p>
        </div>

        <div class="contacts">
          <div class="contact-data">
            <h5>Контакты:</h5>
            <p>
              <img src="@/assets/tel.svg" class="phone-icon" />
              +7{{delStaff.telephone}}
            </p>
            <p>
              <img src="@/assets/email.svg" class="email-icon" />
              {{delStaff.email}}
            </p>
          </div>
          <div class="passport">
            <h5>Паспорт</h5>
            <p>Дата Рождения: {{delStaff.birth_date}}</p>
            <p>Серия и Номер паспорта: {{delStaff.passport_series}} {{delStaff.passport_number}}</p>
            <p>Дата выдачи: {{delStaff.date_of_issue_of_passport}}</p>
            <p>Кем выдан: {{delStaff.passport_issued_by}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-link class="go-to-staff" to="/StaffList">
      <button class="staff-add-btn">Сотрудники</button>
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
      //search: '',
      activateConfirm: false,
      selectedId: "",
      selectedIdConfirm: "",
      isModalVisible: false
    };
  },
  computed: {
    ...mapGetters(["allDeletedStaff"])
    //   filterStaff: function() {
    //       let filtered = this.allStaff;
    //         if (this.select) {
    //         filtered = this.allStaff.filter(
    //         staff => staff.sortStaff.toLowerCase() === this.select.toLowerCase()
    //     );
    //   }
    //   return filtered;
    // }
  },

  methods: {
    ...mapActions(["fetchDeletedStaff", "restoreStaff"]),
    showModal(id) {
      this.selectedId = id;
      this.selectedIdConfirm = id;
    },
    closeModal() {
      this.selectedId = "";
    },
    logOut() {
      sessionStorage.removeItem("login"),
        sessionStorage.removeItem("password"),
        this.$router.push({ name: "login" });
    }
  },

  created() {
    this.fetchDeletedStaff();
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
  width: 200px;
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
  width: 150px;
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
}
.staff-add-btn:hover {
  background-color: #18181e;
}
.staff-add-btn img {
  margin-right: 15px;
}
router-link {
  text-decoration: none;
}
.go-to-staff {
  text-decoration: none;
  color: #c4c4c4;
  position: absolute;
  bottom: 30px;
  height: 49px;
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
  border-right: 1px solid #dddddd;
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
@media screen and (max-width: 1062px) {
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
  .staff-add-btn {
    height: 40px;
    font-size: 12px;
    line-height: 20px;
    padding-left: 15px;
    padding-right: 15px;
    width: 120px;
  }

  .staff-add-btn img {
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
    min-width: 190px;
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