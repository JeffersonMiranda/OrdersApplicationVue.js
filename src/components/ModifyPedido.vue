<template>
<div>
    <form-pedido/>

     <el-row type="flex" justify="space-around">
        <el-col>
            
               <el-button type="primary" @click="SalvarAlteracoes">Salvar Alterações</el-button>
         
        </el-col>
      </el-row>

</div>
</template>

<script>
import FormPedido from "./FormPedido";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    FormPedido
  },
  data() {
    return {
      pedido: []
    };
  },
  computed: {
    ...mapGetters(["getPedidoSistema"])
  },
  methods: {
    ...mapActions(["GetPedidoPorId", "ModificarPedido"]),
    SalvarAlteracoes() {
      
      this.pedido = Object.assign({}, { ...this.getPedidoSistema });

      this.pedido.cliente = 1;
      this.pedido.id = 499;
      this.pedido.itens[0].quantidade = 55;

      alert(JSON.stringify(this.pedido));

      /*
        this.ModificarPedido(pedido)
        .then(response => {
          if (response.status == 201) {
            alert("Modificado com sucesso");
          }
        })
        .catch(response => {
          if (response.status == 406) {
            alert("Erro ao modificar");
          }
        });
        */
    }
  },
  created() {
    this.GetPedidoPorId(this.$route.params.id);
  }
};
</script>
