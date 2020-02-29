import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import dummy from '../../common/dummy.png';
import {connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successUpdate: false,
        userName:this.props.user.name,
        userEmail:this.props.user.emailId,
        userCollege:this.props.user.name,
        userMajor:this.props.user.collegeName,
        userDegree:this.props.user.degree,
        userCgpa:this.props.user.cgpa,
        userCollegeLocation:this.props.user.collegeLocation,
        userYOP:this.props.user.yop,
        userCareerObj:this.props.user.careerObj,
        userContactNumber:this.props.user.contactNumber,
        userCity:this.props.user.city,
        userState:this.props.user.state,
        userCountry:this.props.user.country,
        userSkills:this.props.user.skills,
        userWorkDetails:this.props.user.userWorkDetails,
        userImage:''
            
        };
        this.getDefaultValues = this.getDefaultValues.bind(this);
    }
    componentDidMount(){
        this.getDefaultValues();
    }
    getDefaultValues=()=>
    {
    
    }
    
    userNameChangeHandler = (e) => {
        this.setState({
            userName: e.target.value
        });
    };
    careerObjChange = (e) => {
        this.setState({
            userCareerObj: e.target.value
        });
    };
    contactChange = (e) => {
        this.setState({
            userContactNumber: e.target.value
        });
    };
    skillChange = (e) => {
        this.setState({
            userSkills: e.target.value
        });
    };
    workDetailsChange = (e) => {
        this.setState({
            userWorkDetails: e.target.value
        });
    };
    collegeChange = (e) => {
        this.setState({
            userCollege: e.target.value
        });
    };
    majorChange = (e) => {
        this.setState({
            userMajor: e.target.value
        });
    };
    degreeChange = (e) => {
        this.setState({
            userDegree: e.target.value
        });
    };
    cgpaChange = (e) => {
        this.setState({
            userCgpa: e.target.value
        });
    };
    collegeLocationChange = (e) => {
        this.setState({
            userCollegeLocation: e.target.value
        });
    };
    yopChange = (e) => {
        this.setState({
            userYOP: e.target.value
        });
    };
    cityChange = (e) => {
        this.setState({
            userCity: e.target.value
        });
    };
    stateChange = (e) => {
        this.setState({
            userState: e.target.value
        });
    };
    countryChange = (e) => {
        this.setState({
            userCountry: e.target.value
        });
    };
    handleImageChange = (e) => {
        this.setState({
            userImage: e.target.files[0]
        });
    };

    handleClose = (e) => {
        this.setState({
            successUpdate: !this.state.successUpdate
        });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            userId:this.props.userId,
            userName:this.state.userName,
            userEmail :this.props.userEmail,
            userCareerObj:this.state.userCareerObj,
            userContactNumber:this.state.userContactNumber,
            userCollege:this.state.userCollege,
            userMajor:this.state.userMajor,
            userDegree:this.state.userDegree,
            userCgpa:this.state.userCgpa,
            userCollegeLocation:this.state.userCollegeLocation,
            userYOP:this.state.userYOP,
            userCity:this.state.userCity,
            userState:this.state.userState,
            userCountry:this.state.userCountry,
            userSkills:this.state.userSkills,
            userWorkDetails:this.state.userWorkDetails
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/update',data)
        .then(response => {
        if (response.status === 200) {
            this.setState({
                successUpdate: true
            });
            localStorage.removeItem("user_profile");
        }
        console.log(this.state.successUpdate);
    })
    .catch(err => { 
        this.setState({errorMessage: "error"});
    })
}


    
   

    render() {
        let redirectVar;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        if(this.state.successUpdate)
        {
            redirectVar=<Redirect to="/showProfile" />
        }
       
        return (
            <div>
            {redirectVar}
            <div>
           
            <form onSubmit={this.onSubmit}>
            <div class="container">
            <div class="panel panel-default">
                    <div class="panel-heading">Let us know more about you...</div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Username</b></span>
                                </div>
                                <input type="text" size="50" name="user_name" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={this.userNameChangeHandler} defaultValue={this.props.user.name}  pattern=".*\S.*" title="Please enter a unique user name.Username cannot be spaces" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Career Objective</b></span>
                                </div>
                                <input type="text" size="50" name="careerObjective" className="form-control" aria-label="careerObjective" aria-describedby="basic-addon1" onChange={this.careerObjChange} defaultValue=
                                {this.props.user.careerObj}  pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Email</b></span>
                                </div>
                                <input type="email" size="50" name="email_id" className="form-control" aria-label="Email" aria-describedby="basic-addon1" defaultValue=
                                {this.props.user.emailId} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Contact Number</b></span>
                                </div>
                                <input type="number" size="50" name="contactNumber" className="form-control" aria-label="ContactNumber" aria-describedby="basic-addon1" onChange={this.contactChange} defaultValue= {this.props.user.contactNumber} pattern="{10}"required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>College Name</b></span>
                                </div>
                                <input type="text" size="50" name="collegeName" className="form-control" aria-label="collegeName" aria-describedby="basic-addon1" onChange={this.collegeChange} defaultValue= {this.props.user.collegeName}  pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"  id="basic-addon1"><b>Major</b></span>
                                </div>
                                <input type="text" name="major" size="50"className="form-control" aria-label="major" aria-describedby="basic-addon1" onChange={this.majorChange} defaultValue= {this.props.user.major} pattern="^[A-Za-z ]{1,20}$" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Degree</b></span>
                                </div>
                                <input type="text" size="50" name="degree" className="form-control" aria-label="degree" aria-describedby="basic-addon1" onChange={this.degreeChange} defaultValue= {this.props.user.degree}  pattern="^[A-Za-z ]{1,20}$" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>CGPA</b></span>
                                </div>
                        
                                <input type="number" size="50" name="cgpa" step="0.01" className="form-control" aria-label="cgpa" aria-describedby="basic-addon1" onChange={this.cgpaChange} defaultValue= {this.props.user.cgpa} required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>College Location</b></span>
                                </div>
                                <input type="text" size="50" name="collegeLocation" className="form-control" aria-label="collegeLocation" aria-describedby="basic-addon1" onChange={this.collegeLocationChange} defaultValue= {this.props.user.collegeLocation}  pattern="^[A-Za-z ]{1,20}$" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Year of passing</b></span>
                                </div>
                                <input type="number"size="50" name="yop" className="form-control" aria-label="yop" aria-describedby="basic-addon1" onChange={this.yopChange} defaultValue= {this.props.user.yop} required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>City</b></span>
                                </div>
                                <input type="text"size="50" name="city" className="form-control" aria-label="City" aria-describedby="basic-addon1" onChange={this.cityChange} defaultValue= {this.props.user.city}  pattern="^[A-Za-z ]{1,20}$" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>State</b></span>
                                </div>
                                <input type="text"size="50" name="state" className="form-control" aria-label="State" aria-describedby="basic-addon1" onChange={this.stateChange}   pattern="^[A-Za-z ]{2,20}$" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Country</b></span>
                                </div>
                                <input type="text"size="50" name="country" className="form-control" aria-label="country" aria-describedby="basic-addon1" onChange={this.countryChange} defaultValue= {this.props.user.country} pattern="^[A-Za-z ]{2,20}$" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Skills</b></span>
                                </div>
                                <input type="text"size="50" name="skills" className="form-control" aria-label="skills" aria-describedby="basic-addon1" onChange={this.skillChange} defaultValue= {this.props.user.skills} pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Work Details</b></span>
                                </div>
                                <input type="text"size="50" name="workDetails" className="form-control" aria-label="country" aria-describedby="basic-addon1" onChange={this.workDetailsChange} defaultValue= {this.props.user.workDetails} pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Profile Picture</b></span>
                                </div>
                                <input type="file" name="user_image" accept="image/*" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleImageChange} />
                            </div>
                            <center>
                                <Button variant="primary" type="submit">
                                    <b>Update</b>
                                </Button>&nbsp;&nbsp;
                                <Button variant="secondary" onClick={this.handleClose}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </form>
                        </div>
            </div>
           
            
    )
  }
}
const mapStateToProps=state=>{
    var data = JSON.parse(state.user);
    return{
        user:data,
        userId:state.userId,
        userName:state.userName,
        userEmail:state.userEmail
    };
    
}

export default connect(mapStateToProps)(EditProfile);