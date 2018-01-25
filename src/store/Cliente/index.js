import { http } from '../../http';

export default {

    state: {
        clientes: []
    },
    mutations: {
        SET_CLIENTES: (state, data) => {
            state.clientes = data
        }
    },
    actions: {
        SetClientes: ({ commit }) => {
            return new Promise((resolve, reject) => {
                http.get('/clientes/').then(response => {
                    commit('SET_CLIENTES', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        getClientes: (state) => {
            return state.clientes
        }
    }

} 