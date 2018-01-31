<template>
  <div>
      
<el-row type="flex" justify="space-around">
  <el-col :span="14">

     <el-form :inline="true" class="demo-form-inline">
      <el-row>
          <el-col :span="8">
          <el-form-item label="Cliente">
             <el-select v-model="Cliente" placeholder="Selecione" no-data-text=" ">
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
        <el-select v-model="Item.produto" no-data-text=" " placeholder="Selecione" value-key="id">
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
      :data="DadosPedido.itens"
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
        
      </el-form>

     </el-col>
 </el-row>
  </div>

</template>

<script>
import PedidoMixin from "./mixins/PedidoMixin";

export default {
  mixins: [PedidoMixin]
};
</script>
