import React, { Component } from 'react';
import title from './TITLE.svg';
import one from './keytext.svg';
import two from './2and4.svg';
import three from './menutext.svg';
import tardis from './tardisquote.svg';
import './infographic.css';

class Infographic extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         size: 0
    //     }
    // }
            componentDidMount() {
                this.fancyLoad()
            }

    //         getSize = () => {
                
    //             this.setState({
    //                 size: window.innerWidth
    //             })
    //         }

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
                //     <img src={title} className="title" alt="welcome to the tardis"/>
                //     <img src={one} className="one" alt=""/>
                //     <img src={two} className="two" alt=""/>
                //     <img src={four} className="four" alt=""/>
                //     <img src={tardis} className="tardis" alt=""/>                    
                            
                //     <p onClick={this.props.history.goBack} className="back-btn"
                //     style={{position: 'absolute', bottom: '28px', left: '24px', fontFamily: 'Futura', color: '#FFF', textAlign: 'center'}}
                //     >GO BACK<br />TO THE FUN</p>
        
                // </div>
        
        
            )

        // } else if(this.state.size > 320) {
        //     console.log('size', this.state.size)
            
        //     return(
            // <div className="info-g-bg" style={{backgroundColor: '#6F8EA9', height: '100vh', width: '100%'}}>
        
            //         {/* <img src={title} style={{position: 'relative', bottom: '10px', top: '10px', left: '6%'}} alt="welcome to the tardis"/>
            //         <img src={one} style={{position: 'absolute', right: '8px', top: '100px'}} alt=""/>
            //         <img src={two} style={{position: 'relative', left: '12px', top: '24px'}} alt=""/>
            //         <img src={four} style={{position: 'absolute', right: '15px', top: '210px'}} alt=""/>
            //         <img src={tardis} style={{position: 'relative', top: '95px', right: '-18px'}} alt=""/>                    
            //                  */}
            //         <p onClick={this.props.history.goBack}
            //         style={{position: 'absolute', bottom: '16px', left: '24px', fontFamily: 'Futura', color: '#FFF', textAlign: 'center'}}
            //         >GO BACK<br />TO THE FUN</p>
        
            //     </div>
        //     )
        // }
    }

}

export default Infographic;
