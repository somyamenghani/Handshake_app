import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import dummy from '../../common/dummy.png';
import {connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { NavLink, Link } from "react-router-dom";
import {profileUpdate, uploadFile} from "../../common/action";

class ShowProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            logout: false,
            
        };
        this.handleEdit = this.handleEdit.bind(this);
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

        if (user_profile.userId === localStorage.getItem("user_id")) {
            if (user_profile.user_image)
                localStorage.setItem("user_image", user_profile.userImage);
            else
                localStorage.removeItem("user_image");
        }
    };

    componentWillReceiveProps() {
        this.getProfile();
    }

    componentDidMount() {
        this.getProfile();
    }

    onProfileImageClick = (e) => {
        let modal = document.getElementById("imageModal");
        var modalImage = document.getElementById("image_modal");
        modal.style.display = "block";
        modalImage.src = e.target.src;

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    };

    editProfile = () => {
        let user= this.state.user_profile;
        console.log("edit profile called"+JSON.stringify(user));
        this.stateshowModal =true;
    };

    handleEdit = ()=>{

this.setState({ showModal:!this.state.showModal});
        
    }

    render() {
        let user, name = "", user_id = "", email_id = "", user_careerobj = "", city = "",state="",country="",contactNumber="",collegeName="",major="",degree="",cgpa="",yop="",collegeLocation="",skills="",workDetails="", redirectVar;
        let locationVar, mailVar, userName, userButton, listButton, userImage = dummy;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        if(this.state.showModal)
        {
            redirectVar = <Redirect to="/editProfile"/>;
        }
        if (this.state && this.state.user_profile) {
            user = this.state.user_profile;
            name = user.name;
            email_id = user.emailId;
            contactNumber=user.contactNumber;
            collegeName=user.collegeName;
            major=user.major;
            city=user.city;
            state=user.state;
            country=user.country;
            collegeLocation=user.collegeLocation;
            degree=user.degree;
            cgpa=user.cgpa;
            yop=user.yop;
            skills=user.skills;
            workDetails=user.workDetails;
    
            user_id = user.userId;
            console.log(JSON.stringify(user)+"this is user");
                
                
    
            if (user.careerObj)
                user_careerobj = user.careerObj;
            if (user.user_image)
                userImage = user.user_image;
            userName = (<div><i className="fas fas fa-at"></i>{name}</div>);
            if (user_id === localStorage.getItem("user_id")) {
                userButton = (
                    <div className="text-left follow_button pr-2">
                        <button type="button" className="btn btn-outline-primary" onClick={this.editProfile}><b>Edit Profile</b></button>
                    </div>
                );
                
            } 
        }
        

        return (
            <div>
            {redirectVar}
            <div class="container">
            <div className="row mt-3">
                  <div className="col-sm-4">
                      <div className="card" style={{width: 15 +"rem"}}>
                          <img className="card-img-top" src={dummy} alt="" />
                          <div className="text-center">
                          <div className="card-body">
                          <div class="panel panel-default">
                    <div class="panel-heading">Contact</div>
                    <div class="panel-body">{email_id}</div>
                    <div class="panel-body">{contactNumber}</div>
                    <div class="panel-body">{city}</div>
                    <div class="panel-body">{state}</div>
                    <div class="panel-body">{country}</div>
                    </div>
                       </div>
                      </div>
                      </div>
                  </div>
                  
                  <div className="col-sm-7">
                  <div class="panel panel-default">
                    <div class="panel-heading">About</div>
                    <div class="panel-body">{userName}</div>
                </div>
                    
                    <div class="panel panel-default">
                    <div class="panel-heading">My Journey</div>
                 <div class="panel-body">{user_careerobj}</div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Educational Details(Current)</div>
                     <div class="panel-body">{collegeName}</div>
                     <div class="panel-body">{collegeLocation}</div>
                     <div class="panel-body">{major}</div>
                     <div class="panel-body">{degree}</div>
                     <div class="panel-body">{cgpa}</div>
                     <div class="panel-body">{yop}</div>
                    
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Experience Details</div>
        <div class="panel-body">{workDetails}</div>
                    
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Skills</div>
                     <div class="panel-body">{skills}</div>
                    
                </div>
                      
                  </div>
                  <div className="col-sm-3 mt-3" style={{height: 50 +"rem"}}>
                  
                      <button type="button" className="btn btn-primary btn-block" onClick={this.handleEdit}>Edit Profile</button>
                  </div> 
              </div> 
              
  
</div> 
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

