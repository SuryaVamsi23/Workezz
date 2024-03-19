import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import "./loginPopup.css"
import http from "../http-common.js";

class LoginPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      noError: true,
      errorString: '',
      loggedIn: false,
    };
  }
  
  handleLoginPopupClose = () => {
    this.setState({ loggedIn: false }); // Set loggedIn state to false to close the popup
    this.props.closeLoginPopup(); // Call the closeLoginPopup method passed from HomePage
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if(event.target.name != ""){
      return ;
    }

    http.get('/User',{
      params : {
        type : "Login",
        details : [this.state.username,this.state.password]
      }
    })
      .then((response) => {
        console.log(response)
        const status = response.data.status;

        if(status != "Succesful"){
          this.setState({noError : false,errorString : status})
        }else{
          window.localStorage.setItem("cookie",response.data.cookie)
          this.setState({loggedIn : true});
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return this.props.trigger ? (
      <div className='popup'>
        <div className='login-popup-inner'>
          <div className='login-align'>
          <div>
              <h1 className='vertical' style={{ color: '#69DEE6', paddingLeft: '35%' }}> ezz.</h1>
              <h1 className='vertical' style={{ color: 'black', paddingRight: '30%' }}> Work</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
            <div>
              <h1 style={{ color: 'black', paddingLeft: '25%',fontWeight:'bold' }}>Login</h1>
              <div className='twomargin'>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className='twomargin' >
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className='brueh'>
                <button className='login-submit-button' name = "login" type='submit' >Login</button>
              </div>
              {
                !this.state.noError && <div className='errorMessage'><a>{this.state.errorString}</a></div>
              }
              <button className='close-btn' onClick={this.handleLoginPopupClose}>
              X
              </button>
            </div>
            </form>
            {
                this.state.loggedIn && <Navigate to='/employee' />
            }
            
          </div>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default LoginPopup;
