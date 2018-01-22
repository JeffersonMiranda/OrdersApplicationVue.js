<template>
  <div>

<el-row type="flex" justify="space-around">
  <el-col :span="14">

     <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
          <el-col :span="12">
          <el-form-item label="Cliente">
             <el-select v-model="value6" placeholder="Selecione">
            <el-option
            v-for="produto in ProdutosLista"
            :key="item.id"
            :label="item.descricao"
            :value="item.id">
            <span style="float: left">{{ item.descricao }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
        </el-select>
          </el-form-item>

           </el-col>
      </el-row>
       
       
       <el-row type="flex" justify="space-around">
          <el-col :span="6">
          <el-form-item label="Produto">
        <el-select v-model="value6" placeholder="Selecione">
            <el-option
            v-for="produto in ProdutosLista"
            :key="item.id"
            :label="item.descricao"
            :value="item.id">
            <span style="float: left">{{ item.descricao }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
        </el-select>
          </el-form-item>

           </el-col>

             <el-col :span="6">
          <el-form-item label="Quantidade">
            <el-input v-model="DadosPedido.Cliente"></el-input>
          </el-form-item>
           </el-col>
            
             <el-col :span="4">
          <el-form-item label="Preço Unit.">
            <el-input v-model="DadosPedido.Cliente"></el-input>
          </el-form-item>

           </el-col>
      </el-row>

     <el-row>
      <el-col>

     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Quantidade"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Preço Unit.">
      </el-table-column>
     </el-table>

          </el-col>
          </el-row>  

      <el-row>
        <el-col :span="16">
            <el-form-item>
               <el-button type="primary" @click="onSubmit">Inserir Pedido</el-button>
            </el-form-item>
        </el-col>
      </el-row>
        
        </el-form>

     </el-col>
 </el-row>


  </div>
</template>

<script>
export default {
  data() {
    return {
      ListaClientes: [], // CLIENTES RECUPERADOS DO SISTEMA A SEREM RENDERIZADOS
      ListaProdutos: [], // PRODUTOS RECUPERADOS DO SISTEMA A SEREM RENDERIZADOS
      DadosPedido: {
        // DADOS A SEREM CADASTROS
        Cliente: [],
        Itens: []
      }
    };
  }
};
</script>
