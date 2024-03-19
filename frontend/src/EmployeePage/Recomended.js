import React, { Component, createRef } from "react";
import plus from '../Assets/plus.svg';
import heart from '../Assets/heart.svg';
import './Recommended.css';
import { Link } from 'react-router-dom';
import http from '../http-common.js';

class Recommended extends Component {
    constructor(props) {
        super(props);  
          
        this.state = {
            showMessage: false,
            showHeartMessage: false,
            jobPhoto:'',
            profilePhoto:'',
            company:'Fake Company',
            jobDescription:'This is a Fake Job',
            isOwner:""
        };
    }

    handleHover = () => {
        this.setState({ showMessage: true });
    };

    handleLeave = () => {
        this.setState({ showMessage: false });
    };

    handleHeartHover = () => {
        this.setState({ showHeartMessage: true });
    };

    handleHeartLeave = () => {
        this.setState({ showHeartMessage: false });
    };

    async componentDidMount() {
        let token = window.localStorage.getItem('cookie');

        http.get('/Jobs',{
            params : {
              type : "Fetch",
              jobID: this.props.jobIndex,
              cookie : token,
              fields : ["jobPicture","jobTitle","description","isOwner"]
            }
          })
            .then((response) => {
                console.log(response)
                const status = response.data.status;

                if(status == "Succesful"){
                    let fields = response.data.fields;
                    this.setState({
                        jobIndex : fields[0],
                        company : fields[1],
                        jobDescription : fields[2],
                        isOwner : fields[3]
                    });
                }
              }
            )
            .catch((error) => {
              console.log(error);
            });
    }
    
    
    render() {
        return (
            <div className='recommendedContainer'>
                <img src={this.state.jobPhoto} style={{ width: '100%', height: '100px' }} />
                <div style={{ paddingRight: '5%' }}>
                    <div className='companyContainer'>
                        <div className='profilePhoto'>
                            <img src={this.state.profilePhoto}  style={{ width: '100%', height: '100%' }} />
                            {/* <div ref={this.avatarRef} /> */}
                        </div>
                        <p className='companyText'>
                            {this.state.company}
                        </p>
                    </div>
                    <p className='jobDescription'>
                        {this.state.jobDescription}
                    </p>
                    <div style={{ position: 'relative' }}>
                        <button
                            style={{ backgroundColor: 'black' }}
                            onMouseEnter={this.handleHover}
                            onMouseLeave={this.handleLeave}
                        >
                            <img src={plus} alt="plus" />
                        </button>
                        {this.state.showMessage && (
                            <div className='plusMessage'>
                                Save to List
                            </div>
                        )}

                        <button style={{ backgroundColor: 'black' }} onMouseEnter={this.handleHeartHover}
                            onMouseLeave={this.handleHeartLeave}><img src={heart} alt="like" />
                            {this.state.showHeartMessage && (
                                <div className='heartMessage'>
                                    Save to Priority List
                                </div>
                            )}
                        </button>
                        <Link to= {this.state.isOwner} state={{ jobIndex : this.props.jobIndex, valid : this.props.valid}}>
                            <button className='readMoreButton' >Read more</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recommended;



