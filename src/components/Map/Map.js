import React, { Component } from 'react';
import ReactStreetview from 'react-streetview';
import question from '../who.svg';
import './map.css';
import axios from 'axios';


class Map extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            position: {
                lat: 28.5383355,
                lng: -81.3792365
            }
        }
    }
   
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(e => {
            this.setState({
                position: {
                    lat: e.coords.latitude,
                    lng: e.coords.longitude
                }
            })
        })
    }
    
    getLocation = () => {
        let min = 4167147;
        let max = 4167147;
        let geonameid = Math.floor(Math.random() * (max - min + 1)) + min;
        // let geonameid = Math.floor(Math.random()*9000000) + 10000;
    
        axios.get(`https://${process.env.REACT_APP_X_API_KEY}@www.budgetyourtrip.com/api/v3/locations/${geonameid}`)
        .then(location => {
          this.setState({
              position: {
                  lat: Number(location.data.data.latitude),
                  lng: Number(location.data.data.longitude)
              }
          })
        //   this.forceUpdate()         
        }).catch((err) => {
            console.log(err)
        })
      }

      componentDidUpdate(...args){
          console.log('streetview ref: ', this.refs.streetview)
        //   this.refs.streetview.updater.enqueueForceUpdate();
        //   let newStreetView = this.refs.streetview.cloneNode(true);
        //   this.refs.streetview.parentNode.replaceChild(newStreetView, this.refs.streetview)
      }
    render() {
        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

        const streetViewPanoramaOptions = {
          position: this.state.position,
          pov: {heading: -80, pitch: 0},
          zoom: 0,
      };
      console.log(this.state.position)
      console.log(streetViewPanoramaOptions)
      
        return(

            <div className="map-bg">
                <div style={{
                    height: '70%',
                    width: '95%',
                    margin: 'auto'
                }}>
                <div className="map-tardis-box">
                    <div className="sv-map">

                    <ReactStreetview ref="streetview"
                        apiKey={googleMapsApiKey}
                        streetViewPanoramaOptions={streetViewPanoramaOptions}
                    />
                    {/* <RenderReactStreetView apiKey={googleMapsApiKey} options={streetViewPanoramaOptions}/> */}
                    <div className="map-question-btn-box" onClick={this.getLocation}>
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


// function RenderReactStreetView({apiKey, options}){
//     console.log('rendering street view')
//     return <ReactStreetview
//     apiKey={apiKey} streetViewPanoramaOptions={options}/>
// }