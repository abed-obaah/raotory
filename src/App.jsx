import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/RegistrationPage';
import OTP from './pages/EmailVerificationPage';
import Dashboard from './pages/HomePage';
import Login from './pages/LoginPage';
import ForgetPassword from './pages/forgetPassword';
import PasswordResetOtp from './pages/passwordResetOtp';
import InputOrder from './pages/Overview'
// import AdminDashboard from './screens/admin/index'
// import Jobs from './screens/Jobs'
// import UserManagement from './screens/admin/userManagement'
// import ViewUser from './screens/admin/ViewUsers'
// import Adminjobs from './screens/admin/jobs'
// import Assignjobs from './screens/admin/assignJobs'
// import Createjobs from './screens/admin/createJobs'
// import Trackjobs from './screens/admin/TrackJobs';
// import AddUser from './screens/admin/AddUser';
// import PriortizeJobs from './screens/admin/PriortizeJobs';
// import InspectJobs from './screens/admin/InspectJobs';
// import Certification from './screens/admin/certification';
// import Scheduler from './screens/Scheduler/index'
// import JobReview from './components/JobReview';
// import InspectionChecklist from './components/inspectionChecklist'
// import SingleInspect from './components/SingleInspections';
// import Reports from './screens/inspector/reportsScreen';
// import Templates from './screens/admin/Templates';
// import ViewChecklist from './screens/admin/ViewChecklist'
// import CheckList from './screens/admin/CheckList';
// import PendingJobs from './screens/admin/pandingjobsScreen';





export default function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [userData, setUserData] = useState(null);

  // const handleLogin = (data) => {
  //   setLoggedIn(true);
  //   setUserData(data);
  // };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   setUserData(null);
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='login' element={<Login />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/passwordResetOtp' element={<PasswordResetOtp />} />
        <Route path='/inputOrder' element={<InputOrder />} />
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/jobs" element={<Jobs />} />
        <Route path='/certification' element={<Certification/>} />
        <Route path="/admin-jobs" element={<Adminjobs />} />
        <Route path="/manage-user" element={<UserManagement />} />
        <Route path="/view-users" element={<ViewUser />} />
        <Route path="/add-users" element={<AddUser />} />
        <Route path="/assign-jobs" element={<Assignjobs />} />
        <Route path="/create-jobs" element={<Createjobs />} />
        <Route path="/track-jobs" element={<Trackjobs />} />
        <Route path='/priortize-jobs' element={<PriortizeJobs/>} />
        <Route path='/inspect-jobs' element={<InspectJobs/>} /> */}
        {/* <Route path="/add-user" element={<AddUser />} />
        <Route path="/user-permissions" element={<UserPermissions />} />
        <Route path="/suspend-user" element={<SuspendUser />} />
        <Route path="/delete-user" element={<DeleteUserAccount />} />
        <Route path="/user-activities" element={<UserActivities />} /> */}

        {/* <Route path="/scheduler" element={<Scheduler/>} />
        <Route path="JobReview" element={<JobReview/>}/>
        <Route path="inspectionChecklist" element={<InspectionChecklist/>}/>
        <Route path='/single-inspect' element={<SingleInspect/>}/>
        <Route path='/Reports' element={<Reports/>}/>
        <Route path='/templates' element={<Templates/>}/>
        <Route path='/viewChecklist' element={<ViewChecklist />}/>
        <Route path='/CheckList' element={<CheckList/>}/>
        <Route path='/pending-jobs' element={<PendingJobs/>}/> */}
        {/* inspectionChecklist */}
      </Routes>
    </Router>
  );
}
