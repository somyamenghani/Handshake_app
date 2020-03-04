import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';

class EventsCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [] ,
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
            updateFlag:false

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.closeAddModal=this.closeAddModal.bind(this);
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
        axios.post('http://localhost:3001/events/details',data)
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
        axios.post('http://localhost:3001/events',data)
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
    addEvent(){

        this.setState({
            addIsOpen: true         
        });
    }
   
    render() {
        let redirectVar;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        
       
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
    <option value="se">Software Engineering</option>
    <option value="ee">Electrical Engineering</option>
    <option value="cse">Computer Science Engineering</option>
    <option value="ie">Industrial Engineering</option>
    <option value="cie">Civil Engineering</option>
    <option value="ce">Computer Engineering</option>
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
</div>
</div>
           
            
    )
  }
}



export default EventsCompany;