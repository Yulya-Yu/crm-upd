<template>
  <div class="category-container">
    <div class="action-btns">
      <button @click="openAddCategoryModal()" class="staff-add-btn">
        <img src="@/assets/plus.svg" />Добавить Блюдо
      </button>
      <router-link to="/login">
        <button class="exit-btn" @click="logOut()">
          <img src="@/assets/exit.svg" />
        </button>
      </router-link>
    </div>
    <div class="category-table">
      <table>
        <tbody>
          <tr>
            <th>Наименование</th>
            <th>Вес порции (гр)</th>
            <th>Цена за порцию (руб)</th>
            <th>Примечание</th>
          </tr>
          <tr v-for="(menuItem, index) in dishesAll" :key="menuItem.id">
            <transition name="slide-fade">
            <div class="modal-menu-item" v-show="itemId == index">
              <div class="confirm-question">
                <p>Вы уверены?</p>
              </div>
              <div class="confirm-btns">
                <button @click="deleteDish" class="delete-btn-modal">Да</button>
                <button @click="closeItemDeleteModal" class="cancel-btn">Нет</button>
              </div>
            </div>
            </transition>
            <td class="dish-name">
              <button @click="editModalOpen(index)" class="category-edit">
                <img src="@/assets/edit_menu.png" />
              </button>
              <button class="category-delete" @click="deleteItemFunc(index)">
                <img src="@/assets/menu_del.svg" />
              </button>
              <p>{{menuItem.name}}</p>
            </td>
            <td>{{menuItem.weight}}</td>
            <td>{{menuItem.cost}}</td>
            <td class="notes"><p>{{menuItem.notes}}</p></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add-category-modal" v-if="addCategoryModal == true">
      <div class="mask">
        <div class="category-modal-container">
          <div class="addModal">
            <button id="modal-close-btn1" v-on:click="addCategoryModal = false">
              <img src="@/assets/menu_del.svg" />
            </button>
            <h1>Добавить блюдо</h1>
            <div class="form" v-for="(name,index) in addDish" :key="index">
              <input
                v-bind:id="name.type"
                v-on:click="clearError(index)"
                maxlength="50"
                v-if="name.type === 'text'"
                v-on:focus="clearError(index)"
                v-model="name.dishInput"
                v-bind:class="{errorcolor: name.nullInput, errorcolor : name.falseInput}"
                required
              />
              <input
                v-bind:id="name.type"
                v-on:click="clearError(index)"
                maxlength="50"
                v-if="name.type === 'textwithnum'"
                v-on:focus="clearError(index)"
                v-model="name.dishInput"
                v-bind:class="{errorcolor: name.nullInput, errorcolor : name.falseInput}"
                required
              />
              <input
                v-bind:id="name.type"
                v-on:click="clearError(index)"
                maxlength="5"
                v-if="name.type === 'number'"
                v-mask="{mask: '9{5}', placeholder: ' '}"
                v-on:focus="clearError(index)"
                v-model="name.dishInput"
                v-bind:class="{errorcolor: name.nullInput, errorcolor : name.falseInput}"
                required
              />
              <label
                      v-bind:class="{errorbordercolor: addDish[index].nullInput||name.falseInput,succesbordercolor: !addDish[index].nullInput && !name.falseInput}"
                :for="addDish.type"
                class="label-name"
              >
                <span class="content-name">{{name.name}}</span>
                <transition name="slide-fade">
                  <span
                    v-if="name.nullInput === true"
                    class="content-name content-name-error"
                  >Обязательное поле</span>
                </transition>
                <transition name="slide-fade">
                  <span
                    v-if="name.falseInput === true"
                    style="top: 54px"
                    class="content-name content-name-error"
                  >Неправильный формат заполнения</span>
                </transition>
              </label>
            </div>
            <button v-on:click="dishNameValid">Добавить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="add-category-modal" v-if="editCategoryModal == true">
      <div class="mask">
        <div class="category-modal-container">
          <div class="addModal">
            <button id="modal-close-btn2" v-on:click="closeEditModal">
              <img src="@/assets/menu_del.svg" />
            </button>
            <h1>Редактировать блюдо</h1>
            <div class="form" v-for="(name,index) in addDish" :key="index">
              <input
                v-bind:id="addDish[index].type"
                v-on:click="clearError(index)"
                maxlength="50"
                v-if="addDish[index].type === 'text'"
                v-on:focus="clearError(index)"
                v-model="addDish[index].dishInput"
                v-bind:class="{errorcolor: addDish[index].nullInput, errorcolor : addDish[index].falseInput}"
                required
              />
              <input
                v-bind:id="addDish[index].type"
                v-on:click="clearError(index)"
                maxlength="50"
                v-if="addDish[index].type === 'textwithnum'"
                v-on:focus="clearError(index)"
                v-model="addDish[index].dishInput"
                v-bind:class="{errorcolor: addDish[index].nullInput, errorcolor : addDish[index].falseInput}"
                required
              />
              <input
                v-bind:id="addDish[index].type"
                v-on:click="clearError(index)"
                maxlength="5"
                v-if="addDish[index].type === 'number'"
                v-mask="{mask: '9{5}', placeholder: ' '}"
                v-on:focus="clearError(index)"
                v-model="addDish[index].dishInput"
                v-bind:class="{errorcolor: addDish[index].nullInput, errorcolor : addDish[index].falseInput}"
                required
              />
              <label
                      v-bind:class="{errorbordercolor: addDish[index].nullInput||name.falseInput,succesbordercolor: !addDish[index].nullInput && !name.falseInput}"
                :for="addDish.type"
                class="label-name"
              >
                <span class="content-name">{{addDish[index].name}}</span>
                <transition name="slide-fade">
                  <span
                    v-if="addDish[index].nullInput === true"
                    class="content-name content-name-error"
                  >Обязательное поле</span>
                </transition>
                <transition name="slide-fade">
                  <span
                    v-if="addDish[index].falseInput === true"
                    style="top: 54px"
                    class="content-name content-name-error"
                  >Неправильный формат заполнения</span>
                </transition>
              </label>
            </div>
            <button v-on:click="dishNameEditValid">Редактировать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import baseURL from '../../config';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "menucategory",
  data() {
    return {
      editedId: null,
      editCategoryModal: false,
      deletedDishId: null,
      dishes: null,
      counter: 0,
      deleteItem: false,
      itemId: "index",
      addCategoryModal: false,
      addDish: [
        {
          name: "Наименование блюда",
          type: "text",
          falseInput: false,
          nullInput: false,
          dishInput: null
        },
        {
          name: "Вес блюда (гр)",
          type: "number",
          falseInput: false,
          nullInput: false,
          dishInput: null
        },
        {
          name: "Цена блюда (руб)",
          type: "number",
          falseInput: false,
          nullInput: false,
          dishInput: null
        },
        {
          name: "Примечание",
          type: "textwithnum",
          falseInput: false,
          nullInput: false,
          dishInput: null
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["dishesAll"])
  },
  methods: {
    openAddCategoryModal(){
      for (let i = 0; i < this.addDish.length;i++){
        this.addDish[i].dishInput = null;
        this.addDish[i].falseInput = false;
        this.addDish[i].nullInput = false;
      }
      this.addCategoryModal = true
    },
    dishEdit() {
      if (this.counter === 4) {
        axios({
          method: "post",
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } ,
          data: {
            category_id: this.$route.params.cat_id,
            name: this.addDish[0].dishInput,
            cost: this.addDish[1].dishInput,
            weight: this.addDish[2].dishInput,
            notes: this.addDish[3].dishInput
          },
          url: baseURL +`/dish/update?id=${this.editedId}`
        })
          .then(response => {
              this.fetchDishes(this.$route.params.cat_id)
            // eslint-disable-next-line no-console
            console.log(response);
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.response.status);
          });
        this.addDish[0].dishInput = null;
        this.addDish[1].dishInput = null;
        this.addDish[2].dishInput = null;
        this.addDish[3].dishInput = null;
        this.counter = 0;
        this.editedId = null;
        this.editCategoryModal = false;
      }
    },
    dishNameEditValid() {
      this.counter = 0;
      for (let i = 0; i < this.addDish.length; i++) {
        if (this.addDish[i].dishInput === null || this.addDish[i].dishInput === undefined || this.addDish[i].dishInput === "") {
          if (this.addDish[i].type === "textwithnum") {
            this.counter++;
          }
          else{
            this.addDish[i].nullInput = true;
          }
        }
        else if (this.addDish[i].type === "text") {
          let emailCodeRegex = new RegExp(/^([А-Яа-я]{1}-? ?\(?\)?)+([а-я]||(-? ?\(?\)?))+([а-я]\)?){1}$/);
          let isMenuNameValid = emailCodeRegex.test(this.addDish[i].dishInput);
          if (isMenuNameValid === false) {
            this.addDish[i].falseInput = true;
          }
          else {
            this.counter++;
          }
        }
        else if (this.addDish[i].type === "number") {
          if (this.addDish[i].dishInput[0] == 0){
            this.addDish[i].falseInput = true;
          }
          else {
            this.counter++;
          }
        } else if (this.addDish[i].type === "textwithnum") {
          let emailCodeRegex = new RegExp(/^([А-Яа-я0-9]{1}-? ?\(?\)?)+([а-я0-9]||(-? ?\(?\)?))+([а-я0-9]\)?){1}$/);
          let isMenuNameValid = emailCodeRegex.test(this.addDish[i].dishInput);
          if (isMenuNameValid === false) {
            this.addDish[i].falseInput = true;
          } else {
            this.counter++;
          }
        }
      }
      this.dishEdit();
    },
    closeEditModal() {
      this.editedId = null;
      for (let i = 0; i < this.addDish.length;i++){
        this.addDish[i].dishInput = null;
        this.addDish[i].falseInput = false;
        this.addDish[i].nullInput = false;
      }
      this.editCategoryModal = false;
      this.addCategoryModal = false;
    },
    editModalOpen(id) {
      this.editedId = this.dishesAll[id].id;
      this.editCategoryModal = true;
      this.addDish[0].dishInput = this.dishesAll[id].name;
      this.addDish[1].dishInput = this.dishesAll[id].weight;
      this.addDish[2].dishInput = this.dishesAll[id].cost;
      this.addDish[3].dishInput = this.dishesAll[id].notes;
    },
    dishNameValid() {
      this.counter = 0;
      for (let i = 0; i < this.addDish.length; i++) {
        if (
          this.addDish[i].dishInput === null ||
          this.addDish[i].dishInput === undefined ||
          this.addDish[i].dishInput === ""
        ) {
          if (this.addDish[i].dishInput === null || this.addDish[i].dishInput === undefined || this.addDish[i].dishInput === "") {
            if (this.addDish[i].type === "textwithnum") {
              this.counter++;
            }
            else{
              this.addDish[i].nullInput = true;
            }
          }
        }
        else if (this.addDish[i].type === "text") {
          let emailCodeRegex = new RegExp(/^([А-Яа-я]{1}-? ?\(?\)?)+([а-я]||(-? ?\(?\)?))+([а-я]\)?){1}$/);
          let isMenuNameValid = emailCodeRegex.test(this.addDish[i].dishInput);
          if (isMenuNameValid === false) {
            this.addDish[i].falseInput = true;
          } else {
            this.counter++;
          }
        } else if (this.addDish[i].type === "number") {
          if (this.addDish[i].dishInput[0] == 0){
            this.addDish[i].falseInput = true;
          }
          else {
            this.counter++;
          }
        } else if (this.addDish[i].type === "textwithnum") {
          let emailCodeRegex = new RegExp(/^([А-Яа-я0-9]{1}-? ?\(?\)?)+([а-я0-9]||(-? ?\(?\)?))+([а-я0-9]\)?){1}$/);
          let isMenuNameValid = emailCodeRegex.test(this.addDish[i].dishInput);
          if (isMenuNameValid === false) {
            this.addDish[i].falseInput = true;
          } else {
            this.counter++;
          }
        }
      }
      this.dishAdd();
    },
    dishAdd() {
      if (this.counter === 4) {
        axios({
          method: "post",
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } ,
          data: {
            category_id: this.$route.params.cat_id,
            name: this.addDish[0].dishInput,
            cost: this.addDish[1].dishInput,
            weight: this.addDish[2].dishInput,
            notes: this.addDish[3].dishInput
          },
          url: baseURL +`/dish/create`
        })
          .then(response => {
              this.fetchDishes(this.$route.params.cat_id)
            // eslint-disable-next-line no-console
            console.log(response);
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.response.status);
          });
        this.addDish[0].dishInput = null;
        this.addDish[1].dishInput = null;
        this.addDish[2].dishInput = null;
        this.addDish[3].dishInput = null;
        this.counter = 0;
        this.addCategoryModal = false;
      }
    },
    clearError(id) {
      this.addDish[id].falseInput = false;
      this.addDish[id].nullInput = false;
    },
    ...mapActions(["fetchDishes", "deleteMenuItems"]),
    deleteDish() {
      axios({
        method: "post",
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } ,
        url: baseURL +`/dish/delete?id=${this.deletedDishId}`
      })
        .then(response => {
            this.fetchDishes(this.$route.params.cat_id)
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error.response.status);
        });
      this.itemId = null;
    },
    closeItemDeleteModal() {
      this.itemId = null;
    },
    deleteItemFunc(index) {
      this.itemId = index;
      this.deletedDishId = this.dishesAll[index].id;
    },
    logOut() {
      sessionStorage.removeItem("login"),
        sessionStorage.removeItem("password"),
        this.$router.push({ name: "login" });
    }
  },
  created() {
    this.fetchDishes(this.$route.params.cat_id);
  }
};
</script>

