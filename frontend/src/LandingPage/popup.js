import "./popup.css"
import CategoryButtons from './CategoryButtons'
import { Link, Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import http from "../http-common.js"
import convertToBase64 from "../image.js";

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      mail: '',
      password: '',
      mobile: '',
      country: 'India',
      github: '',
      category: [],
      created: false,
      errorPhrase: '',
      noError: true,
      imageSrc: '',
      imageFlag: false,
      imageFile: null,
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleSignupPopupClose = () => {
    this.setState({ created: false }); // Set created state to false to close the popup
    this.props.closeSignupPopup(); // Call the closeSignupPopup method passed from HomePage
  };

  handleCategoryChange = (selectedCategories) => {
    this.setState({ category: selectedCategories });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleImageChange = async (e) => {
    const file = e.target.files[0];
    this.setState({
      imageFile: file,
      imageSrc: await convertToBase64(file),
      imageFlag: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  createAccount = (event) => {
    let details = {
      name: this.state.name,
      email: this.state.mail,
      password: this.state.password,
      country: this.state.country,
      interests: this.state.category,
      activeGigs: [],
      appliedGigs: [],
      pastGigs: [],
      linkedin: this.state.github,
      mobile: this.state.mobile,
      profilePicture: this.state.imageSrc
    };

    http.post('/User', details)
      .then((response) => {
        const res = response.data.status;
        console.log(response.data.status);

        if (res !== "Succesful") {
          this.setState({ errorPhrase: res, noError: false });
        } else {
          this.setState({ created: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (this.props.trigger) ? (
      <div className='popup'>
        <div className='popup-inner'>
          <div className='align'>
            <div>
              <h1 className='vertical' style={{ color: '#69DEE6', paddingLeft: '35%' }}> ezz.</h1>
              <h1 className='vertical' style={{ color: 'black', paddingRight: '30%' }}> Work</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div ><text className='nogap' style={{ fontWeight: 'bolder', fontSize: "150%" }} >Create an account</text></div>
              <div><text className='nogap' style={{ fontSize: '80%' }} >Lets get started</text></div>
              <div className='twomargin'><input className="full" type="text" name='name' placeholder="Name " value={this.state.name} onChange={this.handleChange}></input></div>
              <div className='twomargin'><input className="full" type="password" name="password" placeholder="Password " value={this.state.password} onChange={this.handleChange}></input></div>
              <div className='twomargin'><input className="full" type="text" name="mail" placeholder="Mail " value={this.state.mail} onChange={this.handleChange}></input></div>
              <div className='twomargin'>
                <input style={{ width: "47%", marginRight: "3%" }} type="text" name='mobile' placeholder="Mobile " value={this.state.mobile} onChange={this.handleChange}></input>
                <select style={{ width: "47%", paddingTop: '0.8%', paddingBottom: '0.8%' }} name='country' value={this.state.country} onChange={this.handleChange}>
                  <option value="India"> India </option>
                  <option value="Pakistan"> Pakistan </option>
                </select>
              </div>

              <div className='twomargin'>
                <input className='full' type="text" name='github' placeholder="Github Username" value={this.state.github} onChange={this.handleChange} />
              </div>

              <div className="twomargin">
                  <a >Select your profile pic</a>
                  <input
                    className='upload-input'
                    id='upload'
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={this.handleImageChange}
                  />
                  <div className="align">
                {this.state.imageFlag && <img  src={this.state.imageSrc} alt='Thumbnail' style={{ height: '100px' }} />}
                </div>
              </div>

              <CategoryButtons classname='full-margin' update={this.handleCategoryChange} />

              <div style={{ width: "150%" }}>
                <button className='submit-button' name="create" type='submit' onClick={this.createAccount} >Create account</button>
              </div>
              {
                !this.state.noError &&
                <a className='errortext'>{this.state.errorPhrase}</a>
              }
            </form>
            <button className='close-btn' onClick={this.handleSignupPopupClose}>
              X
            </button>
            {this.state.created && this.handleSignupPopupClose()}
          </div>
        </div>
      </div>
    ) : "";
  }
}

export default Popup;