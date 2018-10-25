import React, { Component } from 'react';
import './menu.css';
import '../Notebook/addnew.css';
import close from '../../assets/menu-close.svg';
import axios from 'axios';
import sweetie from 'sweetalert2';

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            location: '',
            content: '',
        }
    }

    logout = () => {
        axios.delete('/auth/logout')
          .then(res => {
            sweetie({
                text: "Regenerating!",
                timer: 500,
                showConfirmButton: false,
                padding: '2.5rem'
            })
            setTimeout(() => {
            this.props.history.push('/');
            }, 500)
          }).catch((err) => console.log(err))
      }

    toLanding = () => {
        this.props.history.push('/landing');
    }

    toNotes = () => {
        this.props.history.push('/notebook');
    }

    handleAddTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleAddLoc = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    handleAddContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    addNote = () => {
        let { title, location, content } = this.state
        axios.post('/allnotes/new', { title, location, content })
        .then(res => {
            setTimeout(() => {
                this.props.history.push('/landing');
                }, 200)
        }).catch((err) => console.log(err))
    }


    render() {

        // console.log(this.props.propsName)
        
        return(
            <div className="menu-bg">
                <div className="menu-exit">
                    <p onClick={this.toLanding}>TIME TO<br />TRAVEL</p>
                    <img src={close} onClick={this.props.history.goBack} alt="close menu"/>
                </div>

                <div className="menu-items">
                    <div className="menu-h3">
                        <div className="line"></div>
                        <h3 onClick={this.toNotes}>SEE ALL NOTES</h3>
                    </div>

                <div className="menu-items menu">
                    
                    <div className="menu-note menu">
                        <div className="line2 menu"></div>
                        <h3>QUICK NOTE</h3>
                        <input type="text" placeholder="LOCATION"
                        onChange={this.handleAddLoc}/>
                        <input type="text" placeholder="TITLE"
                        onChange={this.handleAddTitle}/>
                        <textarea cols="20" rows="10" placeholder="THOUGHTS..."
                        onChange={this.handleAddContent}></textarea>
                        <button className="menu-save" onClick={this.addNote}>SAVE</button>
                    </div>
                </div>

                    <div className="menu-h3 logout">
                        <div className="line logout"></div>
                        <h3 onClick={this.logout}>LOGOUT</h3>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default Menu;