<style scoped>
  @-moz-document url-prefix() {
    input{
      box-shadow: none;
    }
    input:focus {
      box-shadow: 0 0 10px rgba(0,0,0,.5)
    }
  }
  @-webkit-keyframes autofill {
    to {
      color: #353541;
      background: transparent;
    }
  }
  @-webkit-keyframes autofill {
    to {
      color: #353541;
      background: transparent;
    }
  }
  input:-webkit-autofill {
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
  }
#modal-close-btn2 {
  background: none;
  border: none;
  outline: none;
  margin-top: 10px;
  margin-right: 15px;
  width: 35px;
  height: 35px;
}
#modal-close-btn1 {
  background: none;
  border: none;
  outline: none;
  margin-top: 10px;
  margin-right: 15px;
  width: 35px;
  height: 35px;
}

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
  color: #e5e5e5;
  font-size: 14px;
  height: 28px;
  width: 90px;
}
.confirm-question p {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.confirm-btns button {
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
  background-color: #ff7373;
  text-align: center;
}
.cancel-btn {
  background-color: #c4c4c4;
}
.category-container {
  background: #e1e1e1;
  width: 100%;
  height: 100%;
  margin-left: 147px;
 
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
  color: #c4c4c4;
  border: none;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
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
.staff-add-btn router-link {
  text-decoration: none;
  color: #c4c4c4;
}
.exit-btn {
  background: #353541;
  width: 93px;
  height: 49px;
  border: none;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.3s;
}
.exit-btn:hover {
  background-color: #18181e;
}

table {
  width: 980px;
  margin: 67px auto;
  text-align: center;
  background: #f0f2f4;
  border: 1px solid #353541;
  vertical-align: middle;
}

th {
  background: #353541;
  border: none;
  height: 35px;
  font-size: 18px;
  line-height: 21px;
  color: #e1e1e1;
}
tr:nth-child(even) {
  background: #e1e1e1;
}

tr {
  height: 28px;
  font-size: 14px;
  line-height: 16px;
  color: #353541;
  margin:auto;
}
.category-delete img,
.category-edit img {
  width: 13px;
  height: 13px;
  margin: auto 8px;
}

.category-delete,
.category-edit {
  outline: none;
  background-color: transparent;
  border: none;
}

.dish-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: inherit;
  height: auto;
  width: 150px;
  margin-right: auto;
  margin-left: 10px;
}

.notes {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 150px;
  height: auto;
  margin: auto;
  top: -10px;

}

.dish-name p, .notes p{
width: inherit;
word-wrap: break-word;
margin: 10px 10px;
text-align: center; 
vertical-align: top;
}

td {
    text-align: center; 
    vertical-align: middle;
    margin-top: auto;
}

.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  height: 500px;
  background: white;
  border: 3px solid #353541;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 18px;
  line-height: 21px;
  color: #353541;
  padding-bottom: 10px;
}

