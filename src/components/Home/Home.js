import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './home.css';
import tardis from './best-tardis-full.svg';
import particleConfig from '../../particlesjs-config.json';

class Home extends Component {

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

                     <div className="home-heading">
                         <h1>TIME TO TRAVEL</h1>
                     </div>
                    <div className="home-tardis-box">
                        <img className="home-tardis" src={tardis} alt="TARDIS"/>
                    </div>

            </div>
        )

    }
}

export default Home;