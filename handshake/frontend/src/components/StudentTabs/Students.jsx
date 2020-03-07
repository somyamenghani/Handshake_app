import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successUpdate: false,        
        };
    }
    componentDidMount(){
        
    }
   
    render() 
    { let redirectVar;let studentlist;
    if (!localStorage.getItem("token")) {
        redirectVar = <Redirect to="/login" />;
    }
    studentlist =( <div className="panel panel-default p50 uth-panel">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>College Name</th>
                        <th>Major</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.students.map(student =>
                    <tr key={student.EventId}>
                    <td>{student.StudentName}</td>
                    <td>{student.CollegeName}</td>
                    <td>{student.Major}</td>
                    <td><a onClick={() => this.openStudent(student)}>View Student Details</a></td>
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
{studentlist}

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



export default Students;