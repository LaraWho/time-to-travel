import React, { Component } from 'react';
import './map.css';
import axios from 'axios';
import MapBtn from './MapBtn';
import open from '../../assets/menu-open.svg';
import ReactStreetview from 'react-streetview';
import StreetView from 'react-google-map-street-view';

class Map extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            position: {
                lat: 0,
                lng: 0
            }
            // lat: 0,
            // lng: 0
        }

        // this.newView = this.newView.bind(this)
    }
   
    componentDidMount() {
        console.log('componentDidMount should be doing its thing')
        navigator.geolocation.getCurrentPosition(e => {
        console.log('componentDidMount: ', e.coords)

                this.setState({
                    position: {
                        lat: e.coords.latitude,
                        lng: e.coords.longitude
                    }
            // }, this.newView)
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
            //   position: {
                  lat: Number(location.data.data.latitude),
                  lng: Number(location.data.data.longitude)
            //   }
          }, this.newView)
        }).catch((err) => {
            console.log(err)
        })
      }

    //   componentDidUpdate(...args){
        //   console.log('streetview ref: ', this.refs.streetview)
        //   this.refs.streetview.updater.enqueueForceUpdate();
        //   let newStreetView = this.refs.streetview.cloneNode(true);
        //   this.refs.streetview.parentNode.replaceChild(newStreetView, this.refs.streetview)
    //   }

    enterMenu = () => {
        this.props.history.push('/menu')
    }
    goBack = () => {
        this.props.history.push('/landing')
    }

    // newView = () => {
    //     console.log('newView firing')
    //     const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        
    //     const { lat, lng } = this.state
    //     const streetViewPanoramaOptions = {
    //         position: {lat, lng},
    //         pov: {heading: -80, pitch: 0},
    //         zoom: 0,
    //     };
    //     let view = <ReactStreetview
    //         ref='streetview'
    //             apiKey={googleMapsApiKey}
    //             streetViewPanoramaOptions={streetViewPanoramaOptions}
    //             />
    //             return view
    //         }
            
            render() {
                // console.log(this.refs.streetview)
        console.log('this.state.lat: ', this.state.lat)
        console.log('this.state.lng: ', this.state.lng)
       
        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

        let num = Math.floor(Math.random()*90000) + 10000
        console.log(num)
       
        return(

    <div className="map-bg">
        <div style={{
                    height: '70%',
                    width: '95%',
                    margin: 'auto'
                }}>
            <div className="map-tardis-box">
                <div className="menu-enter map">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
                </div>
            <div className="sv-map">
                
                {/* {this.newView()} */}
                {/* <StreetView zip={'Provo'} APIkey={googleMapsApiKey} streetView={true} zoomLevel={15}/> */}

                
            
                {/* <RenderReactStreetView apiKey={googleMapsApiKey} options={streetViewPanoramaOptions}/> */}
                <MapBtn getLocation={this.getLocation}/>

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