import React, { Component, createRef } from "react";
import decline from '../Assets/Icons/Decline.svg'
import accept from '../Assets/Icons/Accept.svg'
import './Closepost.css';
import { Link } from 'react-router-dom';

const Applicant = ({ name, email, gigs,index,jobIndex,address }) => {
    let acceptApplicant = async () => {
        
    }
    return (
        <div style={{
            display: 'flex', alignItems: 'center', marginTop: '2%', marginLeft: '2%',
            width: '100%', backgroundColor: '#383838', height: '15vh', borderRadius: '5px'
        }}>
            <img className='closepostappphoto' src={'https://imgs.search.brave.com/-RKMQYQveEErKZAIxitn9pXN5Vd0KLXutUPTlU6okSo/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/TkJ0cXRFM0ZCeHVS/UFZjMW41cWhBSGFK/NCZwaWQ9QXBp'}></img>
            <div>
                
                <p style={{ margin: '0', color: 'white', fontWeight: 'bold' }}>{name}</p>
                <p style={{ margin: '0', color: 'white' }}>{email}</p>
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '0', color: 'white' }}>Total Gigs: </p>
                    <p style={{ margin: '0', marginLeft: '1vh', color: '#69dee6', fontWeight: 'bold' }}>{gigs}</p>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: '5vh', marginLeft: '50vh' }}>
                <button style={{ background: 'none', border: 'none' }}>
                    <img style={{ width: '5vh', height: '5vh', marginInline: '1vh' }} src={decline}></img>
                </button>
                <Link to='/employer'>
                    <button style={{ background: 'none', border: 'none' }} onClick={() => acceptApplicant()}>
                        <img style={{ width: '5vh', height: '5vh', marginInline: '1vh' }} src={accept}></img>
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default Applicant;





