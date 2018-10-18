import React, { Component } from 'react';
import open from '../../assets/menu-open.svg';
import './notebook.css';
import NotebookBackground from './Notebookbackground';

class Notebook extends Component {

    enterMenu = () => {
        this.props.history.push('/menu')
    }
    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return(
            <div >
                <div className="menu-enter nb">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
                <NotebookBackground />

                <div className="onenote-bg">
                    <div className="note">
                        <p className="note-inputs"></p> 
                        <p className="note-inputs2"></p>
                        <p className="note-text"></p>
                        <button className="note-save">EDIT</button>
                    </div>
                        <h3 className="delete-note">DELETE NOTE</h3>
                </div>
            </div>
        )
    }
}

export default Notebook;