import React from 'react';
import info from './infographic.svg';

export default function Infographic(props) {
    return (
    
                <div className="info-g-bg" style={{backgroundColor: '#0563B6', height: '100vh', width: '100%'}}>
                    <img src={info} style={{height: '100vh', width: 'auto', margin: 'auto'}} alt="infographic"/>
                    <p onClick={props.history.goBack}
                    style={{position: 'absolute', bottom: '20px', left: '40px', fontFamily: 'Futura', color: '#FFF', textAlign: 'center'}}
                    >GO BACK<br />TO THE FUN</p>
                </div>
       
     
    )

}
