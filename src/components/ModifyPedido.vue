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
      this.pedido = JSON.parse(JSON.stringify(this.getPedidoSistema)); // RECEBENDO PEDIDO DO STATE PARA SER ENVIADO PARA O BANCO

      this.pedido.itens.map(item => {
        let p = item.produto.id;
        item.produto_id = p;
        delete item.produto;
      });

      this.ModificarPedido(this.pedido)
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
    }
  },
  created() {
    this.GetPedidoPorId(this.$route.params.id);
  }
};
</script>
