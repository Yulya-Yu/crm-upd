/* eslint-disable no-undef */
import axios from 'axios'
import baseURL from '../../../config.js'


const state = {
    stafflist: [],
    deletedStaff: [],
};

const getters = {
    allStaff: (state) => {
        return state.stafflist;
    },
    getStaffById: (state) => id => {
        return state.stafflist.find(staff => staff.id === id)
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
        if (id === undefined) {
            const response = await axios.get(baseURL + `/employee/staff`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
            commit('setStaff', response.data);
            // eslint-disable-next-line no-console
            console.log(response.data)
        } else {
            const response = await axios.get(baseURL + `/employee/${id}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
            commit('setStaff', response.data);
        }
    },
    async deleteStaff({ commit }, id) {
        await axios.post(baseURL + `/employee/dismiss?id=${id}`, { username: 'admin' }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('deleteStaff', id);
    },
    async fetchDeletedStaff({ commit }, id) {
        if (id === undefined) {
            const response = await axios.get(baseURL + `/employee/dismissed-staff`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
            commit('setDeletedStaff', response.data);
            // eslint-disable-next-line no-console
            console.log(response.data)
        } else {
            const response = await axios.get(baseURL + `/employee/${id}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
            commit('setDeletedStaff', response.data);
        }
    },
    async restoreStaff({ commit }, id) {
        await axios.post(baseURL + `/employee/restore-work?id=${id}`, { username: 'admin' }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('deletedStaffList', id);
    }
};

const mutations = {
    setStaff: (state, stafflist) => (state.stafflist = stafflist),
    deleteStaff: (state, id) => state.stafflist = state.stafflist.filter(staff => staff.id !== id),
    deletedStaffList: (state, id) => state.deletedStaff = state.deletedStaff.filter(staff => staff.id !== id),
    setDeletedStaff: (state, deletedStaff) => (state.deletedStaff = deletedStaff)
};

export default {
    state,
    getters,
    actions,
    mutations
}