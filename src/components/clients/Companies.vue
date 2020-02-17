<template>
    <div class="company-cards-container">
        <div class="company-card"  v-for="(company, index) in allCompanies" :key="company.id" :company="company">
        <div class="main-info">
            <h5>{{company.name}} {{company.surname}}</h5>
            <div class="contact-data">
               <p><img src="@/assets/loc.svg" class="loc-icon" />
                  {{company.surname}}</p>
               <p>
                  ИНН: {{company.telephone}}
               </p>
            </div>
        </div>
        <div class="options-container">
            <button class="options-btn">
              <img src="@/assets/dots.svg" />
            </button>
            <div id="options-content">
              <router-link v-bind:to="{name:'companyedit', params: {company_id: company.id}}">
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
            <p>Вы уверены что хотите удалить организацию " {{company.name}} "?</p>
            <div class="confirm-btns">
              <button
                @click="(deleteCompany(company.id)), (closeModal), (activateConfirm=true)"
                class="delete-btn-modal"
              >Да</button>
              <button @click="closeModal" class="cancel-btn">Нет</button>
            </div>
            <div class="modal" v-if="activateConfirm==true" @close="activateConfirm=false">
              <p>Организация " {{company.name}} " успешно удалена</p>
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
    name: 'Companies',
    data(){
        return {
      activateConfirm: false,
      selectedId: "index",
      selectedIdConfirm: "",
      addCategoryModal: false,
        }
    },
    computed: {
  ...mapGetters(["allCompanies"]),
},
methods: {
    ...mapActions(["fetchCompany", "deleteCompany"]),
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
    this.fetchCompany();
  }
}
</script>

<style scoped>
.company-cards-container {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}

.company-card {
  width: 320px;
  height: 150px;
  margin-right: 25px;
  margin-bottom: 25px;
  padding: 15px 5px 20px 25px;
  text-align: center;
  position: relative;
  background: #f0f2f4;
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.main-info {
    width: 100%;
}

.main-info h5 {
font-weight: 600;
font-size: 16px;
line-height: 20px;
color: #353541;
margin-bottom: 17px;
}

.loc-icon {
    margin-right: 9px;
    width: 26px;
    height: 26px;
}

.contact-data {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.contact-data p {
font-size: 14px;
line-height: 18px;
color: #353541;
}

.options-container {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
}
/* Dropdown Content (Hidden by Default) */

#options-content {
  display: none;
  position: absolute;
  background-color: #353541;
  min-width: 150px;
  z-index: 1;
  margin-left: 33px;
  margin-top: -43px;
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
  transition: 0.3s;
}
#options-content button:hover {
  background-color: #18181e;
}

/* Show the dropdown menu on hover */

#options-content:hover {
  display: block;
}

.options-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.options-btn {
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  width: 25px;
  height: 20px;
  margin: 5px 0 0 auto;
}

.options-btn:hover ~ #options-content {
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
.options-container {
  position: relative;
  display: inline-block;
}


.modal {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: 10;
  background: #353541;

  top: 0px;
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
</style>