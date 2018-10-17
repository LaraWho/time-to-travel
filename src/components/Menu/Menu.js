import React, { Component } from 'react';
import './menu.css';
import close from '../../assets/menu-close.svg';

class Menu extends Component {


    toNotes = () => {
        this.props.history.push('/notebook');
    }

    render() {
        return(
            <div className="menu-bg">
                <div className="menu-exit">
                    <p>TIME TO<br />TRAVEL</p>
                    <img src={close} onClick={this.props.history.goBack} alt="close menu"/>
                </div>

                <div className="menu-items">
                    <div className="menu-h3">
                        <div className="line"></div>
                        <h3 onClick={this.toNotes}>SEE ALL NOTES</h3>
                    </div>
                    <div className="menu-note">
                        <div className="line2"></div>
                        <h3>QUICK NOTE</h3>
                        <input type="text" placeholder="TITLE"/>
                        <input type="text" placeholder="LOCATION"/>
                        <textarea cols="20" rows="10" placeholder="THOUGHTS..."></textarea>
                        <button className="menu-save">SAVE</button>
                    </div>
                    <div className="menu-h3 logout">
                        <div className="line logout"></div>
                        <h3>LOGOUT</h3>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default Menu;