import React, { Component } from 'react';
import '../Menu/menu.css';
import './addnew.css';
import axios from 'axios';
// import sweetie from 'sweetalert2';

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            location: '',
            content: '',
            country: '',
            photo: ''
        }
    }
    componentDidMount() {
        this.setState({
            location: this.props.name,
            country: this.props.country,
            photo: this.props.photo
        })
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
        let { title, country, location, content, photo } = this.state
        axios.post('/allnotes/new', { country, title, location, content, photo })
        .then(res => {
            setTimeout(() => {
                this.props.history.push('/landing');
                }, 200)
        }).catch((err) => console.log(err))
    }

    render() {
        return(
            <div className="menu-bg menu">

                <div className="menu-items menu">
                    
                    <div className="menu-note menu">
                        <div className="line2 menu"></div>
                        <h3>QUICK NOTE</h3>
                        <input type="text" placeholder="LOCATION" value={`${this.state.country}, ${this.state.location}`}
                        onChange={this.handleAddLoc} disabled={true}/>
                        <input type="text" placeholder="THOUGHTS..."
                        onChange={this.handleAddTitle}/>
                        {/* <textarea cols="20" rows="10" placeholder="THOUGHTS..."
                        onChange={this.handleAddContent}></textarea> */}
                        <img className="addnew-photo" src={this.state.photo} alt=""/>
                        <button className="menu-save" onClick={this.addNote}>SAVE</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Menu;