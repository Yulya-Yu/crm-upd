<template>
    <div class="category-container">
          <div class="action-btns">
              <router-link to="/"><button class="staff-add-btn" ><img src="@/assets/plus.svg">Добавить Блюдо</button></router-link>
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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'menucategory',
    data(){
        return {
         deleteItem:false,
         itemId: ''
        }
    },
      computed: { 
      ...mapGetters(['menuAll']),
    
},
  methods: { 
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

</style>