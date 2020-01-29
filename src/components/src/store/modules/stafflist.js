import axios from 'axios'

const state = {
    stafflist: [],
    deletedStaff: [],
    search: '',
    showModal: false,
    menuCategory: [],

    //authenticated: false
};

const getters = {
    allStaff: (state) => {
        return state.stafflist;
    },
    getStaffById: (state) => id => {
        return state.stafflist.find(staff => staff.id === id)
    },
    menuAll: (state) => {
        return state.menuCategory;
    },
    getCategoryById: (state) => id => {
        return state.menuCategory.find(category => category.id === id)
    },
    allDeletedStaff: (state) => {
        return state.deletedStaff
    },
    getDeletedStaffById: (state) => id => {
        return state.deletedStaff.find(deletedStaff => deletedStaff.id == id)
    }
};

const actions = {
    async fetchStaff({ commit }, id) {
        if (id === undefined){
            const response = await axios.get(`http://api.catering.student.smartworld.team:2280/employee/staff`,
                { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
            commit('setStaff', response.data);
            // eslint-disable-next-line no-console
            console.log(response.data)
        }
        else{
            const response = await axios.get(`http://api.catering.student.smartworld.team:2280/employee/${id}`,
                { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
            commit('setStaff', response.data);
        }
    },
    async deleteStaff({ commit }, id) {
        await axios.post(`http://api.catering.student.smartworld.team:2280/employee/dismiss?id=${id}`, { username: 'admin' }, { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('deleteStaff', id);
    },
    async fetchMenu({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/category/list', { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setMenu', response.data);
    },
    async fetchDeletedStaff({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/employee/dismissed-staff', { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setDeletedStaff', response.data);
    },
    async restoreStaff({ commit }, id) {
        await axios.post(`http://api.catering.student.smartworld.team:2280/employee/restore-work?id=${id}`, { username: 'admin' }, { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setDeletedStaff', id);
    },
    async deleteMenuItems({ commit }, id) {
        await axios.post(`http://api.catering.student.smartworld.team:2280/category/delete-category?id=${id}`, { username: 'admin' }, { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setDeleteMenuItems', id);
    },
    async fetchDishes({ commit }, id) {
        await axios.get(`http://api.catering.student.smartworld.team:2280/category/dishes?id=${id}`, { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setfetchDishes', id);
    },

};

const mutations = {
    setStaff: (state, stafflist) => (state.stafflist = stafflist),
    deleteStaff: (state, id) => state.stafflist = state.stafflist.filter(staff => staff.id !== id),
    setMenu: (state, menuCategory) => (state.menuCategory = menuCategory),
    // setAuthentication(state, status) {
    //     state.authenticated = status;
    // }
    setDeletedStaff: (state, deletedStaff) => (state.deletedStaff = deletedStaff),
    setDeleteMenuItems: (state, id) => state.menuCategory = state.menuCategory.filter(category => category.id !== id),
};

export default {
    state,
    getters,
    actions,
    mutations
}