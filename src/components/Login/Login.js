import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './login.css';


class Login extends Component {

    toLanding = () => {
        this.props.history.push('/landing');
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

                    <div className="home-heading">
                         <h1>TIME TO TRAVEL</h1>
                     </div>

                <div className="login-box">
                    <div className="login-text">
                        <div >
                            <input className="username" type="text" placeholder="USERNAME" />
                        </div>
                        <div >
                            <input className="password" type="text" placeholder="PASSWORD"/>
                        </div>
                        <div className="login-btn">
                            <p>LOGIN</p>
                        </div>
                        <div className="or-text">
                            <p>OR</p>
                        </div>
                        <div className="register-btn">
                            <p>REGISTER</p>
                        </div>
                    </div>
                </div>


                </div>
        )
    }
}

export default Login;