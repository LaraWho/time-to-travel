import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './landing.css';
import tardis from '../best-tardis-full.svg';
import question from '../who.svg';
import open from '../../assets/menu-open.svg';

class Landing extends Component {

    componentDidMount() {
        this.fancyLoad()
    }

    fancyLoad = () => {
        console.time('image-load')
        const tardis = document.querySelector('.landing-tardis')
        const box = document.querySelector('.question-btn-box')

        tardis.addEventListener('load', onLoad)
        box.addEventListener('load', onLoad)

        function onLoad(){
            console.timeEnd('image-load')
            tardis.classList.add('appear')
            box.classList.add('appear')
        }
    }

    toMap = () => {
        this.props.history.push('/map');
    }

    toMenu = () => {
        this.props.history.push('/notebookmenu');
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
                    
                    <div className="landing-enter">
                        <p>TIME TO<br />TRAVEL</p>
                        <img src={open} onClick={this.toMenu} alt="enter-menu"/>
                    </div>

                    <div className="landing-tardis-box">
                    <div className="question-btn-box" onClick={this.toMap}>
                        <h2 className="random-btn-text">WHERE WILL<br /> THE TARDIS<br /> TAKE YOU</h2>
                        <img className="question-mark" src={question} alt=""/>
                    </div>
                        <img className="landing-tardis" src={tardis} alt="TARDIS"/>
                        <p style={{cursor: 'pointer', position: 'absolute', bottom: '15px', margin: 'auto', fontFamily: 'Futura', color: '#FFF'}} onClick={this.toInfo}>What am I doing here?</p>

                    </div>


                </div>
        )
    }
}

export default Landing;