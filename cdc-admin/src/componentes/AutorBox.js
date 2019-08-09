import React from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

// Meus componentes
import FormularioAutor from './FormularioAutor';
import TabelaAutores from './TabelaAutores';
const API_AUTORES = process.env.REACT_APP_API_AUTORES;

class AutorBox extends React.Component{

    // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
    _isMounted = false;

    constructor() {
        super();
        this.state = {lista : [], nome: '', email: '', senha: ''};
    }
    // Chamada depois do primeiro render
    componentDidMount() {
        this._isMounted = true;

        $.ajax({
                url: API_AUTORES,
                dataType: 'json',
                success: function (resposta) {
                    this.setState({lista: resposta});
                }.bind(this)
            }
        );

        // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
        if (this._isMounted) {
            PubSub.subscribe('atualiza-lista-autores', function (topico, novaListagem) {
               this.setState({lista: novaListagem})
            }.bind(this)
            );
        }
    }

    componentWillUnmount() {
        //TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
        this._isMounted = false;
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