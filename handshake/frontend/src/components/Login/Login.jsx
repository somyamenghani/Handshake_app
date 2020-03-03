import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';
import api from '../../common/api';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            userEmail : "",
            password : "",
            authFlag : false,
            selectValue: '1',
            studentView:true,
            errorMessage : ""
        }
        //Bind the handlers to this class
        this.userEmailChangeHandler = this.userEmailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //username change handler to update state variable with the text entered by the user
    userEmailChangeHandler = (e) => {
        this.setState({
            userEmail : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    handleDropdownChange=(e)=> {
        console.log(this.state.selectValue);
        this.setState({ selectValue: e.target.value });
        //console.log(this.state.studentView);
        this.setState({ studentView:!this.state.studentView});
        //console.log(this.state.studentView);
      }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            userEmail : this.state.userEmail,
            password : this.state.password,
            userType : this.state.selectValue
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Status Code : ",response);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                    const token=response.data;
                    api.setJwt(token);
                    localStorage.setItem("token", token);
                    const authToken = localStorage.getItem("token");
            const jwt = authToken.split(" ")[1]
            let user = jwtDecode(jwt);
            if (user) {
                localStorage.setItem("email_id", user.emailId);
                localStorage.setItem("user_id", user.userId);
                localStorage.setItem("user_name", user.name);
                localStorage.setItem("user_type", data.userType);
                this.props.onSuccessLogin();
            }
                    
                }
            })
            .catch(err => { 
                this.setState({errorMessage: err.response.statusText});
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            if(localStorage.getItem("user_type")==1)
            {
                console.log("coming in if");
                redirectVar = <Redirect to="/studentDashboard" />; 
            }
            else{
                redirectVar = <Redirect to="/companyDashboard" />;
            }
            
        }
        if(this.state.studentView)
        {
            return(
                <div>
                    {redirectVar}
                <div className="container">
                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Sign In</h2>
                                <h2>As Student</h2>
                                <p>Please enter your Email address and password</p>
                                <div style={{float: "left", color: "red"}} >
                    { this.state.errorMessage &&
                                <h5 className="error">Error: { this.state.errorMessage} </h5> }
                                </div>
                            </div>
                            <form onSubmit={this.submitLogin}>
                            <div className="form-group">
                            <select id = "dropdown" onChange={this.handleDropdownChange}>
                                     <option value="1">Student</option>
                                    <option value="2">Company</option>
                            </select>
                            {/* <select value={this.state.selectValue} onChange={this.handleDropdownChange}>
                <option value="1">Student</option>
                <option value="2">Company</option>
                </select> */}
                                </div>
                                <div className="form-group">
                                    <input onChange = {this.userEmailChangeHandler} type="email" className="form-control" name="Email Address" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                                </div>
                                <button type ="submit"  className="btn btn-primary">Login</button>   
                                </form>              
                        </div>
                        
                    </div>
                    
                </div>
                
                </div>
            )
        }
        
        else {
            return(
                <div>
                    {redirectVar}
                <div className="container">
                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Sign In</h2>
                                <h2>As Company</h2>
                                <p>Please enter your Email address and password</p>
                                <div style={{float: "left", color: "red"}} >
                    { this.state.errorMessage &&
                                <h5 className="error">Error: { this.state.errorMessage} </h5> }
                                </div>
                            </div>
                            <form onSubmit={this.submitLogin}>
                            <div className="form-group">
                            <select id = "dropdown" onChange={this.handleDropdownChange}>
                                     <option value="1">Student</option>
                                    <option value="2">Company</option>
                            </select>
                            {/* <select value={this.state.selectValue} onChange={this.handleDropdownChange}>
                <option value="1">Student</option>
                <option value="2">Company</option>
                </select> */}
                                </div>
                                <div className="form-group">
                                    <input onChange = {this.userEmailChangeHandler} type="email" className="form-control" name="Email Address" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                                </div>
                                <button type ="submit"  className="btn btn-primary">Login</button>   
                                </form>              
                        </div>
                        
                    </div>
                    
                </div>
                
                </div>
            )
        }

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
    onSuccessLogin: () =>dispatch ({type:'LOADUSER'})
};
}
//export Login Component
export default connect(mapStateToProps,mapDispatchToProps)(Login);