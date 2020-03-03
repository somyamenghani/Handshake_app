import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Navbar from './LandingPage/Navbar';
import ShowProfile from './Profile/ShowProfile';
import EditProfile from './Profile/EditProfile';
import StudentDashboard from './LandingPage/StudentDashboard';
import CompanyDashboard from './LandingPage/CompanyDashboard';
import CompanyProfile from './Profile/CompanyProfile';
import StudentsCompany from './CompanyTabs/StudentsCompany';
import EventsCompany from './CompanyTabs/EventsCompany';
import Events from './StudentTabs/Events';
import Students from './StudentTabs/Students';
import Applications from './StudentTabs/Applications';

// Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/showProfile"component={ShowProfile}/>
        <Route path="/editProfile"component={EditProfile}/>
        <Route path="/studentDashboard"component={StudentDashboard}/>
        <Route path="/companyDashboard"component={CompanyDashboard}/>
        <Route path="/students"component={Students}/>
        <Route path="/events"component={Events}/>
        <Route path="/applications"component={Applications}/>
        <Route path="/showCompanyProfile"component={CompanyProfile}/>
        <Route path="/studentsCompany"component={StudentsCompany}/>
        <Route path="/eventsCompany"component={EventsCompany}/>



      </div>
    );
  }
}
// Export The Main Component
export default Main;
