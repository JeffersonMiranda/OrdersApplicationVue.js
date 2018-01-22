<template>
  <div>

<el-row>
  <el-col :span="24">

     <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
          <el-col :span="16">
          <el-form-item label="Cliente">
            <el-input v-model="DadosPedido.Cliente" placeholder="Selecione um cliente"></el-input>
          </el-form-item>

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
      DadosPedido: {
        // DADOS A SEREM CADASTROS
        Cliente: [],
        Itens: []
      }
    };
  }
};
</script>
