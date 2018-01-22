import http from '../../http';

export default {

    state = {
        pedidoss =[]
    },
    mutations = {
        SET_PEDIDOS= (state, pedidos) => {
            state.pedidos = pedidos
        }
    },
    actions = {
        SET_PEDIDOS = () => {
            return new Promise((resolve, reject) => {
                http.get('/pedidos/').then()((response) => {
                    commit('SET_PEDIDOS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    },
    getters = {
        getPedidos = () => {
            return state.pedidos
        }
    }

} 