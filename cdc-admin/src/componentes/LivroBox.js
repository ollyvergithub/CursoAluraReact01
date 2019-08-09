import React from 'react';
import FormularioLivro from './FormularioLivro';
import TabelaLivros from './TabelaLivros';
import $ from "jquery";
import PubSub from 'pubsub-js';
const API_LIVROS = process.env.REACT_APP_API_LIVROS;

class LivroBox extends React.Component{

    constructor(){
        super();
        this.state = {lista_livros: []};
    }

    componentDidMount() {
        $.ajax({
                url: API_LIVROS,
                dataType: 'json',
                success: function (resposta) {
                    this.setState({lista_livros: resposta});
                }.bind(this),
                error: function () {
                    console.log("ERRO Primeiro Ajax Livros");
                }
            }
        );

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({lista_livros: novaLista});
        }.bind(this))
    }

    render() {

        return (
            <div>
                <div className="content" id="content">
                    <div className="header">
                        <h1>Cadastro de Livros</h1>
                    </div>

                    <FormularioLivro/>
                    <TabelaLivros lista_livros = {this.state.lista_livros}/>

                </div>
            </div>
        );
    }

}

export default LivroBox;