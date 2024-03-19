import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './Employee.css';
import Topnav from './Topnav';
import Profile from './profile';
import Welcome from './welcome';
import Recommended from './Recomended';
import copy from '../Assets/Icons/Copyrights text.svg'
import linkedinOutline from '../Assets/Icons/linkedin_grey.svg';
import facebookOutline from '../Assets/Icons/facebook_grey.svg';
import instaOutline from '../Assets/Icons/instagram_grey.svg';
import twitterOutline from '../Assets/Icons/twitter_grey.svg';
import globeOutline from '../Assets/Icons/globe_grey.svg';
import http from "../http-common.js";


class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      mobile: '',
      country: '',
      github: '',
      profilePicture:'',
      category: [],
      active: [],
      applied: [],
      previous: [],
      recommendedJobs: [],
      logout : false
    }
  }

  logout(){
    window.localStorage.clear();
    this.setState({logout : true})
  }

  async componentDidMount(){
    let cookie = window.localStorage.getItem("cookie")

    if(cookie == null){
      this.logout();
      return ;
    }

    http.get('/User',{
      params : {
        type : "Fetch",
        cookie : cookie,
        fields : ["name","email","appliedGigs","pastGigs","activeGigs","profilePicture"]
      }
    })
      .then((response) => {
        console.log(response)
        const status = response.data.status;

        if(status == "Invalid Cookie"){
          this.logout()
        }
        else if (status == "Succesful"){
          let fields = response.data.fields;
          
          this.setState({
            name : fields[0],
            mail : fields[1],
            applied:fields[2],
            previous: fields[3],
            active: fields[4],
            profilePicture : fields[5]
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let reccJobs = this.state.recommendedJobs.map((jobindex) => <Recommended jobIndex={jobindex} valid={true} key={jobindex} />);
    let activeJobs = this.state.active.map((jobindex) => <Recommended jobIndex={jobindex} valid={false} key={jobindex} />);
    let pastJobs = this.state.previous.map((jobindex) => <Recommended jobIndex={jobindex} valid={false} key={jobindex} />);

    return (
      <div>
        {this.state.logout && <Navigate to="/" />}
        <Topnav profilePhoto =  {this.state.profilePicture} />
        <div style={{ margin: '1%', display: 'flex', flexDirection: 'column', overflowY: 'scroll', height: '90vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Profile
              dp={this.state.profilePicture}
              name={this.state.name}
              email={this.state.mail}
              totalGigs={this.state.previous.length}
              activeGigs={this.state.active.length}
            />
            <Welcome name={this.state.name} />
          </div>
          <div className='recommendedBack'>
            <h1 className='recommendedText'>Recommended Jobs</h1>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {reccJobs}
            </div>
          </div>
          <div className='recommendedBack'>
            <h1 className='recommendedText'>Active Jobs</h1>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {activeJobs}
            </div>
          </div>

          <div className='recommendedBack'>
            <h1 className='recommendedText'>Previous Jobs</h1>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {pastJobs}
            </div>
          </div>

          <div className='adContainer'>
            <div style={{ display: "flex", overflowX: 'auto', minHeight: '100%' }}>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px' }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px'  }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px' }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px' }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
            <p style={{ color: 'gray', fontSize: '200%', fontWeight: 'bold' }}>Workezz.</p>
            <img style={{ color: 'gray', fontSize: '100%', paddingLeft: '5%' }} src={copy}></img>
            <img style={{ marginLeft: '62%' }} src={facebookOutline} alt='fb'></img>
            <img style={{ marginLeft: '1%' }} src={linkedinOutline} alt='li'></img>
            <img style={{ marginLeft: '1%' }} src={instaOutline} alt='in'></img>
            <img style={{ marginLeft: '1%' }} src={twitterOutline} alt='tw'></img>
            <img style={{ marginLeft: '1%' }} src={globeOutline} alt='glc'></img>
          </div>
        </div>
        {this.state.logout &&  <Navigate to='' />}
      </div>
    );
  }
}


export default Employee