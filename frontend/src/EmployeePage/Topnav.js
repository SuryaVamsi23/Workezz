import React, { Component,createRef } from "react";
import "./Topnav.css";
import bell from '../Assets/bell.svg';
import briefcase from "../Assets/briefcase.svg"
import { Link } from 'react-router-dom';
import Notifications from "./Notifications";

class Topnav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false, // new state to show/hide the popup
      profilePhoto : this.props.profilePhoto
    };
    this.popupRef = createRef(); // create ref for the popup
  }

  handleNotificationClick = () => {
    this.setState({ showPopup: true });
  };

  handlePopupClose = () => {
    this.setState({ showPopup: false });
  };

  handleOutsideClick = (event) => {
    if (this.popupRef.current && !this.popupRef.current.contains(event.target)) {
      this.setState({ showPopup: false });
    }
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "left", alignItems: "center", borderBottom: "solid white 2px", paddingBottom: '1%', marginBottom: '2%' ,marginTop:'0.5%'}}>
        <div style={{ paddingLeft: '1%' }}>
          <b style={{ fontSize: '200%', color: "white" }}>Work</b>
          <b style={{ fontSize: '200%', color: "#69DEE6" }}>ezz.</b>
        </div>
        <div style={{ marginLeft: "75%", width: "5%" }}>
          <button style={{
            backgroundColor: "#272727",
            border: "none",
            color: "#69DEE6",
          }} onClick={this.handleStatusChange}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div >
                <Link to='/employer'>
                  <button style={{ backgroundColor: '#272727', color: '#69dee6', border: 'none' }}> Employee</button>
                </Link>
              </div>
            </div>
          </button>
        </div>
        <button className="notification" onClick={this.handleNotificationClick}>
          <img src={bell} />
        </button>
        <Link to='/employee/jobs'>
          <button className="notification">
            <img src={briefcase} />
          </button>
        </Link>
        <div className="profile">
            <img src={this.props.profilePhoto} style={{ width: '100%', height: '100%', }}/>
          <div style={{
            width: "10px",
            height: "10px",
            backgroundColor: "green",
            borderRadius: "50%",
            position: "absolute",
            bottom: "0",
            right: "0"
          }}></div>
        </div>
        {this.state.showPopup && (
          <div ref={this.popupRef} className="notPopup">
            <Notifications />
          </div>
        )}
      </div>
    )
  }
}

export default Topnav;
