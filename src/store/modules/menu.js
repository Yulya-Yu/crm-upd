import axios from 'axios'
import baseURL from '../../../config.js'

const state = {
    menuCategory: [],
    dishes: []

    //authenticated: false
};

const getters = {
    dishesAll: (state) => {
        return state.dishes;
    },
    menuAll: (state) => {
        return state.menuCategory;
    },
    getCategoryById: (state) => id => {
        return state.menuCategory.find(category => category.id === id)
    }
};

const actions = {
    async fetchMenu({ commit }, id) {
        if (id === undefined) {
            const response = await axios.get(baseURL + `/category/list`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
            commit('setMenu', response.data);
        } else {
            const response = await axios.get(baseURL + `/${id}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
            commit('setMenu', response.data);
        }
    },
    async deleteMenuItems({ commit }, id) {
        await axios.post(baseURL + `/category/delete-category?id=${id}`, { username: 'admin' }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('setDeleteMenuItems', id);
    },
    async fetchDishes({ commit }, id) {
        const response = await axios.get(baseURL + `/category/dishes?id=${id}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('setFetchDishes', response.data);
    },
};

const mutations = {
    setMenu: (state, menuCategory) => (state.menuCategory = menuCategory),
    setDeleteMenuItems: (state, id) => state.menuCategory = state.menuCategory.filter(category => category.id !== id),
    setFetchDishes: (state, dishes) => (state.dishes = dishes)
};

export default {
    state,
    getters,
    actions,
    mutations
}