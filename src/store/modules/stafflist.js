import axios from 'axios'

const state = {
    stafflist: [],
    search: '',
    showModal: false,
    menuCategory: []
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
};

const actions = {
    async fetchStaff({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/employee/',
            {auth:{username: 'admin', password: 'dj5ghg67'}});
        commit('setStaff', response.data.items);
    },
    async deleteStaff({ commit }, id) {
        await axios.post(`http://api.catering.student.smartworld.team:2280/employee/dismiss?id=${id}`,
            {username: 'admin'},{auth:{username: 'admin', password: 'dj5ghg67',}});
        commit('deleteStaff', id);
    },
    async fetchMenu({ commit }) {
        const response = await axios.get('http://api.catering.student.smartworld.team:2280/category/',
            {auth:{username: 'admin', password: 'dj5ghg67'}});
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
};

const mutations = {
    setStaff: (state, stafflist) => (state.stafflist = stafflist),
    deleteStaff: (state, id) => state.stafflist = state.stafflist.filter(staff => staff.id !== id),
    setMenu: (state, menuCategory) => (state.menuCategory = menuCategory),
};

export default {
    state,
    getters,
    actions,
    mutations
}