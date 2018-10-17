import React, { Component } from 'react';
import './map.css';
import axios from 'axios';
import MapBox from './MapBox';
import open from '../../assets/menu-open.svg';


class Map extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            position: {
                lat: 0,
                lng: 0
            },
            refreshMap: false
        }
    }
   
    componentDidMount() {
        // navigator.geolocation.getCurrentPosition(e => {
            axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(e => {
        console.log('e.data.location in DidMount: ', e.data.location)
                this.setState({
                    position: {
                        lat: e.data.location.lat,
                        lng: e.data.location.lng
                    }
            })
            }).catch((err) => {
                console.log(err)
            })
        // })
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
        //   this.refreshMap()
        // MapBox.forceUpdate()
        }).catch((err) => {
            console.log(err)
        })
      }

      refreshMap = () => 
        this.setState({
            refreshMap: true
        })

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

    render() {
       
        return(

            <div className="map-bg">
                <div style={{
                    height: '70%',
                    width: '95%',
                    margin: 'auto'
                }}>
                <MapBox position={this.state.position} locationF={this.getLocation} refresh={this.refreshMap}/>
            {/* <RenderReactStreetView apiKey={googleMapsApiKey} options={streetViewPanoramaOptions}/> */}
                
                <div className="menu-enter map">
                    <p onClick={this.goBack}>TIME TO<br />TRAVEL</p>
                    <img src={open} onClick={this.enterMenu} alt="enter menu"/>
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