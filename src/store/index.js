import Vue from 'vue'
import Vuex from 'vuex'
import stafflist from './modules/stafflist'
import clients from './modules/clients'
import menu from './modules/menu'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        stafflist,
        clients,
        menu
    }
})