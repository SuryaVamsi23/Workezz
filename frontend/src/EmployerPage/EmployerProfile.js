import mail from '../Assets/mail.svg';
import './EmployerProfile.css';

const EmployerProfile = ({ name, email, totalGigs, activeGigs }) => {
  
  return(
  <div>
    <div className='back'>
      <div className='profilepic'>
        <img src={""} alt={name} style={{ width: '100%', height: '100%' }} />
        
      </div>
      <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <p style={{ fontWeight: 'bold', color: '#69Dee6' }}>{name}</p>
        <hr className='line'/>
        <div style={{ alignItems: 'start', display: 'flex' }}>
          <span>
            <img src={mail} alt="mail icon" />
          </span>
          <span>
            <p style={{ color: 'white', paddingLeft: '5%' }}>{email}</p>
          </span>
        </div>
        <hr className='line'/>
      </div>
      <div className='gigs'>
        <div style={{ textAlign: 'center', marginRight: '30px' }}>
          <div style={{ color: 'white', fontSize: '10px' }}>Total Gigs</div>
          <p style={{ color: '#69dee6', fontWeight: 'bold', textAlign: 'center' }}>{totalGigs}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'white', fontSize: '10px' }}>Active Gigs</div>
          <p style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{activeGigs}</p>
        </div>
      </div>
    </div>
  </div>)
};
export default EmployerProfile;