.addModal button {
  margin-left: auto;
  margin-right: auto;
  background: #18181e;
  width: auto;
  height: 40px;
  color: #f0f2f4;
  font-size: 22px;
  line-height: 28px;
  outline: none;
  border: none;
  margin-top: 20px;
  transition: 0.3s;
  border: 1px solid #18181e;
  padding-left: 10px;
  padding-right: 10px;
}
.addModal button:hover {
  background-color: #f0f2f4;
  color: #18181e;
  border: 1px solid #18181e;
}
.form {
  position: relative;
  height: auto;
  margin-bottom: 30px;
}
.form input {
  width: 65%;
  height: 100%;
  border: none;
  padding-top: 20px;
  padding-bottom: 10px;
  outline: none;
}
.form input[placeholder] {
  font-size: 16px;
  line-height: 20px;
}
.form label {
  position: absolute;
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
.content-name {
  position: absolute;
  bottom: 5px;
  left: 0px;
  transition: all 0.3s ease;
}
.form input:focus + .label-name .content-name,
.form input:valid + .label-name .content-name {
  transform: translateY(-150%);
}
.form input:hover + .label-name .content-name,
.form input:valid + .label-name .content-name {
  transform: translateY(-150%);
}
.succescolor {
  color: #353541;
}
.errorcolor {
  color: #ff7373;
}
.succesbordercolor {
  border-bottom: 1px solid #353541;
}
.errorbordercolor {
  border-bottom: 1px solid #ff7373;
}
.content-name-error {
  color: #ff7373;
  right: 0%;
  left: auto;
  bottom: 5px;
}
.content-auth-error {
  top: 50px;
  color: #ff7373;
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

@media screen and (max-width: 1117px) {
  table {
    width: 700px;
  }

  th {
    height: 30px;
    font-size: 14px;
  }

  tr {
    height: 28px;
    font-size: 12px;
    line-height: 16px;
  }
}

@media screen and (max-width: 868px) {
  table {
    width: 550px;
  }

  th {
    height: 30px;
    font-size: 14px;
  }

  tr {
    height: 28px;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>