import React, { Component, createRef } from "react";
import plus from '../Assets/plus.svg';
import heart from '../Assets/heart.svg';
import "./JobCard.css";
import { Link } from 'react-router-dom';


class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            showHeartMessage: false,
            showMoreInfo: false,
            jobPhoto: '',
            profilePhoto: '',
            company: '',
            jobDescription: '',
            tit: ''
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


    render() {
        return (
            <div className='jobCardContainer'>

                <img src= {this.state.jobPhoto}  className={this.state.showMoreInfo ? 'jobPhoto jobPhotoBig' : 'jobPhoto'} />
                <div className='jobinfo'>
                    <div className='firstLine'>
                        <div className='jobprofilePhoto'>
                            <img src={this.state.profilePhoto} alt={this.state.profilePhoto} style={{ width: '100%', height: '100%' }} />
                            
                        </div>
                        <p className='companyText'>
                            {this.state.tit}
                        </p>
                    </div>

                    <p className='secondLine' >
                        {this.state.jobDescription}
                    </p>
                    <div className='buttonContainer'>
                        <div style={{ display: "flex", position: "relative", justifyContent: "flex-start" }}>

                            <button style={{ background: "none", border: "none", margin: "none" }} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>
                                <img src={plus} alt="plus" />
                                {this.state.showMessage && <div className='jobcardplusMessage' >Add to list</div>}
                            </button>
                            <button style={{ backgroundColor: 'black' }} onMouseEnter={this.handleHeartHover}
                                onMouseLeave={this.handleHeartLeave}><img src={heart} alt="like" />
                                {this.state.showHeartMessage && (
                                    <div className='jobcardheartMessage'>
                                        Save to Priority List
                                    </div>
                                )}
                            </button>
                            <div style={{ marginLeft: '65%' }}>
                                <Link to='/employee/jobs/readmore' state = {{jobIndex: this.props.jobIndex}}>
                                    <button style={{ borderRadius: "10%", fontSize: "80%", background: "none", borderColor: "white", color: "white" }}>
                                        Read more
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default JobCard