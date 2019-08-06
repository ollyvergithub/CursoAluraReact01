import React, {Component} from 'react';

class InputCustomizadoBotao extends Component{

    render() {
        return(
            <div className="pure-control-group">
                <label></label>
                <button type={this.props.type} className="pure-button pure-button-primary">{this.props.texto}</button>
            </div>
        );
    }

}

export default InputCustomizadoBotao;