<template>
  <div>

<el-row type="flex" justify="space-around">
  <el-col :span="14">

     <el-form :inline="true" class="demo-form-inline">
      <el-row>
          <el-col :span="8">
          <el-form-item label="Cliente">
             <el-select v-model="Cliente" placeholder="Selecione">
            <el-option
            v-for="item in ListaClientes"
            :key="item.id"
            :label="item.nome"
            :value="item.id">
            <span style="float: left">{{ item.nome }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
        </el-select>
          </el-form-item>

           </el-col>
      </el-row>       
       
       <el-row type="flex" justify="space-around">
          <el-col :span="8">
          <el-form-item label="Produto">
        <el-select v-model="Item.produto" placeholder="Selecione" value-key="id">
            <el-option
            v-for="item in ListaProdutos"
            :key="item.id"
            :label="item.descricao"
            :value="item">
            <span style="float: left">{{ item.descricao }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
        </el-select>
          </el-form-item>

           </el-col>

             <el-col :span="6">
          <el-form-item label="Quantidade">
            <el-input v-model="Item.quantidade"></el-input>
          </el-form-item>
           </el-col>
            
           <el-col :span="4">
          <el-form-item label="Preço Unit.">
            <el-input v-model="Item.precoUnitario"></el-input>
          </el-form-item>

           </el-col>
        
            <el-col :span="4">
             <el-form-item>
                 <br> <!-- TAG PARA DEIXAR BUTTON ALINHADO COM OUTROS ELEMENTOS -->
               <el-button type="primary" @click="AddItem">Adicionar item</el-button>
             </el-form-item>
            </el-col>

      </el-row>

     <el-row>
      <el-col>
    <!--TABELA DE ITENS DO PEDIDO-->
     <el-table  
      :data="DadosPedidoTabela.itens"
      style="width: 100%;text-align:left"
      empty-text=" "> <!-- TEXTO A SER APRESENTADO QUANDO A TABELA ESTIVER VAZIA-->
      <el-table-column
        prop="produto.id"
        label="Id"
        min-width="50">
      </el-table-column>
      <el-table-column
        prop="produto.descricao"
        label="Descrição"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="quantidade"
        label="Quantidade"
        width="180">
      </el-table-column>
      <el-table-column
        prop="precoUnitario"
        label="Preço Unit.">
      </el-table-column>
         <el-table-column
        label="Múltiplo">
        <template slot-scope="scope">
          <span v-if="scope.row.produto.multiplo">
             {{ scope.row.produto.multiplo }}
          </span>
          <span v-else>
             Sem múltiplo
          </span>
        </template>
      </el-table-column>
      <el-table-column
      label="Ações">
      <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="DeletarItemTabela(scope.row)"></el-button>
      </template>
      </el-table-column>
     </el-table>
          </el-col>
          </el-row>

      <br>
      
      <el-row type="flex" justify="space-around">
        <el-col>
            <el-form-item>
               <el-button type="primary" @click="SalvarPedido">Inserir Pedido</el-button>
            </el-form-item>
        </el-col>
      </el-row>
        
        </el-form>

     </el-col>
 </el-row>


  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      ListaClientes: [], // CLIENTES RECUPERADOS DO SISTEMA A SEREM RENDERIZADOS
      ListaProdutos: [], // PRODUTOS RECUPERADOS DO SISTEMA A SEREM RENDERIZADOS
      Item: {
        // ITEM PARA INSERIR NOS DADOS SEREM CADASTRADOS
        produto: [],
        quantidade: "",
        precoUnitario: ""
      },
      Cliente: [],
      DadosPedidoTabela: {
        itens: []
      }
    };
  },
  computed: {
    DadosPedido() {
      // DADOS A SEREM CADASTRADOS
      var itens = this.DadosPedidoTabela.itens.map(item => {
        var i = Object.assign({}, item); // CLONING THE OBJECT TO
        i.produto = item.produto.id;
        return i;
      });
      return { cliente: this.Cliente, itens: itens };
    }
  },
  methods: {
    ...mapActions(["SetClientes", "SetProdutos", "InserirPedido"]), // IMPORTANDO AÇÕES DO VUEX
    ...mapGetters(["getClientes", "getProdutos"]),
    AddItem() {
      // ADICIONAR ITEM NA TABELA
      var novoItem = Object.assign({}, this.Item);
      this.DadosPedidoTabela.itens.push(novoItem);
    },
    DeletarItemTabela(item) {
      // DELETANDO ITEM DA TABELA
      this.DadosPedidoTabela.itens.map((i, index) => {
        if (i == item) {
          console.log(index);
          this.DadosPedidoTabela.itens.splice(index, 1);
        }
      });
    },
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
  },
  watch: {
    "Item.produto"() {
      this.Item.quantidade = 0;
      this.Item.precoUnitario = this.Item.produto.precoUnitario;
    }
  },
  created() {
    this.SetClientes().then(response => {
      // ALIMENTANDO LISTA DE CLIENTES
      if (response.status == 200) {
        this.ListaClientes = this.getClientes();
      }
    });

    this.SetProdutos().then(response => {
      // ALIMENTANDO LISTA DE PRODUTOS
      if (response.status == 200) {
        this.ListaProdutos = this.getProdutos();
      }
    });
  }
};
</script>
