<template>
   <div>
        <div class="modal-wrapper" id="staff-each" v-show="value">
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
     
   </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
//    props: ['id'],
    name: 'Modal',
    props: {
    value: {
    required: true
    }
},
    data() {
    return {
    showModal: false,
    activateConfirm: false
    }
  },
   computed: {...mapGetters(['allStaff', 'getStaffById'])},
   methods: { 
   ...mapActions(['fetchStaff', 'deleteStaff', 'openModal']),
    test () {
        alert(this.showModal)
        this.showModal = true
    }
   },
     created() {
      this.fetchStaff();
  }
 }

</script>

<style scoped>
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
  width: 100%;
}
.options-icon {
    margin-right: 10px;
    width: 20px;
    height: 20px;
}
#options-content button:hover {
    background-color: #18181E;
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
</style>