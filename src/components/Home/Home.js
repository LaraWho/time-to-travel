import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './home.css';
import tardis from '../best-tardis-full.svg';
import key from '../../assets/tardis-key.svg';
import tardisSound from '../../assets/tardis-landing.mp3';
import Media from "react-media";
import { Link } from 'react-router-dom'

class Home extends Component {


    enter = () => {
        this.props.history.push('/login')
    }

    toInfo = () => {
        this.props.history.push('/info')
    }

    render() {
        return(

            <div className="space-bg">

                 <Particles style={{
                     width: '100%',
                     minHeight: '100vh',
                     height: "100%",
                     position: "absolute"
                        
                    }}
                        params={particleConfig}                        
                    />

                    <Media query="(min-width: 920px)">
                            {matches =>
                            matches ? (
                            <div className="home-heading">
                                <h1>TIME TO TRAVEL</h1>
                            </div>
                            ) : (
                            <div className="home-heading">
                                <h1>TIME TO<br />TRAVEL</h1>
                            </div>
                            )}
                    </Media>

                    
                    <div className="home-tardis-box">
                        <img className="home-tardis" src={tardis} alt="TARDIS"/>
                        <div className="button">
                            <img onClick={this.enter} src={key} alt="enter button"/>
                        </div>
                        <p style={{cursor: 'pointer', position: 'absolute', bottom: '20px', margin: 'auto', fontFamily: 'Futura', color: '#FFF'}} onClick={this.toInfo}>What am I doing here?</p>
                    </div>

                    <div className="audio-player">
                        <audio src={tardisSound} type="audio/mp3" autoPlay></audio>
                    </div>

            </div>
        )

    }
}

export default Home;