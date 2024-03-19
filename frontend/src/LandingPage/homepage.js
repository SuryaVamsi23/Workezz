import React, { Component } from 'react';
import './homepage.css';
import Popup from './popup';
import LoginPopup from './loginPopup'; // Import the LoginPopup component
import { Link, Route, Navigate } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      signupPopup: false, // Changed the name to signupPopup
      loginPopup: false, // Add a new state for loginPopup
      noError: true,
      errorPhrase: '',
      login: false,
    };
  }

  setSignupPopup = () => this.setState({ signupPopup: true }); // Changed the name to setSignupPopup
  closeSignupPopup = () => this.setState({ signupPopup: false });
  setLoginPopup = () => this.setState({ loginPopup: true }); // Add a new method to setLoginPopup
  closeLoginPopup = () => this.setState({ loginPopup: false }); // method to close the LoginPopup

  render() {
    return (
      <div>
        {/* Circle Shrink-Fade Animation */}
        <div className='circle'></div>

        <div className='prompt'>
          {/* Logo */}
          <div className='logo'>
            <b id='logohead'>Work</b>
            <b>ezz.</b>
          </div>

          {/* Signup Button */}
          <div className='signup'>
            {!this.state.signupPopup ? (
              <button className='signupbutton' onClick={this.setSignupPopup}>
                Create with Metamask
              </button>
            ) : (
              <Popup trigger={this.state.signupPopup} setTrigger={this.setSignupPopup} />
            )}
          </div>

          {/* Login Button */}
          <div className='login'>
            <div className='logintext'>Already have an account?</div>
            <button className='loginbutton' onClick={this.setLoginPopup}>
              Login
            </button>
          </div>
        </div>

        {this.state.signupPopup && <Popup trigger={this.state.signupPopup} />}

        {this.state.signupPopup && (
          <Popup trigger={this.state.signupPopup} closeSignupPopup={this.closeSignupPopup} />
        )}

        {/* Render the LoginPopup when loginPopup state is true */}
        {this.state.loginPopup && <LoginPopup trigger={this.state.loginPopup} />}

        {this.state.loginPopup && (
          <LoginPopup trigger={this.state.loginPopup} closeLoginPopup={this.closeLoginPopup} />
        )}
      </div>
    );
  }
}

export default HomePage;
