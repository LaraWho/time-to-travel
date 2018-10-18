import React from 'react';
import question from '../who.svg';


export default function MapBox(props) {
    return (
    
                <div className="map-question-btn-box" onClick={props.getLocation}>
                    <h2 className="map-random-btn-text">WHERE WILL<br /> THE TARDIS<br /> TAKE YOU</h2>
                    <img className="map-question-mark" src={question} alt=""/>
                </div>
       
     
    )

}
