import React from 'react';

class TabelaLivros extends React.Component {

    render() {
        return (

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
                    this.props.lista_livros.length > 0 ? (

                        this.props.lista_livros.map(function (livro) {
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
        );
    }
}

export default TabelaLivros