import React, { useEffect, useState, Component } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import EmployerTopnav from '../EmployerPage/EmployerTopnav'
import './Closepost.css'
import jobphoto from '../Assets/Stock Images/image 4.png'
import profilephoto from '../Assets/Stock Images/img1.jpg'

function Closepost() {

    const location = useLocation()
    const { jobIndex } = location.state


    const [company, setCompany] = useState('');
    const [jobDescription, setjobDescription] = useState('');
    const [pay, setPay] = useState('');
    const [duration, setDuration] = useState('');
    const [tit, setTit] = useState('');
    const [cats, setjobCats] = useState([]);
    const [applecants, setApples] = useState([]);
    const [appleDetails, setDetails] = useState([]);
    const [myMap, setMyMap] = useState(new Map());
    const [appliedStatus, setStat] = useState(false);
    const [dispName, setName] = useState('');
    const [redStat, setRend] = useState(true);

    let read = async () => {
        
        // setCompany(name);
        // setjobDescription(desc);
        // setPay(pay);
        // setDuration(duration);
        // setTit(tit);
        // setjobCats(await contractJobs.methods.getInterest(jobIndex).call({ from: accounts[0] }))
        // setApples(app);
        // setDetails(await contractJobs.methods.returnAppDetails(jobIndex, userAddress).call({ from: accounts[0] }));
        // console.log(appleDetails)
        // setMyMap(appleDetails.map((details) => <Applicant name={details[0]} email={details[1]} gigs={details[2]} index={details[4]} jobIndex={jobIndex} address={details[3]} key={details[3]} />));
        // setStat(await contractJobs.methods.getApplicationStat(jobIndex).call({ from: accounts[0] }));
        // setName(await contractJobs.methods.getWorkerName(jobIndex, userAddress).call({ from: accounts[0] }));
        // setRend(await contractJobs.methods.getRenderStat(jobIndex).call({from:accounts[0]}))
    }   

    let closePost = async () => {
        
        //setRend(await contractJobs.methods.getRenderStat(jobIndex).call({from:accounts[0]}))
    }

    useEffect(() => {
        read()
    });

    return (
        <div >
            <EmployerTopnav />
            <div className='comple'>
                <div className='Lefthalf'>
                    <div style={{ display: 'flex' }}>
                        <img className='closepostjobphoto' src={jobphoto}></img>
                        <div>
                            <p className='closepostjobname'> {tit} </p>
                            <p className='closepostjobdes'> {jobDescription}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <p className='closepostpay'> Pay: </p>
                            <p className='closepostmoney'>{pay}</p>
                        </div>
                        <div style={{ color: 'white', marginLeft: '30%' }}>
                            <p className='closepostpay'> Duration: </p>
                            <p className='closepostmoney'>{duration} months</p>
                        </div>
                    </div>
                    <div style={{ borderBottom: '1px solid gray' }}>
                        <p className='closepostpay'> Tags/Category: </p>
                        <p className='closepostcat'>{cats}</p>
                    </div>
                    {appliedStatus &&
                        <div style={{ color: 'white' }} >
                            <p style={{ marginLeft: '2vh' }}>Recruited Employee</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginLeft: '2vh', display: 'flex' }}>
                                    <img className='closepostrecphoto' src={profilephoto}></img>
                                    <p style={{ fontWeight: 'bold', marginTop: '1vh' }}>{dispName}</p>
                                </div>
                            </div>

                        </div>
                    }
                    {redStat &&
                        <Link to="/employer">
                            <button style={{ backgroundColor: '#69dee6', fontWeight: 'bolder', fontSize: '250%', border: 'none', borderRadius: '10px' }} onClick={() => closePost()}>
                                Close Post
                            </button>
                        </Link>
                    }
                </div>
                {!appliedStatus &&
                    <div className='Righthalf'>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                            <h1 style={{ color: 'white', fontWeight: 'bolder' }}>List of Applicants</h1>
                        </div>
                    /* you need to pass the Apllicants details */
                        <div style={{ height: '70vh', overflowY: 'scroll' }}>
                            {myMap}
                        </div>
                    </div>
                }
                {appliedStatus &&
                    <div className='Righthalf'>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                            <h1 style={{ color: 'white', fontWeight: 'bolder' }}>Applicant Already Selected</h1>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Closepost