import axios from 'axios'

const state = {
    stafflist: []
};

const getters = {
    allStaff: (state) => {
        return state.stafflist;
    }

};

const actions = {
    async fetchStaff({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setStaff', response.data);
    },
    async addStaff({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', { title });
        commit('addStaff', response.data);
    },
    async deleteStaff({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        commit('deleteStaff', id);
    }
};

const mutations = {
    setStaff: (state, stafflist) => (state.stafflist = stafflist),
    addStaff: (state, staff) => state.stafflist.unshift(staff),
    deleteStaff: (state, id) => state.stafflist = state.stafflist.filter(staff => staff.id !== id)
        //    updateStaff(state, stafflist) {
        //       state.stafflist = stafflist
        //    },
        //    addStaff(state, newStaff) {
        //        state.posts.unshift(newStaff)
        //    }
};

export default {
    state,
    getters,
    actions,
    mutations
}