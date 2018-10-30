import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './landing.css';
// import tardis from '../best-tardis-full.svg';
import question from '../who.svg';
import open from '../../assets/menu-open.svg';
import tardisCutout from './cutout-tardis.svg';
// import tardisCutout2 from './cutout-tardis2.svg';
import door1 from './door1.svg';
import door2 from './door2.svg';
import geronimo from './geronimo.mp3';

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audio: false
        }
    }

    componentDidMount() {
        this.fancyLoad()
    }

    fancyLoad = () => {
        console.time('image-load')
        const tardis = document.querySelector('.landing-tardis')
        const tardisBox = document.querySelector('.landing-tardis-box')
        const door1 = document.querySelector('.door1')
        const door2 = document.querySelector('.door2')
        const box = document.querySelector('.question-btn-box')

        tardis.addEventListener('load', onLoad)
        tardisBox.addEventListener('load', onLoad)
        box.addEventListener('load', onLoad)
        door1.addEventListener('load', onLoad)
        door2.addEventListener('load', onLoad)

        function onLoad(){
            console.timeEnd('image-load')
            box.classList.add('appear')
            door1.classList.add('appear')
            door2.classList.add('appear')
            tardis.classList.add('appear')
            tardisBox.classList.add('appear')

        }
    }

    toMap = () => {
        document.querySelector('.info-btn').classList.add('leave');
        document.querySelector('.landing-enter').classList.add('leave');
        // document.querySelector('.question-btn-box').classList.remove('appear');
        document.querySelector('.question-btn-box').classList.add('leave');

        document.querySelector('.door1').classList.add('door1Open');
        document.querySelector('.door2').classList.add('door2Open');
        document.querySelector('.landing-tardis.appear').classList.add('scale');
        this.setState({
            audio: true
        })

        setTimeout(() => {
            this.props.history.push('/map');
        }, 4000)
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

                        <div className="tardis-anim-box" style={{width: '400px'}}>
                            <img className="landing-tardis" src={tardisCutout} alt="TARDIS"/>
                            <img className="door1" src={door1} alt="TARDIS"/>
                            <img className="door2" src={door2} alt="TARDIS"/>
                        </div>

                        <p  className="info-btn"
                            style={{cursor: 'pointer', position: 'absolute', bottom: '15px', margin: 'auto', fontFamily: 'Futura', color: '#FFF'}} 
                            onClick={this.toInfo}>What am I doing here?
                        </p>

                    </div>

    {this.state.audio ? 
            <div className="audio-player">
            <audio src={geronimo} type="audio/mp3" autoPlay></audio>
            </div> :
        null
    }

                </div>
        )
    }
}

export default Landing;