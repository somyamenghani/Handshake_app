import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Navbar from './LandingPage/Navbar';
import ShowProfile from './Profile/ShowProfile';
import EditProfile from './Profile/EditProfile';
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
      </div>
    );
  }
}
// Export The Main Component
export default Main;
