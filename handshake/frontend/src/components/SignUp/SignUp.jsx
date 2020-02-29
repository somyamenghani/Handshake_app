import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

//Define a Signup Component
class SignUp extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            userEmail : "",
            password : "",
            name :"",
            collegeName :"",
            major: "",
            location: "",
            selectValue:1,
            studentView:true,
            errorMessage : "",
            successFlag :false
        }
        //Bind the handlers to this class
        this.userEmailChangeHandler = this.userEmailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
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
    //name change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
     //major change handler to update state variable with the text entered by the user
     majorChangeHandler = (e) => {
        this.setState({
            major : e.target.value
        })
    }
    //collegeName change handler to update state variable with the text entered by the user
    collegeNameChangeHandler = (e) => {
        this.setState({
            collegeName : e.target.value
        })
    }
      //location change handler to update state variable with the text entered by the user
      locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    handleDropdownChange=(e)=> {
        this.setState({ selectValue: e.target.value });
        this.setState({ studentView:!this.state.studentView});
        console.log(this.state.selectValue);
      }
    //submit Login handler to send a request to the node backend
    submitSignUp = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            userEmail : this.state.userEmail,
            password : this.state.password,
            userType : this.state.selectValue,
            name : this.state.name,
            collegeName : this.state.collegeName,
            location : this.state.location,
            major : this.state.major
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        successFlag : true
                       
                    })
                    this.props.onSuccessSignup();
                    alert("Signed up successfully!!Login Now!");
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
            redirectVar = <Redirect to="/home" />;
        }
        if(this.state.successFlag)
        {
            redirectVar = <Redirect to= "/login"/> 
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
                            <h2>Join the Handshake community</h2>
                            <h2>Sign Up</h2>
                            <p>Please enter your Details</p><br/>
                            <h4>As Student</h4>
                            <div style={{float: "left", color: "red"}} >
                { this.state.errorMessage &&
                            <h5 className="error">Error: { this.state.errorMessage} </h5> }
                            </div>
                        </div>

                        <form onSubmit={this.submitSignUp}>
                        <div className="form-group">
                        <select id = "dropdown" onChange={this.handleDropdownChange}>
                                 <option value="1">Student</option>
                                <option value="2">Company</option>
                        </select>
                            </div>
                            <div className="form-group">
                            <label htmlFor="name">Student Name:</label>
                                <input onChange = {this.nameChangeHandler} type="text" className="form-control" name="Name" placeholder="Name" required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="Email Address">Student Email Address(Please use your school email):</label>
                                <input onChange = {this.userEmailChangeHandler} type="email" className="form-control" name="Email Address" placeholder="Email Address" required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password"> Create Password:</label>
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                            </div>
                           
                                <div className="form-group">
                                <label htmlFor="College Name"> Enter School Name:</label>
                                <input onChange = {this.collegeNameChangeHandler} type="text" className="form-control" name="College Name" placeholder=" School Name" required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="Major"> Enter your Major:</label>
                            <input onChange = {this.majorChangeHandler} type="text" className="form-control" name="Major" placeholder="Major" required />
                        </div>
                            <button type ="submit"  className="btn btn-primary">Sign Up</button>   
                            </form>              
                    </div>
                    
                </div>
                
            </div>
            
            </div>
        )
    }
    else{
        return(
            <div>
                {redirectVar}
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                        <h2>Join the Handshake community</h2>
                            <h2>Sign Up</h2>
                            <p>Please enter your Details</p><br/>
                            <h4>As Company</h4>
                            <div style={{float: "left", color: "red"}} >
                { this.state.errorMessage &&
                            <h5 className="error">Error: { this.state.errorMessage} </h5> }
                            </div>
                        </div>

                        <form onSubmit={this.submitSignUp}>
                        <div className="form-group">
                        <select id = "dropdown" onChange={this.handleDropdownChange}>
                                 <option value="1">Student</option>
                                <option value="2">Company</option>
                        </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Company Name:</label>
                                <input onChange = {this.nameChangeHandler} type="text" className="form-control" name="Name" placeholder="Name" required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="Email Address">Email Address:</label>
                                <input onChange = {this.userEmailChangeHandler} type="email" className="form-control" name="Email Address" placeholder="Email Address" required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password"> Create Password:</label>
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                            </div>
                           
                                <div className="form-group">
                                <label htmlFor="location"> Location:</label>
                                <input onChange = {this.locationChangeHandler} type="text" className="form-control" name="location" placeholder=" Location" required />
                            </div>
                            
                            <button type ="submit"  className="btn btn-primary">Sign Up</button>   
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
    onSuccessSignup: () =>dispatch ({type:'SIGNUP'})
};
}
//export Signup Component
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);

