<template>
<div class="clients-cards-all">
    <div class="legend">
        <p class="contacts-legend">Контакты</p>
        <p class="even">Дата Рождения</p>
        <p class="odd">Организация</p>
        <p class="coop-legend">Дни Сотрудничества</p>
    </div>
    <div class="client-card"  v-for="(client, index) in allClients" :key="client.id" :client="client">
        <div class="contacts">
            <h5>{{client.name}}</h5>
            <p><img src="@/assets/tel.svg" class="phone-icon" />
              +7{{client.telephone}}</p>
            <p><img src="@/assets/email.svg" class="email-icon" />
              {{client.email}}
            </p>
        </div>
        <div class="birthday">
            <p>{{client.birth_date}}</p>
        </div>
        <div class="status">
            <p>{{client.email}}</p>
        </div>
        <div class="coop-period">
            <p>{{client.id}}</p>
        </div>
        <div class="options-container">
            <button class="options-btn">
              <img src="@/assets/dots.svg" />
            </button>
            <div id="options-content">
              <router-link v-bind:to="{name:'clientcard', params: {card_id: client.id}}">
                <button>
                  <img src="@/assets/eye.svg" class="options-icon" /> Подробнее
                </button>
              </router-link>
              <router-link v-bind:to="{name:'clientedit', params: {client_id: client.id}}">
                <button>
                  <img src="@/assets/edit.svg" class="options-icon" /> Редактировать
                </button>
              </router-link>
              <button class="delete-btn" @click="showModal(index)">
                <img src="@/assets/del.svg" class="options-icon" /> Удалить
              </button>
            </div>
        </div>
        <transition name="slide-fade">
          <div class="modal" v-if="selectedId == index">
            <p>Вы уверены что хотите удалить клиента " {{client.name}} {{client.surname}} "?</p>
            <div class="confirm-btns">
              <button
                @click="(deleteClient(client.id)), (closeModal), (activateConfirm=true)"
                class="delete-btn-modal"
              >Да</button>
              <button @click="closeModal" class="cancel-btn">Нет</button>
            </div>
            <div class="modal" v-if="activateConfirm==true" @close="activateConfirm=false">
              <p>Клиент " {{client.name}} {{client.surname}} " успешно удален</p>
              <button class="confirm-btns cancel-btn" @click="closeOkModal">ОК</button>
            </div>
          </div>
        </transition>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'Clients',
    data(){
        return {
      activateConfirm: false,
      selectedId: "index",
      selectedIdConfirm: "",
      addCategoryModal: false,
        }
    },
    computed: {
  ...mapGetters(["allClients"]),
},
methods: {
    ...mapActions(["fetchClients", "deleteClient"]),

    showModal(index) {
      this.selectedId = index;
    },
    closeModal() {
      this.selectedId = "none";
      this.activateConfirm = false;
    },
    closeOkModal() {
      this.selectedId = "";
      this.activateConfirm = false;
    },
    closeCategoryModal() {
      this.addCategoryModal = !this.addCategoryModal;
    },
  },
  created() {
    this.fetchClients();
  }
}

</script>

<style scoped>
.legend {
    width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    line-height: 20px;
    color: #353541;
}

.contacts-legend {
    width: 80px;
    margin-left: 0;
    margin-right: auto;
}
.coop-ledgend {
    margin-right: 0;
    margin-left: auto;
    width: 80px;
}
.even, .odd {
    margin-left: 10px;
   margin-right: 92px;
}

.client-card {
    background-color: #F0F2F4;
    width: 980px;
    height: auto;
    margin: 0 auto 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 20px 50px;
}

.contacts h5 {
font-weight: bold;
font-size: 16px;
line-height: 20px;
color: #353541;
}

.options-btn {
border: none;
background: none;
height: 40px;
width: 60px;
}

.options-container {
  position: relative;
  display: inline-block;
}
/* Dropdown Content (Hidden by Default) */

#options-content {
  display: none;
  position: absolute;
  background-color: #353541;
  min-width: 150px;
  z-index: 1;
  margin-left: 46px;
  margin-top: -70px;
}
/* Links inside the dropdown */

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
  width: 100%;
}
#options-content button:hover {
  background-color: #18181E;
}

.options-container:hover #options-content {
  display: block;
}
.options-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.email-icon, .phone-icon {
    margin-right: 10px;
}


.modal {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  height: auto;
  z-index: 10;
  /* margin-left: 580px;
  margin-top: 240px; */
  background: #353541;
}
.modal p {
  width: 80%;
  font-size: 14px;
  line-height: 16px;
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
  transition: 0.3s;
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

@media screen and (max-width: 1410px) {
   .legend {
    width: 650px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    line-height: 20px;
    color: #353541;
}

.contacts-legend {
    width: 80px;
    margin-left: 0;
    margin-right: auto;
}
.coop-ledgend {
    margin-right: 0;
    margin-left: auto;
    width: 70px;
}
.even, .odd {
    margin-left: 10px;
   margin-right: 47px;
}

.client-card {
    background-color: #F0F2F4;
    width: 780px;
    height: auto;
    margin: 0 auto 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
} 
#options-content {
  display: none;
  position: absolute;
  background-color: #353541;
  min-width: 110px;
  z-index: 1;
  margin-left: 46px;
  margin-top: -70px;
}
/* Links inside the dropdown */

#options-content button {
  font-size: 14px;
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
  width: 100%;
}
}

@media screen and (max-width: 1200px) {
   .legend {
    width: 650px;
    font-size: 14px;
}

.contacts-legend {
    width: 80px;
    margin-left: 0;
    margin-right: auto;
}
.coop-ledgend {
    margin-right: 0;
    margin-left: auto;
    width: 70px;
}
.even, .odd {
    margin-left: 10px;
   margin-right: 77px;
}

.client-card {
    width: 780px;
    margin: 0 auto 20px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
    font-size: 14px;
} 
#options-content {
  min-width: 60px;
}
/* Links inside the dropdown */

#options-content button {
  font-size: 0;
  padding: 7px 7px;
  justify-content: center;
}

.modal {
  /* margin-left: 540px;
  margin-top: 225px; */
  margin-left: 44%;
  margin-top: 22%;
}
}

@media screen and (max-width: 1000px) {
   .legend {
    width: 550px;
    font-size: 12px;
}

.contacts-legend {
    width: 70px;
    margin-left: 0;
    margin-right: auto;
}
.coop-ledgend {
    margin-right: 0;
    margin-left: auto;
    width: 70px;
}
.even, .odd {
    margin-left: 10px;
   margin-right: 58px;
}

.client-card {
    width: 680px;
    margin: 0 auto 20px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
    font-size: 12px;
} 
#options-content {
  min-width: 60px;
}
.modal {
  margin-left: 440px;
  margin-top: 210px;
}
}
@media screen and (max-width: 915px) {
     .legend {
    width: 480px;
    font-size: 12px;
}

.contacts-legend {
    width: 70px;
    margin-left: 0;
    margin-right: auto;
}
.coop-ledgend {
    margin-right: 0;
    margin-left: auto;
    width: 70px;
}
.even, .odd {
    margin-left: 10px;
   margin-right: 38px;
}

.client-card {
    width: 580px;
    padding: 10px;
} 
#options-content {
  min-width: 60px;
}
}

</style>