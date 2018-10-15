import React, { Component } from 'react';
import ReactStreetview from 'react-streetview';
import question from '../who.svg';
import './map.css';


class Map extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            position: {
                lat: 0,
                lng: 0
            }
        }
    }
    componentDidMount() {
        this.getLocation()
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(e => {
            this.setState({
                position: {
                    lat: e.coords.latitude,
                    lng: e.coords.longitude
                }
            })
        })
    }

    render() {
        const googleMapsApiKey = "AIzaSyDkOrf2-xsJyDRcPih8aBJ8z6yAh1R_owU";

        const streetViewPanoramaOptions = {
          position: this.state.position,
          pov: {heading: -80, pitch: 0},
          zoom: 1,
      };
      console.log(this.state.position)
        return(

            <div className="map-bg">
                <div style={{
                    height: '70%',
                    width: '95%',
                    margin: 'auto'
                }}>
                <div className="map-tardis-box">
                    <div className="sv-map">

                    <ReactStreetview
                        apiKey={googleMapsApiKey}
                        streetViewPanoramaOptions={streetViewPanoramaOptions}
                    />
                    <div className="map-question-btn-box" onClick={this.toMap}>
                        <h2 className="map-random-btn-text">WHERE WILL<br /> THE TARDIS<br /> TAKE YOU</h2>
                        <img className="map-question-mark" src={question} alt=""/>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        )
    }
}

export default Map;