import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './landing.css';
// import tardis from '../best-tardis-full.svg';
import question from '../who.svg';
import open from '../../assets/menu-open.svg';
import tardisCutout from './cutout-tardis.svg';
import tardisCutout2 from './cutout-tardis2.svg';
import interior from './interior.png';
import door1 from './door1.svg';
import door2 from './door2.svg';

class Landing extends Component {

    componentDidMount() {
        this.fancyLoad()
    }

    fancyLoad = () => {
        console.time('image-load')
        const tardis = document.querySelector('.landing-tardis')
        const door1 = document.querySelector('.door1')
        const door2 = document.querySelector('.door2')
        const box = document.querySelector('.question-btn-box')
        const interior = document.querySelector('.interior')

        tardis.addEventListener('load', onLoad)
        interior.addEventListener('load', onLoad)
        box.addEventListener('load', onLoad)
        door1.addEventListener('load', onLoad)
        door2.addEventListener('load', onLoad)

        function onLoad(){
            console.timeEnd('image-load')
            box.classList.add('appear')
            door1.classList.add('appear')
            door2.classList.add('appear')
            tardis.classList.add('appear')
            interior.classList.add('appear')

        }
    }

    toMap = () => {
        document.querySelector('.question-btn-box').classList.remove('appear');
        document.querySelector('.door1').classList.add('door1Open');
        document.querySelector('.door2').classList.add('door2Open');
        document.querySelector('.landing-tardis').classList.add('tardis-anim');
        document.querySelector('.interior').classList.add('interior-leave');
        
        console.log('heeeelp')

        setTimeout(() => {
            this.props.history.push('/map');
        }, 9000)

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

                        <div>
                            <img className="landing-tardis" src={tardisCutout2} alt="TARDIS"/>
                            <img className="interior" src={interior} alt=""/>
                            <img className="door1" src={door1} alt="TARDIS"/>
                            <img className="door2" src={door2} alt="TARDIS"/>
                        </div>

                        <p 
                            style={{cursor: 'pointer', position: 'absolute', bottom: '15px', margin: 'auto', fontFamily: 'Futura', color: '#FFF'}} 
                            onClick={this.toInfo}>What am I doing here?
                        </p>

                    </div>


                </div>
        )
    }
}

export default Landing;