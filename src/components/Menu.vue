<template>
    <div class="menu-container">
          <div class="action-btns">
              <button class="staff-add-btn" @click="addCategoryModal=true"><img src="@/assets/plus.svg">Добавить Категорию</button>
              <router-link to="/login"><button class="exit-btn" @click="goToLogin()"><img src="@/assets/exit.svg"></button></router-link>
          </div>
          <div class="category-container">
              <div class="category-card" v-for="menuCat in menuAll" :key="menuCat.id">
                  <button class="category-delete" @click="showModal(menuCat.id)"><img src="@/assets/menu_del.svg"></button>
                    <transition name="slide-fade">
                  <div class="modal" v-show="selectedId == menuCat.id">
                      <p>Вы уверены что хотите удалить категорию " {{menuCat.name}} " со всеми блюдами ?</p>
                      <div class="confirm-btns">
                          <button @click="(deleteMenuItems(menuCat.id)), (closeModal), (activateConfirm=true)" class="delete-btn-modal">Да</button>
                          <button @click="closeModal" class="cancel-btn">Нет</button>
                      </div>
                      <div class="modal" v-if="activateConfirm==true" @close="activateConfirm=false">
                          <p>Категория " {{menuCat.name}} " успешно удалена</p>
                          <button class="confirm-btns cancel-btn" @click="closeOkModal">ОК</button>
                      </div>
                  </div>
                    </transition>
                  <h1 class="category-name">{{menuCat.title}}</h1>
                  <router-link v-bind:to="{name:'menucategory', params: {cat_id: menuCat.id}}"><button class="items-number" @click="goToCategory(menuCat.id)">{{menuCat.id}} позиций</button></router-link>
              </div>
          </div>
        <div class="add-category-modal" v-if="addCategoryModal == true" >
            <div class="mask">
                <div class="category-modal-container">
                    <div class="addModal">
                        <h1>Добавить категорию</h1>
                        <div class="form">
                            <input id="menus" v-on:click="menuError=false" v-model="categoryName"
                                   v-bind:class="{errorcolor: menuError, errorcolor : nullInput}" required/>
                            <label v-bind:class="{errorbordercolor: menuError,errorbordercolor: nullInput}" for="menus" class="label-name">
                                <span class="content-name" >Наименовние категории</span>
                                <transition name="slide-fade">
                                    <span v-if="menuError == true" class="content-name content-name-error">Обязательное поле</span>
                                </transition>
                            </label>
                        </div>
                        <button v-on:click="catNameValid">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'menu',
data() {
return {
    //search: '',
    activateConfirm: false,
    selectedId:'',
    selectedIdConfirm:'',
    addCategoryModal: false,
    menuError: false,
    nullInput: false,
    categoryName: null,
    }
},
  computed: { 
      ...mapGetters(['menuAll']),
      isMenuNameValid () {
          let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,49})$/)
          let isFathernameValid = emailCodeRegex.test(this.forming[2].name)
          return isFathernameValid
      },
},
  methods: { 
   ...mapActions(['fetchMenu', 'deleteMenuItems']),
      showModal(id) {
          this.selectedId = id;
      },
      closeModal() {
          this.selectedId='';
          this.activateConfirm=false
      },
      closeOkModal() {
          this.selectedId='';
          this.activateConfirm=false;
      },
      catNameValid() {
          if(this.categoryName === null || this.categoryName === undefined || this.categoryName === ''){
              this.menuError = true
          }
          // eslint-disable-next-line no-console
          console.log(this.menuError)
      },
      addCategory() {
      },
      closeCategoryModal() {
      this.addCategoryModal = !this.addCategoryModal;
      },

    goToCategory() {
    this.$router.push({name:'menucategory'});
},
  },
  created() {
      this.fetchMenu();
  }
}
</script>

<style scoped>
.menu-container {
    background: #E1E1E1;
    width: 100%;
    height: 100vh;
    margin-left: 147px;
    overflow: hidden;
}

.action-btns {
    margin-right: 30px;
    margin-top: 30px;
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

.category-container {
    margin-left: 60px;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
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
.category-card {
    width: 350px;
    height: 160px;
    border: 1px solid #353541;
    display: flex;
    flex-direction: column;
    margin-right: 55px;
    margin-bottom: 55px;
    text-align: center;
    position: relative;
}

.category-delete {
outline: none;
background-color: transparent;
border: none;
display: flex;
justify-content: flex-end;
margin: 10px 10px 0 auto;
}

.items-number {
    width: 100%;
    background: #353541;
    height: 40px;
    outline: none;
    border: none;
    position: absolute;
    left: 0;
    bottom: 0px;
    font-size: 24px;
    color: #E1E1E1;
}
h1 {
font-size: 32px;
line-height: 42px;
color: #353541;
}
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.category-modal-container {
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;

}

.addModal {
    width: 500px;
    height: 300px;
    background: white;
    border: 3px solid  #353541;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    font-size: 18px;
    line-height: 21px;
    color: #353541;
}
.addModal h1{
    padding-bottom: 50px;
}
.addModal button{
    margin-left: auto;
    margin-right: auto;
    background: #18181E;
    width: 120px;
    height: 40px;

    color: #F0F2F4;
    font-size: 22px;
    line-height: 28px;
    outline: none;
    border: none;
    margin-top: 50px;
    transition: 0.3s;
    border: 1px solid #18181E;
}
.addModal button:hover {
    background-color: #F0F2F4;
    color: #18181E;
    border: 1px solid #18181E;
}
.form{
    position: relative;
    height: 50px;
}
.form input{
    width: 65%;
    height: 100%;
    border: none;
    padding-top: 20px;
    padding-bottom: 10px;
    outline: none;
}
.form input[placeholder]{
    font-size: 16px;
    line-height: 20px;
}
.form label{
    position: absolute;
    border-bottom: 1px solid #353541;
    bottom: 0px;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    width: 65%;
    height: 100%;
    color: #353541;
    pointer-events: none;
    font-size: 16px;
    line-height: 20px;
}
.content-name{
    position: absolute;
    bottom: 5px;
    left: 0px;
    transition: all 0.3s ease;
}
.form input:focus + .label-name .content-name, .form input:valid + .label-name .content-name{
    transform: translateY(-150%);
}
.form input:hover + .label-name .content-name, .form input:valid + .label-name .content-name{
    transform: translateY(-150%);
}
.succescolor{
    color: #353541;
}
.errorcolor{
    color: #FF7373;
}
.succesbordercolor{
    border-bottom: 1px solid #353541;
}
.errorbordercolor{
    border-bottom: 1px solid #FF7373;
}
.content-name-error{
    color: #FF7373;
    right: 0%;
    left: auto;
    top: 24px;
}
.content-auth-error{
    top: 50px;
    color: #FF7373;
}
.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
</style>