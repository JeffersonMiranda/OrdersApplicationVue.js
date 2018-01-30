import { http } from '../../http';

export default {
    state: {
        pedidos: [],
        pedidoSistema: { // PEDIDO A SER INSERIDO NO SISTEMA
            cliente: "",
            itens: []
        }
    },
    mutations: {
        SET_PEDIDOS: (state, pedidos) => {
            state.pedidos = pedidos
        },
        ADD_ITEM: (state, item) => {
            state.pedidoSistema.itens.push(item)
        },
        DELETE_ITEM: (state, item) => {
            state.pedidoSistema.itens.map((i, index) => {
                if (i == item) {
                    state.pedidoSistema.itens.splice(index, 1);
                }
            });
        },
        MUDAR_PEDIDO_CLIENTE_SISTEMA: (state, cliente) => {
            state.pedidoSistema.cliente = cliente;
        },
        SET_PEDIDO_SISTEMA: (state, pedido) => {
            state.pedidoSistema = pedido;
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
        },
        GetPedidoPorId: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                http.get('/pedidos/' + id + '/').then(response => {
                    commit("SET_PEDIDO_SISTEMA", response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        ModificarPedido: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                http.put('/pedidos/' + data.id + '/', data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        AdicionarItem: ({ commit }, data) => {
            commit('ADD_ITEM', data);
        },
        ExcluirItem: ({ commit }, data) => {
            commit('DELETE_ITEM', data);
        },
        AlterarClientePedido: ({ commit }, data) => {
            commit('MUDAR_PEDIDO_CLIENTE_SISTEMA', data);
        }
    },
    getters: {
        getPedidos: state => state.pedidos,
        getPedidoSistema: state => state.pedidoSistema
    }
} 