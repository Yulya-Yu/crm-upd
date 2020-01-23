<template>
    <div class="category-container">
          <div class="action-btns">
              <router-link to="/"><button @click="addCategoryModal=true" class="staff-add-btn" ><img src="@/assets/plus.svg">Добавить Блюдо</button></router-link>
              <router-link to="/login"><button class="exit-btn" @click="goToLogin()"><img src="@/assets/exit.svg"></button></router-link>
          </div>
          <div class="category-table">
              <table>
  <tbody >
    <tr>
      <th>Наименование</th>
      <th>Вес порции (гр)</th>
      <th>Цена за порцию (руб)</th>
      <th>Примечание</th>
    </tr>
    <tr v-for="menuItem in menuAll" :key="menuItem.id">
                                <div class="modal-menu-item" v-if="itemId == menuItem.id">
                                    <div class="confirm-question">
                                     <p>Вы уверены?</p>
                                    </div>
                                     <div class="confirm-btns">
                                        <button @click="closeItemDeleteModal" class="delete-btn-modal">Да</button>
                                        <button @click="closeItemDeleteModal" class="cancel-btn">Нет</button>
                                     </div>
                                </div>
      <td class="dish-name"><button class="category-delete" @click="deleteItemFunc(menuItem.id)"><img src="@/assets/menu_del.svg">{{menuItem.title}}</button></td>
      

      <td>120</td>
      <td>210</td>
      <td>от 7 порций</td>
    </tr>
  </tbody>
</table>
          </div>
        <div class="add-category-modal" v-if="addCategoryModal == true">
            <div class="mask">
                <div class="category-modal-container">
                    <div class="addModal">
                        <h1>Добавить блюдо</h1>
                        <div class="form" v-for="(name,index) in addDish" :key="index">
                            <input v-bind:id="addDish[index].type" v-on:click="clearError(index)" maxlength="50"
                                   v-if="addDish[index].type === 'text'"
                                   v-on:focus="clearError(index)" v-model="addDish[index].dishInput"
                                   v-bind:class="{errorcolor: addDish[index].nullInput, errorcolor : addDish[index].falseInput}" required/>
                            <input v-bind:id="addDish[index].type" v-on:click="clearError(index)" maxlength="5"
                                   v-if="addDish[index].type === 'number'"
                                   v-mask="{mask: '9{5}', placeholder: ' '}"
                                   v-on:focus="clearError(index)" v-model="addDish[index].dishInput"
                                   v-bind:class="{errorcolor: addDish[index].nullInput, errorcolor : addDish[index].falseInput}" required/>
                            <label v-bind:class="{errorbordercolor: addDish[index].nullInput,errorbordercolor: addDish[index].falseInput}" :for="addDish.type" class="label-name">
                                <span class="content-name" >{{addDish[index].name}}</span>
                                <transition name="slide-fade">
                                    <span v-if="addDish[index].nullInput === true" class="content-name content-name-error">Обязательное поле</span>
                                </transition>
                                <transition name="slide-fade">
                                    <span v-if="addDish[index].falseInput === true" style="top: 54px" class="content-name content-name-error">Неправильный формат заполнения</span>
                                </transition>
                            </label>
                        </div>
                        <button v-on:click="dishNameValid">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'menucategory',
    data(){
        return {
            counter: 0,
            deleteItem:false,
            itemId: '',
            addCategoryModal: false,
            addDish: [{
                name: 'Наименование блюда',
                type: 'text',
                falseInput: false,
                nullInput: false,
                dishInput: null
            },{
                name: 'Вес блюда',
                type: 'number',
                falseInput: false,
                nullInput: false,
                dishInput: null
            },{
                name: 'Цена блюда',
                type: 'number',
                falseInput: false,
                nullInput: false,
                dishInput: null
            }],
        }
    },
    computed: {
      ...mapGetters(['menuAll']),
},
    methods: {
        dishNameValid() {
            this.counter = 0
            for(let i = 0; i< this.addDish.length; i++){
                if(this.addDish[i].dishInput === null ||
                   this.addDish[i].dishInput === undefined ||
                   this.addDish[i].dishInput === ''){
                   this.addDish[i].nullInput = true
               }
               else if(this.addDish[i].type === 'text'){
                   let emailCodeRegex = new RegExp(/^([А-ЯЁа-яё]{1}[а-яё]{1,49})$/)
                   let isMenuNameValid = emailCodeRegex.test(this.addDish[i].dishInput)
                   if (isMenuNameValid === false){
                       this.addDish[i].falseInput = true
                   }
                   else{
                       this.counter++
                   }
               }
               else if(this.addDish[i].type === 'number'){
                       this.counter++
               }
           }
            this.dishAdd()
        },
        dishAdd(){
            if(this.counter === 3){
                axios({
                    method: 'post',
                    auth: {
                        username: 'admin',
                        password: 'dj5ghg67',
                    },
                    data: {
                        name: this.categoryName
                    },
                    // Вот в это юрл потом надо будет добавить id категории в который мы находимся
                    url: 'http://api.catering.student.smartworld.team:2280/category/create/'
                    })
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error.response.status)
                    })
            }
        },
        clearError(id){
            this.addDish[id].falseInput = false
            this.addDish[id].nullInput = false
        },
   ...mapActions(['fetchMenu', 'deleteMenuItems']),
      closeItemDeleteModal() {
      this.itemId = '';
      },
        deleteItemFunc(id) {
        this.itemId = id;
      },
},
  created() {
      this.fetchMenu();
  }
}
</script>

<style scoped>
.modal-menu-item {
 width: 132px;
height: 28px;
display: flex;
flex-direction: row;
margin-left: -117px;
position: absolute;
align-items: center;
}

.confirm-question {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #353541;
    color: #E5E5E5;
    font-size: 14px;
    height: 28px;
    width: 90px;
}
.confirm-question p {
      top: 0; bottom: 0; left: 0; right: 0;
  margin: auto;
}
.confirm-btns button{
    display: flex;
    flex-direction: column;
    border: none;
    height: 14px;
    width: 26px;
    outline: none;
    font-size: 10px;
line-height: 13px;
color: #353541;
  margin: auto;
}
.delete-btn-modal {
    background-color: #FF7373;
    text-align: center;
}
.cancel-btn {
    background-color: #c4c4c4;
}
.category-container {
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

table {
    width: 900px;
    margin: 67px auto;
    text-align: center;
    background: #F0F2F4;
    border: 1px solid #353541;
}

th {
    background: #353541;
    border: none;
    height: 35px;
    font-size: 18px;
    line-height: 21px;
    color: #E1E1E1;
}
tr:nth-child(even) {
    background: #E1E1E1;
    }

tr {
    height: 28px;
    font-size: 14px;
    line-height: 16px;
    color: #353541;
}    
.category-delete img {
width: 13px;
height: 13px;
margin: auto 13px;
}

.category-delete {
outline: none;
background-color: transparent;
border: none;

}

.dish-name {
display: flex;
flex-direction: row;
align-items: center;
height:inherit;
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
    height: 400px;
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
    margin-top: 20px;
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
    height:auto;
    margin-bottom: 30px;
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
    bottom: 5px;
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