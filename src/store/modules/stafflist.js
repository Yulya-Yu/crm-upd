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
        return state.deleteStaff
    },
    getDeletedStaffById: (state) => id => {
        return state.deletedStaff.find(deletedStaff => deletedStaff.id == id)
    }
};

const actions = {
    async fetchStaff({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/employee/', { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setStaff', response.data.items);
    },
    async deleteStaff({ commit }, id) {
        await axios.post(`http://api.catering.student.smartworld.team:2280/employee/dismiss?id=${id}`, { username: 'admin' }, { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('deleteStaff', id);
    },
    async fetchMenu({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/category/', { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setMenu', response.data.items);
        // eslint-disable-next-line no-console
        console.log(response.data.items)
    },
    // async fetchMenuCategory({ commit }) {
    //     const response = await axios.get('http://api.catering.student.smartworld.team:2280/category/',
    //         {auth:{username: 'admin', password: 'dj5ghg67'}});
    //     commit('setMenu', response.data.items);
    //     // eslint-disable-next-line no-console
    //     console.log(response.data.items)
    // },
    async fetchDeletedStaff({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/employee/dismissed-staff', { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('setDeletedStaff', response.data.items);
    },
    async restoreStaff({ commit }, id) {
        await axios.post(`http://api.catering.student.smartworld.team:2280/employee/?id=${id}`, { auth: { username: sessionStorage.getItem('login'), password: sessionStorage.getItem('password') } });
        commit('restoreStaff', id);
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
};

export default {
    state,
    getters,
    actions,
    mutations
}