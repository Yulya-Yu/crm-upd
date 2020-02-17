/* eslint-disable no-console */
import axios from 'axios'
import baseURL from '../../../config.js'

const state = {
    clientlist: [],
    companylist: []
};

const getters = {
    allClients: (state) => {
        return state.clientlist;
    },
    allCompanies: (state) => {
        return state.companylist;
    }
};

const actions = {
    async fetchClients({ commit }) {
        const response = await axios.get(baseURL + `/client/list`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('setClients', response.data);
    },
    async deleteClient({ commit }, id) {
        await axios.post(baseURL + `/client/delete?id=${id}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('deleteClient', id);
    },
    async fetchCompany({ commit }) {
        const response = await axios.get(baseURL + `/organization/list`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('setCompanies', response.data);
    },
    async deleteCompany({ commit }, id) {
        await axios.post(baseURL + `/organization/delete?id=${id}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
        commit('deleteCompany', id);
    },

};

const mutations = {
    setClients: (state, clientlist) => (state.clientlist = clientlist),
    deleteClient: (state, id) => state.clientlist = state.clientlist.filter(client => client.id !== id),
    setCompanies: (state, companylist) => (state.companylist = companylist),
    deleteCompany: (state, id) => state.companylist = state.companylist.filter(company => company.id !== id),
};

export default {
    state,
    getters,
    actions,
    mutations
}