import React, { Component } from 'react';
import './map.css';
import axios from 'axios';
import MapBtn from './MapBtn';
import open from '../../assets/menu-open.svg';
import particleConfig from '../../particlesjs-config.json';
import Particles from 'react-particles-js';
import scroll from './next-icon.svg';
import scrollLeft from './left.svg';


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
           photographerLink: '',
           showLeft: false
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
            const width = this.pictureContainer.offsetWidth
            if(!res.data.location) {
                this.setState({
                    country: 'In some country',
                    photo: res.data.urls.regular,
                    city: 'Some city',
                    name: 'I am out of specifics!',
                    photographer: res.data.user.name,
                    photographerLink: res.data.links.html,
                    width: width
                })
            } else {
                this.setState({
                    photo: res.data.urls.regular,
                    country: res.data.location.country,
                    city: res.data.location.city,
                    name: res.data.location.name,
                    photographer: res.data.user.name,
                    photographerLink: res.data.links.html,
                    width: width
                    
                })
            }
            this.props.updateLocation(this.state.name, this.state.country, this.state.photo)
            // console.log('this.state.name, this.state.country, this.state.photo', this.state.name, this.state.country, this.state.photo)
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
        this.pictureContainer.scrollTo({
            'behavior': 'smooth',
            'left': document.querySelector('.photo').offsetWidth,
        })
        this.setState({
            showLeft: true
        })
    }

    scrollLeft = () => {
        this.pictureContainer.scrollTo({
            'behavior': 'smooth',
            'left': -document.querySelector('.photo').offsetWidth,
        })
        this.setState({
            showLeft: false
        })
    }
            
        render() {
                // console.log(this.state.city)
                // console.log(this.state.country)

                
                let arrow = []
                if(this.state.width >= 320) {
                    {!this.state.showLeft ?
                        arrow.push(<img className="arrow" src={scroll} key={arrow} alt="scroll right" onClick={this.scroll}/>)
                    :
                        arrow.push(<img className="left-arrow" src={scrollLeft} key={arrow} alt="scroll left" onClick={this.scrollLeft}/>)
                    }
                }
                
                return(

        <div className="map-bg" style={{overflow: 'auto', width: '100vw'}} ref={(el) => (this.pictureContainer = el)}>

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

                <a className="photographer" style={{position: 'absolute', zIndex: 3}} target="_blank" rel="noopener noreferrer" href={this.state.photographerLink}>
                    <p>Photo by<br />{this.state.photographer}</p>
                </a>
                <a className="link" style={{position: 'absolute', zIndex: 3}} target="_blank" rel="noopener noreferrer" href="https://unsplash.com/?utm_source=time_to_travel&utm_medium=referral">
                    <p>Unsplash</p>
                </a>


            </div>
                <div className="menu-enter map" >
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
                <img className="photo" src={this.state.photo}   alt=""/>
            <div>

                <MapBtn className="photo-btn" getPhoto={this.getPhoto}/>
            </div>
        </div>
    

        )
    }
}

export default Map;