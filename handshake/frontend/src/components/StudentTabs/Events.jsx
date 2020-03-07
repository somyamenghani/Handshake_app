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
            searchstring:'' ,
            events:[]  ,
            eventname:'',
            description:'',
            time:'',
            date:'',
            eligibility:'',
            city:'',
            location:''    
        };
        this.openEvent = this.openEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            eventid:event.EventId
        });
        
    }
    closeModal() {
        this.setState({
            openevent:false
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
                        <div className="main-div">
                            <div className="panel">
                                <h2>Event Search</h2>
                                  
    <div class="row">    
        <div class="col-xs-8 col-xs-offset-2">
		    <div class="input-group">
                <div class="input-group-btn search-panel">
                </div>
                <input type="text" class="form-control" name="search" placeholder="Event Title" onChange={this.eventCriteria}/>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" onClick={this.searchEvent}><span class="glyphicon glyphicon-search"></span></button>
                </span>
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
</div>
 </div>
           
            
    )
  }
}



export default Events;