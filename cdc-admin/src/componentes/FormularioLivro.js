import React from 'react';
import $ from "jquery";
import PubSub from "pubsub-js";
import TratadorErros from "../TratadorErros";
import InputCustomizado from './InputCustomizado';
import InputCustomizadoBotao from "./InputCustomizadoBotao";
const API_AUTORES = process.env.REACT_APP_API_AUTORES;
const API_LIVROS = process.env.REACT_APP_API_LIVROS;

class FormularioLivro extends React.Component{
    // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
    _isMounted = false;
    constructor(){
        super();
        this.state = {lista_livros: [], lista_autores: [], titulo: '', preco: '', autorId: '', autor: ''};
        this.setAutorId = this.setAutorId.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.enviaFormLivro = this.enviaFormLivro.bind(this);

        // {"id":6062,
        // "titulo":"teste",
        // "preco":32131.00,
        // "autor":{
        //      "id":2,
        //      "nome":"alberto",
        //      "email":"alberto.souza@caelum.com.br"
        //      ]
    //      }
    }

    componentDidMount() {
        this._isMounted = true;
        $.ajax({
                url: API_AUTORES,
                dataType: 'json',
                success: function (resposta) {
                    //console.log(resposta);
                    this.setState({lista_autores: resposta});
                }.bind(this),
                error: function () {
                    console.log("ERRO Primeiro Ajax Autores");

                }
            }
        );

        $.ajax({
                url: API_LIVROS,
                dataType: 'json',
                success: function (resposta) {
                    console.log("Sucesso Primeiro Ajax Livros");
                    console.log(resposta);
                    this.setState({lista_livros: resposta});
                }.bind(this),
            error: function () {
                console.log("ERRO Primeiro Ajax Livros");

            }
            }
        );
    }

    componentWillUnmount() {
        //TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
        this._isMounted = false;
    }

    setAutorId(evento) {
        this.setState({autorId: evento.target.value})
    }

    setTitulo(evento){
        this.setState({titulo: evento.target.value})
    }

    setPreco(evento){
        this.setState({preco: evento.target.value})
    }

    enviaFormLivro(evento){
        evento.preventDefault();

        console.log(evento);

        $.ajax({
                url: API_LIVROS,
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({autorId: this.state.autorId, titulo: this.state.titulo, preco: this.state.preco, autor:this.state.autor}),
                success: function (novaListagem) {
                    console.log('Sucesso Envio Livro');
                    console.log(novaListagem);
                    this.setState({lista_livros: novaListagem})

                }.bind(this),
                error: function (resposta) {
                   console.log('Erro Envio Livro')
                },

            }
        );

    }

    render() {
/*        console.log('Ollyver Lista Livros | ');
        console.log(this.state.lista_livros);
        console.log('--------------------------------------------------------------');
        console.log('Ollyver Lista Autores | ');
        console.log(this.state.lista_autores);*/
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <h2>Escolha o Autor</h2>
                    <form className="pure-form pure-form-aligned" onSubmit={this.enviaFormLivro} method="post">

                    {
                        this.state.lista_autores.length > 0 ? (
                            <div className="pure-form pure-form-aligned">
                                <label htmlFor='AutorId'>Escolha o Autor</label>
                                <select value={ this.state.id } id="AutorId" name="AutorId" onChange={ this.setAutorId }>
                                    <option value="">Selecione</option>
                                    {
                                        this.state.lista_autores.map(function(autor, index) {
                                            return <option key={ autor.id } value={ autor.id }>
                                                { autor.nome }
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>

                        ) : ( null)
                    }

                        <InputCustomizado id ='titulo' type='text' name='titulo' value={this.state.titulo} onChange={this.setTitulo} label="Título"/>
                        <InputCustomizado id ='preco' type='text' name='preco' value={this.state.preco} onChange={this.setPreco} label="Preço R$"/>

                        <InputCustomizadoBotao type="submit" texto="Enviar"/>

                    </form>

                    <table className="pure-table">
                        <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            this.state.lista_livros.length > 0 ? (

                                this.state.lista_livros.map(function (livro) {
                                    return (
                                        <tr key={livro.id}>
                                            <td>{livro.titulo}</td>
                                            <td>{livro.preco}</td>
                                            <td>{livro.autor.nome}</td>
                                        </tr>
                                    );
                                })
                            ) : (

                                <tr>
                                    <td>Erro API Titulo</td>
                                    <td>Erro API Preço</td>
                                    <td>Erro API Nome</td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>


                </div>
            </div>
        );
    }

}

export default FormularioLivro;