import React, { Component } from 'react';
import './menu.css';
import '../Notebook/addnew.css';
import close from '../../assets/menu-close.svg';
import axios from 'axios';
import sweetie from 'sweetalert2';
import AddNew from '../Notebook/addNew';

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            location: '',
            photo: '',
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

    toNotes = () => {
        this.props.history.push('/notebook');
    }

    toLanding = () => {
        this.props.history.push('/landing');
    }


    render() {
        
        return(
            <div className="menu-bg">
                    <div className="logout">
                        <h3 className="logout-btn" onClick={this.logout}>LOGOUT</h3>
                    </div>
                <div className="menu-exit">
                    <p onClick={this.toLanding}>TIME TO<br />TRAVEL</p>
                    <img src={close} onClick={this.props.history.goBack} alt="close menu"/>
                </div>

                <div className="menu-items">
                    <div className="menu-h3">
                        <div className="line"></div>
                        <h3 onClick={this.toNotes}>WANDERLUST JOURNAL</h3>
                    </div>
                    
                    <AddNew history={this.props.history} name={this.props.name} country={this.props.country} photo={this.props.photo}/>

                   

                </div>
                
            </div>
        )
    }
}

export default Menu;