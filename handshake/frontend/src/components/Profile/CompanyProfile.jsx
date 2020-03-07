import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import dummy from '../../common/dummy.png';
import {connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { NavLink, Link } from "react-router-dom";
import {profileUpdate, uploadFile} from "../../common/action";

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            successUpdate:false,   
        };
         this.handleEditProfile = this.handleEditProfile.bind(this);
    }
    
    getProfile = async () => {
        let userId=localStorage.getItem("user_id");
        const data={userId : userId}
        console.log("making request for company")
        let result = await axios.post('http://localhost:3001/companyProfile',data)
        let user_profile = result.data;
        console.log(user_profile+"getuser as comapny");
        await this.setState({ user_profile });
        localStorage.setItem("user_profile",JSON.stringify(user_profile));
        this.props.getCompanyDetails();
        
        console.log(user_profile.userId);
    };

    componentWillReceiveProps() {
        this.getProfile();
    }

    componentDidMount() {
        this.getProfile();
       
    }

    handleEditProfile = () => {
console.log("inside edit button")
this.setState({ showModal:!this.state.showModal});
console.log("insde"+this.state.modal)
        
    }
    handleNameChange = (e) => {

        this.setState({
            companyName: e.target.value
        });
        
    };
    handleDescriptionChange = (e) => {

        this.setState({
            description: e.target.value
        });
        
    };
    handleLocationChange = (e) => {

        this.setState({
            location: e.target.value
        });
        
    };
    handleContactInfoChange = (e) => {

        this.setState({
            contactInfo: e.target.value
        });
        
    };
    

    handleImageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };
    handleClose = (e) => {
        this.setState({ showModal:!this.state.showModal});
    }
    onSubmit =async(e)=>
    {
       
        e.preventDefault();
        let userId=localStorage.getItem("user_id");
        console.log(userId);
        // let data = new FormData();
        // data.append('user_id', userId);
        // data.append('company_name', this.state.company_name);
        // data.append('location', this.state.location);
        // data.append('email_id', this.state.email_id);
        // data.append('description', this.state.description);
        // data.append('contactInfo', this.state.contactInfo);
        // data.append('user_image', this.state.user_image);
        const data = {
            companyId:userId,
            companyName : this.state.companyName,
            description : this.state.description,
            contactInfo : this.state.contactInfo,
            location : this.state.location,

        }
        
        axios.post('http://localhost:3001/companyProfile/update',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log("Status Code : ",response);
            if(response.status === 200){
                this.setState({
                    successUpdate : true,
                    showModal:!this.state.showModal
                })
            }
            localStorage.removeItem("user_profile");
            this.getProfile();
        })
        .catch(err => { 
            this.setState({errorMessage: "Something went wrong"+err});
        });
    }

    render() {
        let user, name = "", user_id = "", email_id = "", location = "", city = "",state="",country="",contactInfo="",description="", redirectVar;
        let locationVar, mailVar, userName, userButton, listButton, userImage = dummy;let showCompanyProfile;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        if (this.state.successUpdate) {
            redirectVar = <Redirect to="/showCompanyProfile" />;
        }

       
        if (this.state && this.state.user_profile) {
            user = this.state.user_profile;
            name = user.name;
            email_id = user.emailId;
            user_id = user.userId;
            location = user.location;
            description= user.description;
            contactInfo=user.contactInfo;
            console.log(JSON.stringify(user)+"this is user");
            console.log("thismodal"+this.state.showModal)
           
            }
            if((!this.state.showModal) )
            {
                showCompanyProfile =(
                    <div>
                         <div class="container">
                <div className="row mt-3">
                      <div className="col-sm-4">
                          <div className="card" style={{width: 15 +"rem"}}>
                              <img className="card-img-top" src={dummy} alt="" />
                              <button type="button" id="picEdit" className="btn btn-primary btn-block btn-xs pull-right" onClick={this.handleImageEdit}>Edit Profile Picture</button>
                              <div className="text-center">
                              <div className="card-body">

                              <div class="panel panel-default">
                        <div class="panel-heading">Contact</div>
                        <a>
                        <i class="glyphicon glyphicon-envelope"></i>
                        <div class="panel-body">{email_id}</div>
                        </a>
                        </div>
                           </div>
                          </div>
                          </div>
                      </div>
                      
                      <div className="col-sm-7">
                      <div class="panel panel-default">
                     
                        <div class="panel-heading">Name</div>
                        <div class="panel-body">{name}</div>
                        
                        
                    </div>
                        
                    <div class="panel panel-default">
                        <div class="panel-heading">Location</div>
                        <div class="panel-body">{location}</div>
                       
                        
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">Description</div>
                        <div class="panel-body">{description}</div>
          
                        
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">ContactInfo</div>
                        <div class="panel-body">{contactInfo}</div>
                     
                        
                    </div>
                    <div class="panel-footer text-right">
                 <button type="button" id="profileEdit" class="btn btn-primary btn-block pull-right" onClick={this.handleEditProfile}>Edit Information</button>
                    </div>
                          
                      </div>
                     
                  </div> 
                  

                    </div>
                    </div>
                )
            }
            else
            {
                showCompanyProfile=(
                    <div>
                         <form onSubmit={this.onSubmit}>
                             
            <div class="container">
            <div class="panel panel-default">
                    <div class="panel-heading">Let us know more about you...</div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Company Name</b></span>
                                </div>
                                <input type="text" size="50" name="company_name" className="form-control" aria-label="Companyname" aria-describedby="basic-addon1" onChange={this.handleNameChange} defaultValue={this.state.user_profile.name}  pattern=".*\S.*" title="Company name cannot be spaces" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Location</b></span>
                                </div>
                                <input type="text" size="50" name="location" className="form-control" aria-label="location" aria-describedby="basic-addon1"defaultValue={this.state.user_profile.location} onChange={this.handleLocationChange} 
                                 pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Email</b></span>
                                </div>
                                <input type="email" size="50" name="email_id" className="form-control" aria-label="Email" aria-describedby="basic-addon1" defaultValue={this.state.user_profile.emailId} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Description</b></span>
                                </div>
                                <input type="textarea"style={{ height: 200 ,width:400}}   name="description" className="form-control" aria-label="description" aria-describedby="basic-addon1" defaultValue={this.state.user_profile.description} onChange={this.handleDescriptionChange} pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Contact Information</b></span>
                                </div>
                                <input type="text" size="50" name="contactInfo" className="form-control" aria-label="contactInfo" aria-describedby="basic-addon1" onChange={this.handleContactInfoChange} defaultValue={this.state.user_profile.contactInfo}  pattern=".*\S.*" required />
                            </div>
                            
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Profile Picture</b></span>
                                </div>
                           <input type="file" name="user_image" accept="image/*" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleChange} />
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
                )
            }
        
        

        return (
            <div>
            {redirectVar}
            {showCompanyProfile}
            
    </div> 
    )
  }
}
const mapStateToProps=state=>{
    // var data = JSON.parse(state.user);
    return{
        // user:data,
        userId:state.userId,
        userName:state.userName,
        userEmail:state.userEmail
    };
}
const mapDispatchToProps = dispatch=> {
return{
    getCompanyDetails: () =>dispatch ({type:'COMPANYDETAILS'})
};
}

//export Show Profile Component
export default connect(mapStateToProps,mapDispatchToProps)(CompanyProfile);

