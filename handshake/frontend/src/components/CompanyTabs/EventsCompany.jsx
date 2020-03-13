import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import dummy from '../../common/dummy.png';
import {backendURI} from '../../common/config';

class EventsCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [] ,
            students:[],
            successUpdate: false,
            addIsOpen:false  ,
            modalIsOpen: false,
            categoryValue:'all',
            eventName:'',
            description:'',
            time:'',
            date:'',
            location:'',
            city:'',
            updateFlag:false,
            openStudent:false,
            student_profile:[]

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.closeAddModal=this.closeAddModal.bind(this);
        this.closeStudentModal = this.closeStudentModal.bind(this);
    }
    componentDidMount(){
        this.viewEvents();
        
    }

    viewEvents=()=>
    {
        
        let data = {
            userType:localStorage.getItem("user_type"),
            companyId:localStorage.getItem("user_id")
        }
        axios.post(backendURI+'/events/details',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let events=response.data;
                
                this.setState({
                    events
                   
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Event could not be added"});
        });


    }

    handleCategoryChange =(e)=>{
        this.setState({
            categoryValue : e.target.value
        })

    }
    eventNameChangeHandler = (e) => {
        this.setState({
            eventName : e.target.value
        })
    }
    descriptionChangeHandler = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    timeChangeHandler = (e) => {
        this.setState({
            time : e.target.value
        })
    }
    dateChangeHandler = (e) => {
        this.setState({
            date : e.target.value
        })
    }
    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }
    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }
    onAddSubmit=(e)=>
    {
        e.preventDefault()
        let data = {
            userType:localStorage.getItem("user_type"),
            companyId:localStorage.getItem("user_id"),
            eventName:this.state.eventName,
            description: this.state.description,
            time: this.state.time,
            date:this.state.date,
            location:this.state.location,
            city:this.state.city,
            eligibility:this.state.categoryValue
        }
        axios.post(backendURI+'/events',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    addIsOpen : false
                })
            }
            this.viewEvents();
        })
        .catch(err => { 
            this.setState({errorMessage:"Event could not be added"});
        });


    }

    openModal(event) {
        this.setState({
            modalIsOpen: true,       
        });
        const data={eventid :event.EventId};
        axios.post(backendURI + '/events/getStudentApplied',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let students=response.data;
                console.log(JSON.stringify(students))
                this.setState({
                    students 
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Student list could not be viewed"});
        });

    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    closeAddModal() {
        this.setState({
            addIsOpen: false
        });
    }
    closeStudentModal() {
        this.setState({
            openStudent:false
        });
    }
    addEvent(){

        this.setState({
            addIsOpen: true         
        });
    }
    openStudent(student){
        this.setState({
            openStudent: true ,
            studentid:student.StudentId   
        });
        const data={userId :student.StudentId};
        axios.post(backendURI + '/profile',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let student_profile=response.data;
                console.log(JSON.stringify(student_profile))
                this.setState({
                    student_profile  
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Student profile profile could not be viewed"});
        });
    }
   
    render() {
        let redirectVar;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        let userImage=this.state.student_profile.image||dummy;
        
       
        return (
            <div>
            {redirectVar}
           <div className="panel panel-default p50 uth-panel">
            <div class="panel-heading clearfix">
            <button type="button" class="btn btn-primary btn-block pull-right" onClick={this.addEvent}>Add Events</button>
             </div>
             <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Event Id</th>
                            <th>Event Name</th>
                            <th>Event Description</th>
                            <th>Eligibility</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>City</th>
                            <th>Date</th> 
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.events.map(event =>
                        <tr key={event.EventId}>
                        <td>{event.EventId} </td>
                        <td>{event.EventName} </td>
                        <td>{event.Description}</td>
                        <td>{event.Eligibility}</td>
                        <td>{event.Time}</td>
                        <td>{event.Location}</td>
                        <td>{event.City}</td>
                        <td>{event.Date}</td>

                        <td><a onClick={() => this.openModal(event)}>View Students Applied</a></td>
                        </tr>
                    )}
                      <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >       
                     <div>
                     Student Details
                    </div>
                    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map(student =>
                        <tr key={student.StudentId}>
                        <td>{student.Name} </td>
                        <td><a onClick={() => this.openStudent(student)}>View Profile</a></td>
                        
                        </tr>
                    )}
                     </tbody>
                </table>
                            <center>
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                       
                        </Modal>
                    </tbody>
                </table>
        
            

<Modal
isOpen={this.state.addIsOpen}
onRequestClose={this.closeAddModal}
 contentLabel="Example Modal" >

<div>
<form onSubmit={this.onAddSubmit}>
 
<div class="container">
<div class="panel panel-default">
<div class="panel-heading">Event Details</div>
<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>Event Name</b></span>
    </div>
    <input type="text" size="50" name="eventName" className="form-control" aria-label="eventName" aria-describedby="basic-addon1" onChange={this.eventNameChangeHandler}   pattern=".*\S.*" title="Event name cannot be spaces" required />
</div>

<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>Event Description</b></span>
    </div>
    <input type="text" size="50" name="description" className="form-control" aria-label="description" aria-describedby="basic-addon1" onChange={this.descriptionChangeHandler} 
     pattern=".*\S.*" required />
</div>
<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>Eligibility</b></span>
    </div>
    <select value={this.state.categoryValue} onChange={this.handleCategoryChange}  className="form-control" aria-label="category" aria-describedby="basic-addon1"  required >
    <option value="all">All</option>
    <option value="Software Engineering">Software Engineering</option>
    <option value="Electrical Engineering">Electrical Engineering</option>
    <option value="Computer Science Engineering">Computer Science Engineering</option>
    <option value="Industrial Engineering">Industrial Engineering</option>
    <option value="Civil Engineering">Civil Engineering</option>
    <option value="Computer Engineering">Computer Engineering</option>
    </select>
</div>
<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>Time</b></span>
    </div>
    <input type="text" size="50"   name="time" className="form-control" aria-label="time" aria-describedby="basic-addon1"  onChange={this.timeChangeHandler} pattern=".*\S.*" required />
</div>
<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>City</b></span>
    </div>
    <input type="text" size="50" name="city" className="form-control" aria-label="city" aria-describedby="basic-addon1" onChange={this.cityChangeHandler}   pattern=".*\S.*" required />
</div>
<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>Location</b></span>
    </div>
    <input type="text" size="50" name="location" className="form-control" aria-label="location" aria-describedby="basic-addon1" onChange={this.locationChangeHandler}   pattern=".*\S.*" required />
</div>
<div className="input-group mb-2">
    <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><b>Date</b></span>
    </div>
    <input type="text" size="50" name="Date" className="form-control" aria-label="Date" aria-describedby="basic-addon1" onChange={this.dateChangeHandler}   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD" title="Enter a date in this formart YYYY-MM-DD" required />
</div>

<center>
    <Button variant="primary" type="submit">
        <b>Add</b>
    </Button>&nbsp;&nbsp;
    <Button variant="secondary" onClick={this.closeAddModal}>
        <b>Close</b>
    </Button>
</center>
</div>
</div>
</form>
</div>

</Modal>
<Modal
                            isOpen={this.state.openStudent}
                            onRequestClose={this.closeStudentModal}
                             contentLabel="Example Modal" >
                                 <div className="row mt-3">
                  <div className="col-sm-4">
                      <div className="card" style={{width: 15 +"rem"}}>
                          <img className="card-img-top" src={userImage} alt="" />
                          <div className="text-center">
                          <div className="card-body">
                          <div class="panel panel-default">
                    <div class="panel-heading">Contact</div>
                    <div class="panel-body">{this.state.student_profile.emailId}</div>
                    <div class="panel-body">{this.state.student_profile.contactNumber}</div>
                    <div class="panel-body">{this.state.student_profile.city}</div>
                    <div class="panel-body">{this.state.student_profile.state}</div>
                    <div class="panel-body">{this.state.student_profile.country}</div>
                    </div>
                       </div>
                      </div>
                      </div>
                  </div>
                  
                  <div className="col-sm-7">
                  <div class="panel panel-default">
                    <div class="panel-heading">About</div>
                    <div class="panel-body">{this.state.student_profile.name}</div>
                </div>
                    
                    <div class="panel panel-default">
                    <div class="panel-heading">My Journey</div>
                 <div class="panel-body">{this.state.student_profile.careerObj}</div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Educational Details(Current)</div>
                     <div class="panel-body">{this.state.student_profile.collegeName}</div>
                     <div class="panel-body">{this.state.student_profile.collegeLocation}</div>
                     <div class="panel-body">{this.state.student_profile.major}</div>
                     <div class="panel-body">{this.state.student_profile.degree}</div>
                     <div class="panel-body">{this.state.student_profile.cgpa}</div>
                     <div class="panel-body">{this.state.student_profile.yop}</div>
                    
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Experience Details</div>
        <div class="panel-body">{this.state.student_profile.workDetails}</div>
                    
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Skills</div>
                     <div class="panel-body">{this.state.student_profile.skills}</div>
                    
                </div>
                      
                  </div>
              </div>     
                         <center>
                                <Button variant="primary" onClick={this.closeStudentModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                        </Modal>
</div>
</div>
           
            
    )
  }
}



export default EventsCompany;