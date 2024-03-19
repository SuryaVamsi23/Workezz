import React, { useState, useEffect, createRef } from 'react';
import TopnavJobs from '../Employeejob/TopnavJobs';
import './Readmore.css';
import pro from '../Assets/Stock Images/img1.jpg';
import like from '../Assets/Icons/heart.svg';
import search from '../Assets/Icons/search.svg';
import job from '../Assets/Stock Images/image 4.png';
import { Navigate, useLocation } from 'react-router-dom';

function Readmore() {
  const location = useLocation();
  const { jobIndex } = location.state;

  const [showConfirmationDialog, setConfimation] = useState(false);
  const [applied, setApplied] = useState(false);
  const [company, setCompany] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [pay, setPay] = useState('');
  const [tit, setTit] = useState('');
  const [duration, setDuration] = useState('');
  const [jobPhoto, setJobPhoto] = useState('');
  const [amIApp, setApp] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  let avatarRef = createRef();

  let moon = async () => {
    setConfimation(false);
    setApplied(true);
  };

  let read = async () => {
    // Fetch job details here and update the state accordingly
    // For example:
    // setCompany(name);
    // setjobDescription(desc);
    // setPay(pay);
    // setDuration(duration);
    // setTit(tit);
    // setJobPhoto(link);
  };

  useEffect(() => {
    read();
  }, []);

  console.log(jobPhoto);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setResumePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <TopnavJobs />
      <div className='readmoreback'>
        <h1 className='readmoreTitle'>{tit} </h1>
        <div className='readmoreSecLine'>
          <div className='readmoreprofilePhoto'>
            <img src={pro} alt='Profile' />
          </div>
          {applied && <Navigate to='/employee/jobs' />}
          <div style={{ fontWeight: 'bold', marginLeft: '1%' }}>
            {company}
          </div>
          <img style={{ marginLeft: '83%' }} src={like} alt='Like' />
          <img style={{ marginLeft: '1%' }} src={search} alt='Search' />
        </div>
        <div className='readmoreThirdLine'>
          <p style={{ width: '50%' }}>{jobDescription}</p>
          <img src={jobPhoto} style={{ width: '30%', marginLeft: '5%' }} alt='Job' />
        </div>
        <div style={{ display: 'flex', marginTop: '2%', marginInline: '3%', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10%' }}>
            <p style={{ margin: 0 }}>Price:</p>
            <p style={{ fontWeight: 'bold', fontSize: '150%', margin: 0 }}>{pay}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10%' }}>
            <p style={{ margin: 0 }}>Duration:</p>
            <p style={{ fontWeight: 'bold', fontSize: '150%', margin: 0 }}>{duration}</p>
          </div>
          {!amIApp && (
            <button className='readmoreApply' onClick={() => setConfimation(true)}>
              <h1 style={{ fontWeight: 'bold', fontSize: '150%' }}>Apply</h1>
            </button>
          )}
        </div>
      </div>

      {showConfirmationDialog && (
        <div className='confirmationPopup'>
          <div>
            <h2>Add your resume? (in image format)</h2>
            
            <input
              id='resume-upload'
              type='file'
              accept='image/*'
              onChange={handleResumeChange}
            />
            {resumePreview && <img src={resumePreview} alt='Resume Preview' />}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button onClick={() => moon()}>Yes</button>
              <button onClick={() => setConfimation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Readmore;
