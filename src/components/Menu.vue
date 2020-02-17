<template>
    <div class="menu-container">
        <div class="action-btns">
            <button class="staff-add-btn" @click="addCategoryModal=true">
                <img src="@/assets/plus.svg" />Добавить Категорию
            </button>
            <router-link to="/login">
                <button class="exit-btn" @click="logOut()">
                    <img src="@/assets/exit.svg" />
                </button>
            </router-link>
        </div>
        <div class="category-container">
            <div
                    class="category-card"
                    v-for="(menuCat, index) in menuAll"
                    :key="menuCat.category_id"
            >
                <button class="options-btn">
                    <img src="@/assets/dots.svg" />
                </button>
                <div id="options-content">
                    <button @click="openEditCategory(menuCat)">
                        <img src="@/assets/edit.svg" class="options-icon" /> Редактировать
                    </button>
                    <button @click="showModal(index)">
                        <img src="@/assets/del.svg" class="options-icon" /> Удалить
                    </button>
                </div>
                <transition name="slide-fade">
                    <div class="modal" v-if="selectedId == index">
                        <p>Вы уверены что хотите удалить категорию " {{menuCat.name}} " со всеми блюдами ?</p>
                        <div class="confirm-btns">
                            <button
                                    @click="(deleteMenuItems(menuCat.category_id)), (closeModal), (activateConfirm=true)"
                                    class="delete-btn-modal"
                            >Да</button>
                            <button @click="closeModal" class="cancel-btn">Нет</button>
                        </div>
                        <div class="modal" v-if="activateConfirm==true" @close="activateConfirm=false">
                            <p>Категория " {{menuCat.name}} " успешно удалена</p>
                            <button class="confirm-btns cancel-btn" @click="closeOkModal">ОК</button>
                        </div>
                    </div>
                </transition>
                <p class="category-name">{{menuCat.name}}</p>
                <router-link
                        @click="fetchDishes(menuCat.category_id)"
                        v-bind:to="{name:'menucategory', params: {cat_id: menuCat.category_id}}"
                >
                    <button
                            class="items-number"
                    >Позиций: {{menuCat.number}}</button>
                </router-link>
            </div>
        </div>
        <div class="add-category-modal" v-if="addCategoryModal == true">
            <div class="mask">
                <div class="category-modal-container">
                    <div class="addModal">
                        <button id="modal-close-btn1" v-on:click="closeAddEditModal">
                            <img src="@/assets/menu_del.svg" />
                        </button>
                        <h1>Добавить категорию</h1>
                        <div class="form">
                            <input
                                    id="category"
                                    v-on:click="clearError"
                                    maxlength="50"
                                    v-on:focus="clearError"
                                    v-model="categoryName"
                                    v-bind:class="{errorcolor: menuError, errorcolor : errorStatus}"
                                    required
                            />
                            <label
                                    v-bind:class="{errorbordercolor: menuError || errorStatus,succesbordercolor: !menuError || !errorStatus}"
                                    for="category"
                                    class="label-name"
                            >
                                <span class="content-name">Наименовние категории</span>
                                <transition name="slide-fade">
                  <span
                          v-if="menuError == 1"
                          class="content-name content-name-error"
                  >Обязательное поле</span>
                                </transition>
                                <transition name="slide-fade">
                  <span
                          v-if="errorStatus == 1"
                          style="top: 54px"
                          class="content-name content-name-error"
                  >Неправильный формат заполнения</span>
                                </transition>
                            </label>
                        </div>
                        <button v-on:click="catNameValid">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-category-modal" v-if="editCategoryModal == true">
            <div class="mask">
                <div class="category-modal-container">
                    <div class="addModal">
                        <button id="modal-close-btn2" v-on:click="closeAddEditModal">
                            <img src="@/assets/menu_del.svg" />
                        </button>
                        <h1>Редактировать категорию</h1>
                        <div class="form">
                            <input
                                    id="categoryRedact"
                                    v-on:click="clearError"
                                    maxlength="50"
                                    v-on:focus="clearError"
                                    v-model="categoryName"
                                    v-bind:class="{errorcolor: menuError, errorcolor : errorStatus}"
                                    required
                            />
                            <label
                                    v-bind:class="{errorbordercolor: menuError || errorStatus,succesbordercolor: !menuError || !errorStatus}"
                                for="categoryRedact"
                                class="label-name"
                                >
                                <span class="content-name">Наименовние категории</span>
                                <transition name="slide-fade">
                  <span
                          v-if="menuError == 1"
                          class="content-name content-name-error"
                  >Обязательное поле</span>
                                </transition>
                                <transition name="slide-fade">
                  <span
                          v-if="errorStatus == 1"
                          style="top: 54px"
                          class="content-name content-name-error"
                  >Неправильный формат заполнения</span>
                                </transition>
                            </label>
                        </div>
                        <button v-on:click="editCategory">Редактировать</button>
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
        name: "menu",
        data() {
            return {
                //search: '',
                activateConfirm: false,
                selectedId: "index",
                selectedIdConfirm: "",
                addCategoryModal: false,
                editCategoryModal: false,
                menuError: false,
                nullInput: false,
                categoryName: null,
                errorStatus: null,
                editId: null
            };
        },
        computed: {
            ...mapGetters(["menuAll"]),
        },
        methods: {
            closeAddEditModal() {
                this.editCategoryModal = false;
                this.addCategoryModal = false;
                this.categoryName = null;
                this.menuError = false;
                this.errorStatus = null;
                this.editId = null;
            },
            openEditCategory(id) {
                this.editCategoryModal = true;
                this.editId = id.category_id;
                this.categoryName = id.name.name
            },
            editCategory() {
                let emailCodeRegex = new RegExp(/^([А-Яа-я]{1}-? ?\(?\)?)+([а-я]||(-? ?\(?\)?))+([а-я]\)?){1}$/);
                let isMenuNameValid = emailCodeRegex.test(this.categoryName);
                if (
                    this.categoryName === null ||
                    this.categoryName === undefined ||
                    this.categoryName === ""
                ) {
                    this.menuError = true;
                } else if (isMenuNameValid === false) {
                    this.errorStatus = 1;
                } else {
                    axios({
                        method: "post",
                        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } ,
                        data: {
                            name: this.categoryName
                        },
                        url: baseURL +`/category/update?id=${this.editId}`
                    })
                        .then(response => {
                            this.fetchMenu();
                            // eslint-disable-next-line no-console
                            console.log(response);
                        })
                        .catch(error => {
                            // eslint-disable-next-line no-console
                            console.log(error.response.status);
                        });
                    this.editCategoryModal = false;
                    this.categoryName = null;
                }
                this.fetchMenu('category/list');
            },
            ...mapActions(["fetchMenu", "deleteMenuItems"]),
            showModal(index) {
                this.selectedId = index;
            },
            closeModal() {
                this.selectedId = "none";
                this.activateConfirm = false;
            },
            closeOkModal() {
                this.selectedId = "none";
                this.activateConfirm = false;
                this.fetchMenu();
            },
            catNameValid() {
                let emailCodeRegex = new RegExp(/^([А-Я]{1})+([а-я]-? ?\(?\)?)+[а-я]{1}$/);
                let isMenuNameValid = emailCodeRegex.test(this.categoryName);
                if (
                    this.categoryName === null ||
                    this.categoryName === undefined ||
                    this.categoryName === ""
                ) {
                    this.menuError = true;
                } else if (isMenuNameValid === false) {
                    this.errorStatus = 1;
                } else {
                    axios({
                        method: "post",
                        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } ,
                        data: {
                            name: this.categoryName
                        },
                        url: baseURL +"/category/create/"
                    })
                        .then(response => {
                            this.fetchMenu();
                            // eslint-disable-next-line no-console
                            console.log(response);
                        })
                        .catch(error => {
                            // eslint-disable-next-line no-console
                            console.log(error.response.status);
                        });
                    this.addCategoryModal = false;
                    this.categoryName = null;
                }
            },
            clearError() {
                this.menuError = false;
                this.errorStatus = null;
            },
            addCategory() {},
            closeCategoryModal() {
                this.addCategoryModal = !this.addCategoryModal;
            },

            goToCategory() {
                this.$router.push({ name: "menucategory" });
            },
            logOut() {
                sessionStorage.removeItem("login"),
                    sessionStorage.removeItem("password"),
                    this.$router.push({ name: "login" });
            }
        },
        created() {
            this.fetchMenu();
        }
    };
