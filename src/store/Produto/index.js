import { http } from '../../http';

export default {

    state: {
        produtos: []
    },
    mutations: {
        SET_PRODUTOS: (state, data) => {
            state.produtos = data
        }
    },
    actions: {
        SetProdutos: ({ commit }) => {
            return new Promise((resolve, reject) => {
                http.get('/produtos/').then(response => {
                    commit('SET_PRODUTOS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        getProdutos: (state) => {
            return state.produtos
        }
    }

} 