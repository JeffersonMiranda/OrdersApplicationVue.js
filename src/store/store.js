import Vue from 'vue';
import Vuex from 'vuex';
import cliente from './Cliente/';
import produto from './Produto/';
import pedido from './Pedido/';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cliente,
        produto,
        pedido
    }
}); 