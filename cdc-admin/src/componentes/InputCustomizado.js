import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component{
    // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
    _isMounted = false;
    constructor(){
        super();
        this.state = {msgErro:''}
    }

    componentDidMount() {
        // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
        this._isMounted = true;

        // TENTANDO RESOLVER - Warning: Can't perform a React state update on an unmounted component.
        if (this._isMounted) {
            PubSub.subscribe('erro-validacao', function (topico, erro) {
                    if (erro.field === this.props.name) {
                        this.setState({msgErro: erro.defaultMessage})
                    }
                }.bind(this),
            );

            PubSub.subscribe('limpa-erros', function (topico) {
                    this.setState({msgErro: ''});
                }.bind(this)
            );
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}  />
                <span className="error"> {this.state.msgErro}</span>
            </div>
        );
    }
}

export default InputCustomizado