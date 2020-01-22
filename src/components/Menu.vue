<template>
    <div class="menu-container">
          <div class="action-btns">
              <button class="staff-add-btn" @click="addCategoryModal=true"><img src="@/assets/plus.svg">Добавить Категорию</button>
              <router-link to="/login"><button class="exit-btn" @click="goToLogin()"><img src="@/assets/exit.svg"></button></router-link>
          </div>
          <div class="category-container">
              <div class="category-card" v-for="menuCat in menuAll" :key="menuCat.id">
                  <button class="category-delete" @click="showModal(menuCat.id)"><img src="@/assets/menu_del.svg"></button>

                  <div class="modal" v-show="selectedId == menuCat.id">
                      <p>Вы уверены что хотите удалить категорию " {{menuCat.name}} " со всеми блюдами ?</p>
                      <div class="confirm-btns">
                          <button @click="(deleteMenuItems(menuCat.id)), (closeModal), (activateConfirm=true)" class="delete-btn-modal">Да</button>
                          <button @click="closeModal" class="cancel-btn">Нет</button>
                      </div>
                      <div class="modal" v-if="activateConfirm==true" @close="activateConfirm=false">
                          <p>Категория " {{menuCat.name}} " успешно удалена</p>
                          <button class="confirm-btns cancel-btn" @click="activateConfirm=false, selectedId=''">ОК</button>
                      </div>
                  </div>

                  <h1 class="category-name">{{menuCat.title}}</h1>
                  <router-link v-bind:to="{name:'menucategory', params: {cat_id: menuCat.id}}"><button class="items-number" @click="goToCategory(menuCat.id)">{{menuCat.id}} позиций</button></router-link>
              </div>
          </div>
                            
                            <div class="add-category-modal" v-if="addCategoryModal == true" >
                                <div class="mask">
                                    <div class="category-modal-container">
                                     <div class="addModal">
                                     <label for="newCategory">Добавить Категорию</label>
                                     <input type="text" id="newCategory">
                                     <div class="confirm-btns">
                                        <button @click="closeCategoryModal" class="add-category-success">Добавить</button>
                                     </div>
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
    addCategoryModal: false
    }
},
  computed: { 
      ...mapGetters(['menuAll']),
},
  methods: { 
   ...mapActions(['fetchMenu', 'deleteMenuItems']),
      showModal(id) {
        this.selectedId = id;
      },
      closeModal() {
        this.selectedId='';
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
    width: 230px;
    position: absolute;
    height: 120px;
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
    background: #353541;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    font-size: 18px;
    line-height: 21px;
    color: #E1E1E1;
}

input {
    width: 60%;
    border: none;
    margin: 20px auto;
    outline: none;
    padding: 10px;
    background: #F0F2F4;
}

.add-category-success {
    border: none;
    width: 100px;
    height: 50px;
    background-color: #C4C4C4; 
    color:#353541;
    font-size: 16px;
}

</style>