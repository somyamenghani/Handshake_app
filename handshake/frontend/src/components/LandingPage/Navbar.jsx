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
        let navLogin = null;
        if(localStorage.getItem("token")){
            console.log("Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/showProfile" id="showProfile"><span className="glyphicon glyphicon-user"></span>Profile</Link></li>
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                        
                </ul>
            );
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
            redirectVar = <Redirect to="/home"/>
        }
        else{
            redirectVar = <Redirect to="/login"/>
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
                         <li ><Link to="/home">Home</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li> 
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