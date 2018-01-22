import http from '../../http';

export default {

    state = {
        produtos =[]
    },
    mutations = {
        SET_PRODUTOS = (state, produtos) => {
            state.produtos = produtos
        }
    },
    actions = {
        SET_PRODUTOS = () => {
            return new Promise((resolve, reject) => {
                http.get('/produtos/').then()((response) => {
                    commit('SET_PRODUTOS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    },
    getters = {
        getProdutos = () => {
            return state.produtos
        }
    }

} 