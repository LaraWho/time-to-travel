import React, { Component } from 'react';
import './map.css';
import axios from 'axios';
import MapBtn from './MapBtn';
import open from '../../assets/menu-open.svg';
import particleConfig from '../../particlesjs-config.json';
import Particles from 'react-particles-js';
import scroll from './next-icon.svg';

class Map extends Component {
    constructor(props) {
        super(props) 

        this.state = {
           photo: '',
           country: '',
           city: '',
           name: '',
           width: 0,
           photographer: '',
           photographerLink: ''
        }
        
    }

    componentDidMount() {
        this.getPhoto()
        this.fancyLoad()
    }

    fancyLoad = () => {
        console.time('image-load')
        const img1 = document.querySelector('.photo')
        img1.addEventListener('load', onLoad)
        function onLoad(){
            console.timeEnd('image-load')
            img1.classList.add('appear')
        }
    }

    getPhoto = () => {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&query=travel&w=1080&h=720`)
        .then(res => {
            console.log(res.data)
            this.props.updateLocation(res.data.location.name, res.data.location.country, res.data.urls.regular)
            if(!res.data.location) {
                this.setState({
                    country: 'Who knows!',
                    photo: res.data.urls.regular,
                    city: 'Who knows!',
                    name: 'Who knows!',
                    width: res.data.width,
                    photographer: res.data.user.name,
                    photographerLink: res.data.links.html
                })
            } else {
                this.setState({
                    photo: res.data.urls.regular,
                    country: res.data.location.country,
                    city: res.data.location.city,
                    name: res.data.location.name,
                    width: res.data.width,
                    photographer: res.data.user.name,
                    photographerLink: res.data.links.html
                })
            }
        })
        this.fancyLoad()
    }

    enterMenu = () => {
        this.props.history.push('/menu')
    }
    goBack = () => {
        this.props.history.push('/landing')
    }

    scroll = () => {
        console.log(document.querySelector('.photo').offsetWidth - document.body.offsetWidth)
        window.scrollTo({
            'behavior': 'smooth',
            'left': document.querySelector('.photo').offsetWidth - document.body.offsetWidth,
        })
    }
            
        render() {

                console.log(this.state.city)
                console.log(this.state.country)
                
                    let arrow = []
                    if(this.state.width >= 320) {
                        arrow.push(<img className="arrow" src={scroll} alt="scroll right" onClick={this.scroll}/>)
                    }
                  

        return(

        <div className="map-bg">

        <Particles style={{
                     width: '100%',
                     minHeight: '100vh',
                     height: "100%",
                     position: "absolute"
                        
                    }}
                        params={particleConfig}                        
                    />

            <div className="photo-info">
                <p className="city">{this.state.city}</p>
                <p className="country">{this.state.country}</p>
                <p className="name">{this.state.name}</p>

                     {arrow}

                <a className="photographer" style={{position: 'absolute', zIndex: 3}} target="_blank" href={this.state.photographerLink}>
                    <p>Photo by<br />{this.state.photographer}</p>
                </a>
                <a className="link" style={{position: 'absolute', zIndex: 3}} target="_blank" href="https://unsplash.com/?utm_source=time_to_travel&utm_medium=referral">
                    <p>Unsplash</p>
                </a>


            </div>
                <div className="menu-enter map">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
                <img className="photo" src={this.state.photo} alt=""/>
            <div>

                <MapBtn className="photo-btn" getPhoto={this.getPhoto}/>
            </div>
        </div>
    

        )
    }
}

export default Map;