import Vue from 'vue'
import Router from 'vue-router'
import NewPedido from '../components/NewPedido.vue'
import ModifyPedido from '../components/ModifyPedido.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewPedido',
      component: NewPedido
    }
  ]
})
