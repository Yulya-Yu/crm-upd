<template>
<div class="staff-list-containers">

    <div class="staff-nav">
       <div class="dropdown">
          <button class="dropbtn">Сортировать по <i class="fas fa-caret-down"></i></button>
          <div class="dropdown-content">
          <a href="#">Стаж</a>
          <a href="#">Количеству сделок</a>
          <a href="#">Фамилии</a>
          <a href="#">Дате рождения</a>
       </div>
    </div>
          <input type="text" v-model="search">
          <input type="submit" class="search-btn" value="Поиск">
          <div class="action-btns">
              <router-link to="/staffregister"><button class="staff-add-btn"  @click="goToRegister()"><img src="@/assets/plus.svg">Добавить Сотрудника</button></router-link>
              <button class="exit-btn"><img src="@/assets/exit.svg"></button>
          </div>
    </div>
    <div class="staff-cards-container" >
        <div class="staff-card" v-for="staff in allStaff" :key="staff.id">
            <div class="header" >
                <div class="employee" >
                    <h5>{{staff.name}}</h5>
                    <p>{{staff.company.name}}</p>
                </div>
                <div class="options-container">
                   <button class="options-btn"><img src="@/assets/dots.svg" /></button>
                   <div id="options-content">
                     <router-link to="/staffedit"><button @click="goToEdit()"><img src="@/assets/edit.svg" class="options-icon"> Редактировать</button></router-link>
                      <button class="delete-btn" @click="showModal = true"><img src="@/assets/del.svg" class="options-icon">Уволить</button>   
                   </div>
                </div>
            </div>
            <div class="stats">
                <p class="deals">сделки: 112</p>
                <p class="exp">стаж: 3 года 2 месяца</p>
            </div>
            <div class="contacts">
                    <div class="modal-wrapper">
                         <div class="modal" v-if="showModal" @close="showModal = false">
                             <p>Вы уверены что хотите уволить сторудника " {{staff.name}} " ?</p>
                             <div class="confirm-btns">
                             <button @click="(deleteStaff(staff.id)), (activateConfirm = true), (showModal=false)" class="delete-btn-modal">Да</button>
                             <button @click="showModal = false" class="cancel-btn">Нет</button>
                             </div>
                         </div>
                         <div class="modal" v-if="activateConfirm" @close="activateConfirm=false">
                             <p>Сотрудник " {{staff.name}} " успешно удален</p>
                             <button class="confirm-btns cancel-btn" @click="activateConfirm=false">ОК</button>
                         </div>
                    </div>
                <div class="contact-data">
                    <h5>Контакты:</h5>
                    <p><img src="@/assets/tel.svg" class="phone-icon"/>{{staff.phone}}</p>
                    <p><img src="@/assets/email.svg" class="email-icon"/>{{staff.email}}</p>
                </div>
                <div class="passport">
                    <h5>Паспорт</h5>
                    <p>Дата Рождения:</p>
                    <p>Серия и Номер паспорта:</p>
                    <p>Дата выдачи:</p>
                    <p>Кем выдан:</p>
                </div>

            </div>
        </div>
    </div>
    <router-link to="/deletedstaff"><button class="staff-add-btn"  @click="goToDeleted()">Удаленные Сотрудники</button></router-link>
<router-view />
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
//import modal from '@/components/staff/Modal';
export default {
//data() {
//    return {
//        search: ''
//    }
// },
  name: 'stafflist', 
        components:{
    },
      data() {
          return {
    showModal: false,
    activateConfirm: false
          }
  },
  computed: mapGetters(['allStaff']),
// filteredStaff: function() {
//    return this.stafflist.filter((staff) => {
//        return staff.name.match(this.search);
//    });
//  },
  methods: { 
   ...mapActions(['fetchStaff', 'deleteStaff']),
  },
  created() {
      this.fetchStaff();
  },
    goToRegister() {
    this.$router.push({name:'staffregister'});
},
    goToEdit() {
    this.$router.push({name:'staffedit'});
},
    goToDeleted() {
    this.$router.push({name:'deletedstaff'});
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
  background-color: #353541;;
  font-size: 16px;
  line-height: 20px;
  color: #C4C4C4;
  padding: 16px;
  border: none;
  cursor: pointer;
  width: 200px;
  border: none;
}
.fa-caret-down {
    margin-left: 15px;
}
/* The container <div> - needed to position the dropdown content */
.dropdown, .options-container {
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
  color: #C4C4C4;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
#options-content button {
  font-size: 16px;
  line-height: 20px;
  color: #C4C4C4;
  padding: 7px 10px;
  text-decoration: none;
  display: block; 
  border: none;
  background: #353541;
  display: flex;
  align-items: center;
  cursor: pointer;
}
/* Change color of dropdown links on hover */
.dropdown-content a:hover {
    background-color: #18181E
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
    background: #F0F2F4;
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
    color: #C4C4C4;
    margin-left: 10px;
    width: 90px;
    cursor: pointer;
    padding-left: 0;
}
.search-btn:hover {
    background-color: #18181E
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
    color: #C4C4C4;
    border: none;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.staff-add-btn:hover {
    background-color: #18181E
}
.staff-add-btn img {
    margin-right: 15px;
}
router-link {
    text-decoration: none;
}
.staff-add-btn router-link {
    text-decoration: none;
    color: #C4C4C4;
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
    background-color: #18181E
}
.staff-cards-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.staff-card {
background: #F0F2F4;
box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.4);
width: 350px;
height: auto;
margin: 30px 30px 30px 0;
display: flex;
flex-direction: column;
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
    margin-right: 10px;
}
.modal p {
width: 80%;
font-size: 16px;
line-height: 20px;
text-align: center;
color: #C4C4C4;
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
background: #FF7373;
margin-right: 20px;
}
.cancel-btn {
width: 46px;
height: 24px;
background: #C4C4C4;
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
    border: 1px solid #DDDDDD;
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
    border-right: 1px solid #DDDDDD;
    padding: 10px 51px;
}
.contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
}
.contacts h5, .passport h5 {
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
color: #353541
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
    margin-left: 30px;
}
.exit-btn {
    width: 50px;
    margin-left: 30px;
}
}
@media screen and (min-width: 1500px) {
.staff-nav {
    justify-content: space-between;
    height: 49px;
    width: 100%;
}
.dropbtn {
  width: 314px;
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
    width: 670px;
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
    width: 248px;
}
.exit-btn {
    width: 93px;
    margin-left: 30px;
}
}
</style>