import React, { Component } from 'react';
import title from './TITLE.svg';
import one from './keytext.svg';
import two from './2and4.svg';
import three from './menutext.svg';
import tardis from './tardisquote.svg';
import './infographic.css';

class Infographic extends Component {
   
            componentDidMount() {
                this.fancyLoad()
            }

    fancyLoad = () => {
        console.time('image-load')
        const title = document.querySelector('.title')
        const one = document.querySelector('.one')
        const two = document.querySelector('.two')
        const three = document.querySelector('.three')
        const tardis = document.querySelector('.tardis')
        
        title.addEventListener('load', onLoad)
        one.addEventListener('load', onLoad)
        two.addEventListener('load', onLoad)
        three.addEventListener('load', onLoad)
        tardis.addEventListener('load', onLoad)

        function onLoad(){
            console.timeEnd('image-load')
            title.classList.add('appear')
            one.classList.add('appear')
            two.classList.add('appear')
            three.classList.add('appear')
            tardis.classList.add('appear')

        }
    }
    
    render() {
            return (
                <div className="info-g-bg">
                    
                        <img src={title} className="title" alt="welcome to the tardis"/>
                        <img src={one} className="one" alt=""/>
                        <img src={two} className="two" alt=""/>
                        <img src={three} className="three" alt=""/>
                        <img src={tardis} className="tardis" alt=""/> 
                        
                    <p onClick={this.props.history.goBack} className="back-btn"
                    style={{position: 'absolute', bottom: '16px', left: '24px', fontFamily: 'Futura', color: '#FFF', textAlign: 'center', cursor: 'pointer'}}
                    >GO BACK<br />TO THE FUN</p>

                </div>
               
        
            )
    }

}

export default Infographic;
