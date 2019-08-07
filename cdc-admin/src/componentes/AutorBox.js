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
            console.log('PubSub ', topico);
            console.log('PubSub ', novaListagem);
            this.setState({lista : novaListagem})
        }.bind(this)
        );
    }

    render(){
        return (
            <div>
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }

}

export default AutorBox;