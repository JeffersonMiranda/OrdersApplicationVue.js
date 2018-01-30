// MIXIN PARA REUNIR PROPRIEDADES E MÉTODOS COMUNS EM NOVO PEDIDO E MODIFICAR PEDIDO
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
            Cliente: ""
        };
    },
    computed: { // ITENS A SEREM APRESENTADOS NA TABELA COM INFORMAÇÕES COMPLETAS DO PRODUTO  // CLIENTE VINCULADO AO PEDIDO        
        ...mapGetters(["getClientes", "getProdutos"]),
        ...mapGetters({
            DadosPedido: "getPedidoSistema"
        })
    },
    methods: {
        ...mapActions(["SetClientes", "SetProdutos", "AdicionarItem", "ExcluirItem", "AlterarClientePedido"]), // IMPORTANDO AÇÕES DO VUEX
        AddItem() {
            // ADICIONAR ITEM NA TABELA
            var novoItem = Object.assign({}, this.Item);
            this.AdicionarItem(novoItem);
        },
        DeletarItemTabela(item) {
            // DELETANDO ITEM DA TABELA
            this.ExcluirItem(item);
        }
    },
    watch: { // FUNÇÕES A SEREM EXECUTADAS QUANDOS AS SEGUINTES PROPRIEDADES SOFREREM MUDANÇAS
        "Item.produto"() {
            this.Item.quantidade = 0;
            this.Item.precoUnitario = this.Item.produto.precoUnitario;
        },
        Cliente() {
            this.AlterarClientePedido(this.Cliente);
        },
        "DadosPedido.cliente"() {
            this.Cliente = this.DadosPedido.cliente;
        }
    },
    created() {
        this.SetClientes().then(response => {
            // ALIMENTANDO LISTA DE CLIENTES
            if (response.status == 200) {
                this.ListaClientes = this.getClientes;
            }
        });

        this.SetProdutos().then(response => {
            // ALIMENTANDO LISTA DE PRODUTOS
            if (response.status == 200) {
                this.ListaProdutos = this.getProdutos;
            }
        });

    }

}

