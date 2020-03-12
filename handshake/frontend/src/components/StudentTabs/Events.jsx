import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openevent: false,
            registerIsOpen:false,
            showRegisteredIsOpen:false,
            searchstring:'' ,
            events:[]  ,
            eventname:'',
            description:'',
            time:'',
            date:'',
            eligibility:'',
            city:'',
            location:'',
            eventslist:[]    
        };
        this.openEvent = this.openEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.registerEvent=this.registerEvent.bind(this);
        this.showRegistered=this.showRegistered.bind(this);
    }
    componentDidMount(){
        this.searchEvent();
        
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }

    openEvent(event){
        this.setState({
            openevent: true ,
            eventname:event.EventName,
            description:event.Description,
            time:event.Time,
            date:event.Date,
            location:event.Location,
            eligibility:event.Eligibility,
            city:event.City
        });
        
    }
    registerEvent(event){
        this.setState({
            eventid:event.EventId,
            eventname:event.EventName,
            registerIsOpen:true,
            eligibility:event.Eligibility
        });
    }
    register=()=>{
        const data = {
            studentid:localStorage.getItem("user_id"),
            eventid:this.state.eventid,
            eligibility:this.state.eligibility
        }
        axios.post('http://localhost:3001/events/register',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                alert("Registered Successfully!!");
                console.log("applied");
            }
        })
        .catch(err => { 
            alert("Could Not Register.Check Eligibility");
            this.setState({errorMessage:"Could not apply"});
        });
        this.setState({
            
            registerIsOpen:false,
           
        });
        
    }
    closeModal() {
        this.setState({
            openevent:false,
            registerIsOpen:false,
            showRegisteredIsOpen:false
        });
    }
    showRegistered=()=>{
        this.setState({
            showRegisteredIsOpen:true 
        });
        const data = {
            studentid:localStorage.getItem("user_id"),
        }
        axios.post('http://localhost:3001/events/getRegistered',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let eventslist=response.data;
                console.log(JSON.stringify(eventslist))
                this.setState({
                    eventslist  
                });
                
            }
          
        })
        .catch(err => { 
            
            this.setState({errorMessage:"Could not apply"});
        });
        
    }
    eventCriteria=(e)=>
    {
        this.setState({
            searchstring : e.target.value
        })
    }
    searchEvent=()=>
    {
        let data = {
            searchString:this.state.searchstring   
        }
        axios.post('http://localhost:3001/events/searchEvents',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let events=response.data;
                console.log(JSON.stringify(events))
                this.setState({
                    events   
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Events cannot be viewed"});
        });
    }
   
    render() {
        let redirectVar;let eventlist;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        eventlist =( <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.events.map(event =>
                        <tr key={event.EventId}>
                        <td>{event.EventName}</td>
                        <td>{event.Date}</td>
                        <td><a onClick={() => this.openEvent(event)}>View Details</a></td>
                        <td><a onClick={() => this.registerEvent(event)}>Register</a></td>
                        </tr>
                    )}
                     </tbody>
                </table>
                </div>)
       
        return (
            <div>
            {redirectVar}
            
            <div className="container">  
            <div>
  <Button variant="primary" size="lg" block onClick={() => this.showRegistered()}>
    Registered Events
  </Button>
</div>   
                        <div className="main-div">
                            <div className="panel">
                                <h2>Event Search</h2>
                                  
    <div class="row">    
        <div class="col-xs-8 col-xs-offset-2">
		    <div>
                <div class="input-group-btn search-panel">
                </div>
                <input type="text" class="form-control" name="search" placeholder="Event Title" onChange={this.eventCriteria}/>
                <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                    <button class="btn btn-primary" type="button" onClick={this.searchEvent}><span class="glyphicon glyphicon-search"></span>Search</button>
                </div>
            </div>
        </div>
	</div>
   
    
</div>
</div>
{eventlist}

<Modal
                            isOpen={this.state.openevent}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                                 <div>             
                            <div class="container">
                            <div class="panel panel-default">
                            <div class="panel-heading">Event Details </div>
                            <div class="panel-heading">Event Name: {this.state.eventname}</div>
                            <div class="panel-body">Description: {this.state.description}</div>
                            <div class="panel-body">Time: {this.state.time}</div>
                            <div class="panel-body">Date: {this.state.date}</div>
                            <div class="panel-body">Eligibility: {this.state.eligibility}</div>
                            <div class="panel-body">Location: {this.state.location}{this.state.city}</div>
                            </div>
                            </div>
                        </div>
                             
                         <center>
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                        </Modal>

                        <Modal
                            isOpen={this.state.registerIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           
                           <div>
                         
                             
            <div class="container">
            <div class="panel panel-default">
    <div class="panel-heading">Register for event: {this.state.eventname}</div>
                    
                            <center>
                                <Button variant="primary" type="button" onClick={this.register}>
                                    <b>Register</b>
                                </Button>&nbsp;&nbsp;
                                <Button variant="secondary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                       
                        </div>
                        </Modal>
                        <Modal
                        isOpen={this.state.showRegisteredIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                             <div>
                             <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.eventslist.map(event =>
                        <tr key={event.EventId}>
                        <td>{event.EventName}</td>
                        </tr>
                    )}
                     </tbody>
                </table>
                </div>
                             <center> 
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                </div>
                        </Modal>

                       
</div>
 </div>
           
            
    )
  }
}



export default Events;