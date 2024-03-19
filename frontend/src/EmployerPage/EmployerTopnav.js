import React, { Component, useState,createRef } from "react";
import "./EmployerTopnav.css";
import bell from '../Assets/bell.svg';
import briefcase from "../Assets/briefcase.svg"
import { Link } from 'react-router-dom';
import Notifications from "../EmployeePage/Notifications";


class EmployerTopnav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false, // new state to show/hide the popup
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
      <div style={{ display: "flex", justifyContent: "left", alignItems: "center",borderBottom: "solid white 2px",paddingBottom:'1%',marginBottom:'2%' }}>
        <Link to='/employer'>
            <button style={{ backgroundColor: 'transparent', border: 'none' }}>
              <b style={{ fontSize: '200%', color: "white" }}>Work</b>
              <b style={{ fontSize: '200%', color: "#69DEE6" }}>ezz.</b>
            </button>
          </Link>
        <div style={{ marginLeft: "73%",marginRight:'1%'}}>
          <button style={{
            backgroundColor: "#272727",
            border: "none",
            color: "#69DEE6",
          }} onClick={this.handleStatusChange}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div >
                <Link to='/employee'>
                <button style={{backgroundColor:'#272727',color:'#69dee6',border:'none'}}> Employer</button>
                </Link>
              </div>
            </div>
          </button>
        </div>
        <button className="empnotification" onClick={this.handleNotificationClick}>
          <img src={bell} />
        </button>
        <button className="empprofile">
          <img src={briefcase} />
          <div style={{
            width: "10px",
            height: "10px",
            backgroundColor: "green",
            borderRadius: "50%",
            position: "absolute",
            bottom: "0",
            right: "0"
          }}></div>
        </button>
        {this.state.showPopup && (
          <div ref={this.popupRef} className="notPopup">
            <Notifications/>
          </div>
        )}
      </div>
    )
  }
}

export default EmployerTopnav;
