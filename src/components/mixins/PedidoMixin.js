import { mapActions, mapGetters } from "vuex";

var PedidoMixin = {

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
        ...mapActions(["SetClientes", "SetProdutos"]), // IMPORTANDO AÇÕES DO VUEX
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
                    this.DadosPedidoTabela.itens.splice(index, 1);
                }
            });
        }
    }
}

