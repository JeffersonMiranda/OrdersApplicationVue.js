<template>
  <div>

    <form-pedido/>
     
      <el-row type="flex" justify="space-around">
        <el-col>
            
               <el-button type="primary" @click="SalvarPedido">Inserir Pedido</el-button>
         
        </el-col>
      </el-row>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormPedido from "./FormPedido";

export default {
  components: {
    FormPedido
  },
  computed: {
    DadosPedido() {
      // DADOS A SEREM CADASTRADOS CONTENDO SOMENTE O ID DO PRODUTO
      var c = this.getPedidoSistema().cliente; // RECUPERANDO CLIENTE A SER CADASTRADO COM O PEDIDO
      var itens = this.getPedidoSistema().itens.map(item => {
        var i = Object.assign({}, item); // CLONANDO O OBJETO
        i.produto_id = item.produto.id;
        return i;
      });
      return { cliente: c, itens: itens };
    }
  },
  methods: {
    ...mapActions(["InserirPedido"]), // IMPORTANDO AÇÕES DO VUEX
    ...mapGetters(["getPedidoSistema"]),
    SalvarPedido() {
      // INSERIR PEDIDO NO BANCO
      if (this.DadosPedido.itens.length > 0) {
        this.InserirPedido(this.DadosPedido)
          .then(response => {
            if (response.status == 201) {
              // SE STATUS DA REQUISIÇÃO FOR 201 (SALVO COM SUCESSO)
              this.$message({
                type: "success",
                message: "Pedido inserido com sucesso !"
              });
              this.DadosPedidoTabela.itens = [];
              this.Cliente = null;
              this.DadosPedido = [];
            }
          })
          .catch(error => {
            if (error.response.status == 406) {
              //  alert( JSON.stringify(error.response.data));
              this.$message({
                type: "error",
                message: error.response.data.ErrorMsg
              });
            } else {
              this.$message({
                type: "error",
                message: error
              });
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "O pedido deve possuir itens!"
        });
      }
    }
  }
};
</script>
