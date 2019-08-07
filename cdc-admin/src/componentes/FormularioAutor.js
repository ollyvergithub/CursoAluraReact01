import React from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

// Meus Componentes
import InputCustomizado from './InputCustomizado';
import InputCustomizadoBotao from './InputCustomizadoBotao';

class FormularioAutor extends React.Component{
    constructor() {
        super();
        this.state = {lista : [], nome: '', email: '', senha: ''};
        // Bindiando com o this do React
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();

        $.ajax({
                url: "http://cdc-react.herokuapp.com/api/autores/",
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
                success: function (novaListagem) {
                    // Dispara um aviso geral de novaListagem disponível
                    PubSub.publish('atualiza-lista-autores', novaListagem)
                },

                error: function (resposta) {
                    console.log("Erro")
                }
            }
        );
    }

    setNome(evento){
        this.setState({nome: evento.target.value})

    }
    setEmail(evento){
        this.setState({email: evento.target.value})
    }

    setSenha(evento){
        this.setState({senha: evento.target.value})
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                    <InputCustomizado id ='nome' type='text' name='nome' value={this.state.nome} onChange={this.setNome} label="Nome"/>
                    <InputCustomizado id ='email' type='email' name='email' value={this.state.email} onChange={this.setEmail} label="Email"/>
                    <InputCustomizado id ='senha' type='password' name='email' value={this.state.senha} onChange={this.setSenha} label="Senha"/>

                    <InputCustomizadoBotao type="submit" texto="Gravar"/>
                </form>

            </div>
        );
    }

}

export default FormularioAutor;