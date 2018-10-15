import React, { Component } from 'react';
import ReactStreetview from 'react-streetview';
import mapTardis from './the-one-to-use-2d.svg';
import question from '../who.svg';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './map.css';


class Map extends Component {

    render() {
        const googleMapsApiKey = "AIzaSyDkOrf2-xsJyDRcPih8aBJ8z6yAh1R_owU";

        const streetViewPanoramaOptions = {
          position: {lat: 51.4921374, lng: -0.1928784},
          pov: {heading: -80, pitch: 0},
          zoom: 1,
      };
      
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
            <div>
                <div style={{
                    height: '650px',
                    width: '450px',
                    margin: 'auto'
                }}>
                <div className="map-tardis-box">
                    <div className="sv-map">

                    <ReactStreetview
                        apiKey={googleMapsApiKey}
                        streetViewPanoramaOptions={streetViewPanoramaOptions}
                    />
                    </div>
                        <img className="map-tardis" src={mapTardis} alt=""/>
                        {/* <img className="who" src={question} alt=""/> */}
                </div>

                </div>
                </div>
            </div>

        )
    }
}

export default Map;