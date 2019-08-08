import React, { Component } from "react";
import '../css/pure-min.css';
import '../css/side-menu.css';
import {Link} from 'react-router-dom';

class MenuSuperior extends Component{
    render() {
        return(


            <div id="menu">
                <div className="pure-menu">
                    <Link className="pure-menu-heading" to="/#">Company</Link>
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                        <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                        <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
                    </ul>
                </div>
            </div>


        )
    }

}

export default MenuSuperior;