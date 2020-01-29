import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './components/Login.vue';
import StaffRegister from './components/staff/StaffRegister'
import StaffEdit from './components/staff/StaffEdit'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DatePicker from "vue2-datepicker";
Vue.use(DatePicker)
Vue.use(BootstrapVue)
import axios from 'axios';

Vue.config.productionTip = false

const VueInputMask = require('vue-inputmask').default
Vue.use(VueInputMask)
Vue.component('Login', Login);
Vue.component('StaffRegister', StaffRegister);
Vue.component('StaffEdit', StaffEdit)
window.axios = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')