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

    toNotes = () => {
        this.props.history.push('/notebook');
    }

    toLanding = () => {
        this.props.history.push('/landing');
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
                    
                    <AddNew history={this.props.history} name={this.props.name}/>

                    {/* <div className="money-box">
                        <div className="line3"></div>
                        <h3>CURRENCY INFO</h3>
                    </div> */}

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