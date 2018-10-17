import React, {Component } from 'react';
import ReactStreetview from 'react-streetview';
import question from '../who.svg';


export default class MapBox extends Component{
    constructor(props) {
        super(props) 
        

    }

    // componentWillReceiveProps(props) {
    //     const { refresh } = this.props;

    //     if (!refresh) {
    //       this.locationF()
    //         .then(this.refreshMap)
    //     }
    //   }

    render() {
        console.log('this.props: ', this.props)
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    
    const streetViewPanoramaOptions = {
        position: this.props.position,
        pov: {heading: -80, pitch: 0},
        zoom: 0,
    };

    return (
    <div className="map-tardis-box">
        <div className="sv-map">

        <ReactStreetview
            apiKey={googleMapsApiKey}
            streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
                <div className="map-question-btn-box" onClick={this.props.locationF}>
                    <h2 className="map-random-btn-text">WHERE WILL<br /> THE TARDIS<br /> TAKE YOU</h2>
                    <img className="map-question-mark" src={question} alt=""/>
                </div>
       
        </div>
    </div>
    )

    }
}