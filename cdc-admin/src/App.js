import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router-dom';
import {Switch, Route} from "react-router-dom";

// Meus Componentes
import MenuSuperior from './componentes/MenuSuperior';
import AutorBox from './componentes/AutorBox';
import Home from './Home';
import Footer from './componentes/Footer';
import LivroBox from "./componentes/LivroBox";

class App extends Component {

    render() {
        return (
            <div id="layout">
                <MenuSuperior/>
                <div id="main">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/autor" component={AutorBox} />
                        <Route path="/livro" component={LivroBox}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;