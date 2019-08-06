import React from 'react';
import $ from 'jquery';

// Meus componentes
import FormularioAutor from './FormularioAutor';
import TabelaAutor from './TabelaAutor';

class AutorBox extends React.Component{
    constructor() {
        super();
        this.state = {lista : [], nome: '', email: '', senha: ''};
        this.atualizaListagem = this.atualizaListagem.bind(this)
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
    }

    atualizaListagem(novaLista){
        this.setState({lista: novaLista})
    }

    render(){
        return (
            <div>
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
                <TabelaAutor lista={this.state.lista}/>
            </div>
        );
    }

}

export default AutorBox;