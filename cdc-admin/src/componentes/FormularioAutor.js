import React from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from '../TratadorErros';

// Meus Componentes
import InputCustomizado from './InputCustomizado';
import InputCustomizadoBotao from './InputCustomizadoBotao';
const API_AUTORES = process.env.REACT_APP_API_AUTORES;

class FormularioAutor extends React.Component{
    // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
    _isMounted = false;

    constructor() {
        super();
        this.state = {lista : [], nome: '', email: '', senha: ''};
        // Bindiando com o this do React
        this.enviaForm = this.enviaForm.bind(this,);
    }

    componentWillUnmount() {
        //TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
        this._isMounted = false;
    }

    enviaForm(evento) {
        this._isMounted = true;
        evento.preventDefault();

        $.ajax({
                url: API_AUTORES,
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
                success: function (novaListagem) {
                    // Dispara um aviso geral de novaListagem disponível
                    PubSub.publish('atualiza-lista-autores', novaListagem);
                    this.setState({nome: '', email: '', senha: ''});
                }.bind(this),

                error: function (resposta) {
                    if (resposta.status === 400){
                        // recuperar quais os erros
                        // exibir a mensagem de erro no campo
                        new TratadorErros().publicaErros(resposta.responseJSON)
                    }
                },
                beforeSend: function () {
                    PubSub.publish("limpa-erros", {})
                }
            }
        );
    }

    salvaAlteracao(nomeInput, evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                    <InputCustomizado id ='nome' type='text' name='nome' value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome"/>
                    <InputCustomizado id ='email' type='email' name='email' value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="Email"/>
                    <InputCustomizado id ='senha' type='password' name='senha' value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha"/>

                    <InputCustomizadoBotao type="submit" texto="Gravar"/>
                </form>

            </div>
        );
    }

}

export default FormularioAutor;