import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import dummy from '../../common/dummy.png';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

class ShowProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
            user_profile:[],
            imageModal:false,
            userImage:null,
            imageChange:false
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleImageEdit = this.handleImageEdit.bind(this);
        this.onImageSubmit=this.onImageSubmit.bind(this);
    }
    
    getProfile = async () => {
        let userId=localStorage.getItem("user_id");
        const data={userId : userId}
        let result = await axios.post('http://localhost:3001/profile',data)
        let user_profile = result.data;
        console.log(user_profile);
        await this.setState({ user_profile });
        localStorage.setItem("user_profile",JSON.stringify(user_profile));
        this.props.getUserDetails();
        
        console.log(user_profile.userId);
    };

    componentWillReceiveProps() {
        this.getProfile();
    }

    componentDidMount() {
        this.getProfile();
    }

    handleEdit = ()=>{

this.setState({ showEditModal:true});
        
    }
    handleImageEdit=(e)=>{
        this.setState({imageModal:true
            
        });
        
    }
    closeModal() {
        this.setState({
            showEditModal:false,
            imageModal:false
        });
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
        console.log(e.target.files[0])
        this.setState({
            userImage: e.target.files[0]
        });
    };
    onImageSubmit= async (e)=>{
        
        const data = new FormData()
        data.append('file', this.state.userImage);
        data.append('userId',localStorage.getItem("user_id"));
        axios.post('http://localhost:3001/profile/upload',data)
        .then(response => {
        if (response.status === 200) {
            console.log("Image uploaded")
            this.setState({
                imageModal: false,
                imageChange:true
            });
            
        }
        this.getProfile();
        this.getProfile();
    })
    .catch(err => { 
        this.setState({errorMessage: "error"});
    })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            userId:this.state.user_profile.userId,
            userName:this.state.userName||this.state.user_profile.name,
            userEmail :this.state.user_profile.emailId,
            userCareerObj:this.state.userCareerObj||this.state.user_profile.careerObj,
            userContactNumber:this.state.userContactNumber||this.state.user_profile.contactNumber,
            userCollege:this.state.userCollege||this.state.user_profile.collegeName,
            userMajor:this.state.userMajor||this.state.user_profile.major,
            userDegree:this.state.userDegree||this.state.user_profile.degree,
            userCgpa:this.state.userCgpa||this.state.user_profile.cgpa,
            userCollegeLocation:this.state.userCollegeLocation||this.state.user_profile.collegeLocation,
            userYOP:this.state.userYOP||this.state.user_profile.yop,
            userCity:this.state.userCity||this.state.user_profile.city,
            userState:this.state.userState||this.state.user_profile.state,
            userCountry:this.state.userCountry||this.state.user_profile.country,
            userSkills:this.state.userSkills||this.state.user_profile.skills,
            userWorkDetails:this.state.userWorkDetails||this.state.user_profile.workDetails
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/update',data)
        .then(response => {
        if (response.status === 200) {
            this.setState({
                showEditModal: false
            });
            localStorage.removeItem("user_profile");
            this.getProfile();
        }
    })
    .catch(err => { 
        this.setState({errorMessage: "error"});
    })
}

    render() {
        let redirectVar;
        let userImage =this.state.user_profile.image||dummy;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        if(this.state.imageChange)
        {
            userImage=this.state.user_profile.image;
        }
        
        return (
            <div>
            {redirectVar}
            <div class="container">
            <div className="row mt-3">
                  <div className="col-sm-4">
                      <div className="card" style={{width: 15 +"rem"}}>
                          <img className="card-img-top" src={userImage} alt="" />
                          <button type="button" id="picEdit" className="btn btn-primary btn-block btn-xs pull-right" onClick={this.handleImageEdit}>Edit Profile Picture</button>
                          <div className="text-center">
                          <div className="card-body">
                          <div class="panel panel-default">
                    <div class="panel-heading">Contact</div>
                    <div class="panel-body">{this.state.user_profile.emailId}</div>
                    <div class="panel-body">{this.state.user_profile.contactNumber}</div>
                    <div class="panel-body">{this.state.user_profile.city}</div>
                    <div class="panel-body">{this.state.user_profile.state}</div>
                    <div class="panel-body">{this.state.user_profile.country}</div>
                    </div>
                       </div>
                      </div>
                      </div>
                  </div>
                  
                  <div className="col-sm-7">
                  <div class="panel panel-default">
                    <div class="panel-heading">About</div>
                    <div class="panel-body">{this.state.user_profile.name}</div>
                </div>
                    
                    <div class="panel panel-default">
                    <div class="panel-heading">My Journey</div>
                 <div class="panel-body">{this.state.user_profile.careerObj}</div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Educational Details(Current)</div>
                     <div class="panel-body">{this.state.user_profile.collegeName}</div>
                     <div class="panel-body">{this.state.user_profile.collegeLocation}</div>
                     <div class="panel-body">{this.state.user_profile.major}</div>
                     <div class="panel-body">{this.state.user_profile.degree}</div>
                     <div class="panel-body">{this.state.user_profile.cgpa}</div>
                     <div class="panel-body">{this.state.user_profile.yop}</div>
                    
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Experience Details</div>
        <div class="panel-body">{this.state.user_profile.workDetails}</div>
                    
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Skills</div>
                     <div class="panel-body">{this.state.user_profile.skills}</div>
                    
                </div>
                <div class="panel-footer text-right">
                 <button type="button" id="profileEdit" class="btn btn-primary btn-block pull-right" onClick={this.handleEdit}>Edit Profile Information</button>
                    </div>
                      
                  </div>
                  
              </div> 
              
  
</div> 
<Modal
       isOpen={this.state.showEditModal}
       onRequestClose={this.closeModal}
        contentLabel="Example Modal" >
      <div>             
      <form onSubmit={this.onSubmit}>
            <div class="container">
            <div class="panel panel-default">
                    <div class="panel-heading">Let us know more about you...</div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Username</b></span>
                                </div>
                                <input type="text" size="50" name="user_name" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={this.userNameChangeHandler} defaultValue={this.state.user_profile.name}  pattern=".*\S.*" title="Please enter a unique user name.Username cannot be spaces" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Career Objective</b></span>
                                </div>
                                <input type="text" size="50" name="careerObjective" className="form-control" aria-label="careerObjective" aria-describedby="basic-addon1" onChange={this.careerObjChange} defaultValue=
                                {this.state.user_profile.careerObj}  pattern=".*\S.*"/>
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Email</b></span>
                                </div>
                                <input type="email" size="50" name="email_id" className="form-control" aria-label="Email" aria-describedby="basic-addon1" defaultValue=
                                {this.state.user_profile.emailId} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Contact Number</b></span>
                                </div>
                                <input type="number" size="50" name="contactNumber" className="form-control" aria-label="ContactNumber" aria-describedby="basic-addon1" onChange={this.contactChange} defaultValue= {this.state.user_profile.contactNumber} pattern=".*\S.*" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>College Name</b></span>
                                </div>
                                <input type="text" size="50" name="collegeName" className="form-control" aria-label="collegeName" aria-describedby="basic-addon1" onChange={this.collegeChange} defaultValue= {this.state.user_profile.collegeName}  pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"  id="basic-addon1"><b>Major</b></span>
                                </div>
                                <input type="text" name="major" size="50"className="form-control" aria-label="major" aria-describedby="basic-addon1" onChange={this.majorChange} defaultValue= {this.state.user_profile.major} pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Degree</b></span>
                                </div>
                                <input type="text" size="50" name="degree" className="form-control" aria-label="degree" aria-describedby="basic-addon1" onChange={this.degreeChange} defaultValue= {this.state.user_profile.degree}  pattern=".*\S.*"  />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>CGPA</b></span>
                                </div>
                        
                                <input type="number" size="50" name="cgpa" step="0.01" className="form-control" aria-label="cgpa" aria-describedby="basic-addon1" onChange={this.cgpaChange} defaultValue= {this.state.user_profile.cgpa}  />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>College Location</b></span>
                                </div>
                                <input type="text" size="50" name="collegeLocation" className="form-control" aria-label="collegeLocation" aria-describedby="basic-addon1" onChange={this.collegeLocationChange} defaultValue= {this.state.user_profile.collegeLocation}  pattern=".*\S.*"  />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Year of passing</b></span>
                                </div>
                                <input type="number"size="50" name="yop" className="form-control" aria-label="yop" aria-describedby="basic-addon1" onChange={this.yopChange} defaultValue= {this.state.user_profile.yop}  />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>City</b></span>
                                </div>
                                <input type="text"size="50" name="city" className="form-control" aria-label="City" aria-describedby="basic-addon1" onChange={this.cityChange} defaultValue= {this.state.user_profile.city}  pattern=".*\S.*"  />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>State</b></span>
                                </div>
                                <input type="text"size="50" name="state" className="form-control" aria-label="State" aria-describedby="basic-addon1" onChange={this.stateChange} defaultValue={this.state.user_profile.state}  pattern=".*\S.*" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Country</b></span>
                                </div>
                                <input type="text"size="50" name="country" className="form-control" aria-label="country" aria-describedby="basic-addon1" onChange={this.countryChange} defaultValue= {this.state.user_profile.country} pattern=".*\S.*" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Skills</b></span>
                                </div>
                                <input type="text"size="50" name="skills" className="form-control" aria-label="skills" aria-describedby="basic-addon1" onChange={this.skillChange} defaultValue= {this.state.user_profile.skills} pattern=".*\S.*"  />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Experience Details</b></span>
                                </div>
                                <input type="text"size="50" name="workDetails" className="form-control" aria-label="country" aria-describedby="basic-addon1" onChange={this.workDetailsChange} defaultValue= {this.state.user_profile.workDetails} pattern=".*\S.*"  />
                            </div>
                            <center>
                                <Button variant="primary" type="submit">
                                    <b>Update</b>
                                </Button>&nbsp;&nbsp;
                                <Button variant="secondary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </form>
    </div>
   </Modal>

   <Modal
                            isOpen={this.state.imageModal}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           
                           <div>
                         <form onSubmit={this.onImageSubmit} enctype="multipart/form-data">
                             
            <div class="container">
            <div class="panel panel-default">
    <div class="panel-heading">Choose profile picture: </div>
                    <div className="input-group mb-2">
                                <input type="file" name="user_image" accept="image/*" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleImageChange} />
                            </div>
                            <center>
                                <Button variant="primary" type="submit">
                                    <b>Change</b>
                                </Button>&nbsp;&nbsp;
                                <Button variant="secondary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </form>
                        </div>
                        </Modal>
      </div>
       
    )
  }
}
const mapStateToProps=state=>{
    return{
        userId:state.userId,
        userName:state.userName,
        userEmail:state.userEmail,
        user:state.user_profile

    };
}
const mapDispatchToProps = dispatch=> {
return{
    getUserDetails: () =>dispatch ({type:'USERDETAILS'})
};
}
//export Show Profile Component
export default connect(mapStateToProps,mapDispatchToProps)(ShowProfile);

