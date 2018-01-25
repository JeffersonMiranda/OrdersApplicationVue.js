import { http } from '../../http';

export default {

    state: {
        pedidoss: []
    },
    mutations: {
        SET_PEDIDOS: (state, pedidos) => {
            state.pedidos = pedidos
        }
    },
    actions: {
        SetPedidos: ({ commit }) => {
            return new Promise((resolve, reject) => {
                http.get('/pedidos/').then()((response) => {
                    commit('SET_PEDIDOS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        InserirPedido: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                http.post('/pedidos/', data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })

        }

    },
    getters: {
        getPedidos: (state) => {
            return state.pedidos
        }
    }

} 