</script>

<style scoped>

    /* The container <div> - needed to position the dropdown content */
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
        margin-left: 348px;
        margin-top: -1px;
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

    #modal-close-btn1 {
        background: none;
        border: none;
        outline: none;
        margin-top: 10px;
        margin-right: 15px;
        width: 35px;
        height: 35px;
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
    .menu-container {
        background: #e1e1e1;
        width: 100%;
        height: 100%;
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

    .category-container {
        margin-left: 60px;
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
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
    .category-card {
        width: 350px;
        height: 200px;
        border: 1px solid #353541;
        display: flex;
        flex-direction: column;
        margin-right: 55px;
        margin-bottom: 55px;
        text-align: center;
        position: relative;
        background: #f0f2f4;
        word-wrap: break-word;
    }
    .category-card p{
        width: inherit;
        overflow-wrap: break-word;
        word-wrap: break-word;
        padding: 0 30px 10px 30px;
        font-size: 24px;
        /* text-size-adjust: auto; */
        /* font-size: fit-height; */
    }
    .category-delete {
        outline: none;
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: flex-end;
        margin-left: 10px;
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
        color: #e1e1e1;
        transition: 0.5s;
    }
    .items-number:hover {
        background-color: #18181e;
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
        height: 320px;
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
    .addModal h1 {
        padding-bottom: 50px;
    }
    .addModal button {
        margin-left: auto;
        margin-right: auto;
        background: #18181e;
        width: auto;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        color: #f0f2f4;
        font-size: 22px;
        line-height: 28px;
        outline: none;
        border: none;
        margin-top: 50px;
        transition: 0.3s;
        border: 1px solid #18181e;
    }
    .addModal button:hover {
        background-color: #f0f2f4;
        color: #18181e;
        border: 1px solid #18181e;
    }
    .form {
        position: relative;
        height: 50px;
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
        top: 24px;
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
</style>