import http from '../../http';

export default {

    state = {
        clientes =[]
    },
    mutations = {
        SET_CLIENTES = (state, clientes) => {
            state.clientes = clientes
        }
    },
    actions = {
        SET_CLIENTES = () => {
            http.get()
        }
    },
    getters = {
        getClientes = () => {
            return state.clientes
        }
    }

} 