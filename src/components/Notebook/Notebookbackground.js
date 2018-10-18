import React, { Component } from 'react';
import './notebookbackground.css';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import one from './bg-images/1.jpeg';
import two from './bg-images/2.jpeg';
import three from './bg-images/3.jpeg';
import four from './bg-images/4.jpeg';
import five from './bg-images/5.jpeg';
import six from './bg-images/6.jpeg';
import seven from './bg-images/7.jpeg';
import eight from './bg-images/8.jpeg';
import nine from './bg-images/9.jpeg';
import ten from './bg-images/10.jpeg';
import eleven from './bg-images/11.jpeg';
import twelve from './bg-images/12.jpeg';


class NotebookBackground extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bgImage: ''
        }
    }
    componentDidMount() {
        this.bgChanger()
    }

   
    bgChanger = () => {
        let imgArray = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve]
        let num = Math.ceil(Math.random() * imgArray.length)
        this.setState({
            bgImage: './bg-images/' + num + '.jpeg'
        })
    }
    
    render() {
        console.log(this.state.bgImage)
        
        return(
            <div className="book-body">
            

                    <Particles style={{
                        width: '100%',
                        minHeight: '100vh',
                        height: "100%",
                        position: "absolute"
                        
                    }}
                        params={particleConfig}                        
                    />
                    
                <div className="note-bg" style={{
                    backgroundImage: `url(${this.state.bgImage})`,
                    // width: '100%',
                    // minHeight: '100vh',
                    // height: "100%",
                    // position: "absolute"
                }}>
               
            </div>
        </div>
        )
    }
}

export default NotebookBackground;