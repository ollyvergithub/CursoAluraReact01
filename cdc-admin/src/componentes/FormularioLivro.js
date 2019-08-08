import React from 'react';
import $ from "jquery";
import PubSub from "pubsub-js";
import TratadorErros from "../TratadorErros";

class FormularioLivro extends React.Component{

    constructor(){
        super();
        this.state = {lista_livros: [], titulo: '', preco: '', autorId: ''}
        this.state = {lista : [], codesc: '', nomesc: '', setor: ''};
        this.setAutorId = this.setAutorId.bind(this);
    }

    componentDidMount() {
        $.ajax({
                url: "https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/",
                dataType: 'json',
                data: JSON.stringify({codesc: this.state.codesc, nomesc: this.state.nomesc, setor: this.state.setor}),
                success: function (resposta) {
                    //console.log(resposta);
                    this.setState({lista: resposta.results});
                }.bind(this)
            }
        );
    }

    setAutorId(evento) {
        this.setState({codesc: evento.target.value})
    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <h2>Escolha o Autor</h2>

                    {
                        this.state.lista.length > 0 ? (
                            <select value={ this.state.codesc } name="codesc" onChange={ this.setAutorId }>
                                <option value="">Selecione</option>
                                {
                                    this.state.lista.map(function(escola) {
                                        return <option key={ escola.codesc } value={ escola.codesc }>
                                            { escola.nomesc }
                                        </option>;
                                    })
                                }
                            </select>

                        ) : ( null)
                    }

                    {
                        this.state.codesc ? (console.log('Ollyver ID | ', this.state.codesc)) : (null)

                    }

                </div>
            </div>
        );
    }

}

export default FormularioLivro;