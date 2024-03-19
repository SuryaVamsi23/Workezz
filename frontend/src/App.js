import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './LandingPage/homepage';
import Employee from './EmployeePage/Employee';
import Jobs from './Employeejob/jobs';
import Readmore from './Readmore/Readmore';
import Employer from './EmployerPage/Employer';
import Postjob from './Postjob/Postjob';
import Closepost from './ClosePost/Closepost';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/employee" element={<Employee/>} />
          <Route path="/employee/jobs" element={<Jobs/>} />
          <Route path="/employee/jobs/readmore" element={<Readmore/>} />
          <Route path="/employer" element={<Employer/>} />
          <Route path="/employer/postjob" element={<Postjob/>} />
          <Route path="/employer/closepost" element={<Closepost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
