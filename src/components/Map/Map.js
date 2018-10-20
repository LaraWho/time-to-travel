import React, { Component } from 'react';
import './map.css';
import axios from 'axios';
import MapBtn from './MapBtn';
import open from '../../assets/menu-open.svg';

class Map extends Component {
    constructor(props) {
        super(props) 

        this.state = {
           photo: '',
           country: '',
           city: '',
           link: ''
        }
        
    }

    componentDidMount() {
        this.getPhoto()
    }

    getPhoto = () => {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&query=travel&orientation=portrait&w=320&h=568`)
        .then(res => {
            // console.log(res.data.location.country)
            if(!res.data.location) {
                this.setState({
                    country: 'Who knows!',
                    photo: res.data.urls.regular,
                    city: 'Who knows!'
                })
            } else {
                this.setState({
                    photo: res.data.urls.regular,
                    country: res.data.location.country,
                    city: res.data.location.city,
                    link: res.data.links.self
                })
            }
        })
    }

    enterMenu = () => {
        this.props.history.push('/menu')
    }
    goBack = () => {
        this.props.history.push('/landing')
    }
            
            render() {
                console.log(this.state.city)
                console.log(this.state.country)

        return(

        <div className="map-bg">
            <div className="photo-info">
                <p className="city">{this.state.city}</p>
                <p className="country">{this.state.country}</p>
            </div>
                <div className="menu-enter map">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
                <img className="photo" src={this.state.photo} alt=""/>

            <div className="photo-info">
                <MapBtn getPhoto={this.getPhoto}/>
            {/* <p>{this.state.link}</p> */}
            </div>
        </div>
    

        )
    }
}

export default Map;