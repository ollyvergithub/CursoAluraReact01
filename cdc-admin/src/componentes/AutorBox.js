import React from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

// Meus componentes
import FormularioAutor from './FormularioAutor';
import TabelaAutores from './TabelaAutores';

class AutorBox extends React.Component{
    constructor() {
        super();
        this.state = {lista : [], nome: '', email: '', senha: ''};
    }
    // Chamada depois do primeiro render
    componentDidMount() {
        $.ajax({
                url: "http://cdc-react.herokuapp.com/api/autores",
                dataType: 'json',
                success: function (resposta) {
                    this.setState({lista: resposta});
                }.bind(this)
            }
        );
        
        PubSub.subscribe('atualiza-lista-autores', function (topico, novaListagem) {
            this.setState({lista : novaListagem})
        }.bind(this)
        );
    }

    render(){
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor/>
                    <TabelaAutores lista={this.state.lista}/>
                </div>

            </div>
        );
    }

}

export default AutorBox;