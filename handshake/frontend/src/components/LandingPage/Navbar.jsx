import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import handshakeLogo from '../../handshake-logo.png';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.clear();
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;let dashboard;let navSignup;
        if(localStorage.getItem("token")){
            console.log("Able to read cookie");
            if(localStorage.getItem("user_type")==1)
            {
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/students" id="students">Students</Link></li>
                        <li><Link to="/events" id="events">Events</Link></li>
                        <li><Link to="/applications" id="application">Application</Link></li>
                        <li><Link to="/showProfile" id="showProfile"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                        
                </ul>
            );
            }
            else
            {
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/studentsCompany" id="students">Students</Link></li>
                        <li><Link to="/eventsCompany" id="events">Events</Link></li>
                        <li><Link to="/showCompanyProfile" id="showCompanyProfile"><span className="glyphicon glyphicon-user"></span>CompanyProfile</Link></li>
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                        
                </ul>
            );
            }
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(localStorage.getItem("token")){
            if(localStorage.getItem("user_type")==1)
            {
            redirectVar = <Redirect to="/studentDashboard"/>
            }
            if(localStorage.getItem("user_type")==2)
            {
            redirectVar = <Redirect to="/companyDashboard"/>
            }
        }
        else{
            redirectVar = <Redirect to="/login"/>
        }
        if(localStorage.getItem("user_type")==1)
        {
        dashboard = (
        <li ><Link to="/studentDashboard">Student Dashboard</Link></li> )
        }
        if(localStorage.getItem("user_type")==2){
            dashboard = (
        <li ><Link to="/companyDashboard">Company Dashboard</Link></li>)
        }
        if(!localStorage.getItem("token"))
        {
            navSignup =(
                <li><Link to="/signup">Sign Up</Link></li>)
            

        }

        return(
            <div>
                {redirectVar}
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand">
                    <img src={handshakeLogo} alt="" />
                    </a>     
                    </div>
                    <ul className="nav navbar-nav">
                         {dashboard}
                        {navSignup} 
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        userId:state.userId,
        userName:state.userName,
        userEmail:state.userEmail

    };
}
const mapDispatchToProps = dispatch=> {
return{
    onSuccessLogout: () =>dispatch ({type:'UNLOADUSER'})
};
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);