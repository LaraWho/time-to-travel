import React, { Component } from 'react';
import open from '../../assets/menu-open.svg';
import './notebook.css';
import NbBg from './NbBg';

class Notebook extends Component {

    render() {
        return(
            <div >
                <div className="menu-enter nb">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
                <NbBg />
            </div>
        )
    }
}

export default Notebook;