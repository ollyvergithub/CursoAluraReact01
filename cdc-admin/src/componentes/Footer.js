import React, { Component } from "react";
import '../css/footer.css';

class Footer extends Component{

    render() {

        return (
            <div className="footer">
                <div className="pure-g">
                    <div className="pure-u-1-3"><p>Thirds</p></div>
                    <div className="pure-u-1-3"><p>Thirds</p></div>
                    <div className="pure-u-1-3"><p>Thirds</p></div>
                </div>
            </div>
        );
    }

}

export default Footer;