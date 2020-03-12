import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import dummy from '../../common/dummy.png';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';



class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            successUpdate:false,
            imageModal:false,
            userImage:null ,
            user_profile:[] ,
            imageChange:false 
        };
         this.handleEditProfile = this.handleEditProfile.bind(this);
         this.closeModal = this.closeModal.bind(this);
        this.handleImageEdit = this.handleImageEdit.bind(this);
        this.onImageSubmit=this.onImageSubmit.bind(this);
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
    closeModal() {
        this.setState({
            imageModal:false
        });
    }
    handleImageEdit=(e)=>{
        this.setState({imageModal:true
            
        });
        
    }
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
        axios.post('http://localhost:3001/companyProfile/upload',data)
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
     
    handleClose = (e) => {
        this.setState({ showModal:!this.state.showModal});
    }
    onSubmit =async(e)=>
    {
       
        e.preventDefault();
        let userId=localStorage.getItem("user_id");
        console.log(userId);
        const data = {
            companyId:userId,
            companyName : this.state.companyName||this.state.user_profile.name,
            description : this.state.description||this.state.user_profile.description,
            contactInfo : this.state.contactInfo||this.state.user_profile.contactInfo,
            location : this.state.location||this.state.user_profile.location

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
        let user,user_id='', name = "", email_id = "", location = "",contactInfo="",description="", redirectVar;
        let  userImage = this.state.user_profile.image||dummy;let showCompanyProfile;
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
            if(this.state.imageChange)
        {
            userImage=this.state.user_profile.image;
        }
            if((!this.state.showModal) )
            {
                showCompanyProfile =(
                    <div>
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

