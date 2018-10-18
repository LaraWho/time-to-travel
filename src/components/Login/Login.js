import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './login.css';
import Media from "react-media";
import axios from 'axios';
import sweetie from 'sweetalert2';

class Login extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            username: '',
            password: '',
            userId: ''
        }
    }

    // componentDidMount() {
    //     this.getUser()
    // }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    toLanding = () => {
        this.props.history.push('/landing');
    }

    // getUser = () => {
    //     console.log('getuser in login.js')
    //     axios.get('/api/user')
    //     .then(res => {
    //         this.setState({
    //             username: res.data.username,
    //             password: res.data.password
    //         })
    //     }).catch(err => console.log(err))
    // }

    handleLoginRequest = (e) => {
        axios.post('/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            console.log('res.data: ', res.data)
           
            setTimeout(() => {
                this.props.history.push('/landing');
                }, 500)
        }).catch(() => sweetie("Please Register, you don't seem to exist yet!"))
    }

    handleRegister = (e) => {
            axios.post('/auth/register', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            console.log(res.data[0])
            setTimeout(() => {
            this.props.history.push('/landing');
            }, 500)
        }).catch(err => console.log(err))
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

                    <Media query="(min-width: 920px)">
                            {matches =>
                            matches ? (
                            <div className="login-heading">
                                <h1>TIME TO TRAVEL</h1>
                            </div>

                            ) : (
                            <div className="login-heading">
                                <h1>TIME TO<br />TRAVEL</h1>
                            </div>
                            )}
                        </Media>

                    

                <div className="login-box">
                    <div className="login-text">
                        <div >
                            <input className="username" type="text" placeholder="USERNAME"
                            onChange={this.handleUsername} />
                        </div>
                        <div >
                            <input className="password" type="password" placeholder="PASSWORD"
                            onChange={this.handlePassword}/>
                        </div>
                        <div className="login-btn"
                        onClick={this.handleLoginRequest}>
                            <p>LOGIN</p>
                        </div>
                        <div className="or-text">
                            <p>OR</p>
                        </div>
                        <div className="register-btn"
                        onClick={this.handleRegister}>
                            <p>REGISTER</p>
                        </div>
                    </div>
                </div>


                </div>
        )
    }
}

export default Login;