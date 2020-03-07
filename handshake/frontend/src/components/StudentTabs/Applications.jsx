import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

class Applications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications:[],
            applicationstatus:'all'
                
        };
        this.handlePending = this.handlePending.bind(this);
        this.handleReviewed = this.handleReviewed.bind(this);
        this.handleDeclined = this.handleDeclined.bind(this);
        this.handleAll = this.handleAll.bind(this);
    }
    componentDidMount(){
        this.viewApplication();
    }
    handleStatusChange=(e)=>{

        this.setState({
            applicationstatus: e.target.value
        })
        console.log(this.state.applicationstatus)
        this.viewApplication();
    }
    handlePending(){
        this.state.applicationstatus='pending'
        this.setState({
            applicationstatus:this.state.applicationstatus
            
        })
          this.viewApplication();
    }
    handleReviewed(){
        this.state.applicationstatus='reviewed'
        this.setState({
            applicationstatus:this.state.applicationstatus
            
        })
          this.viewApplication();
    }
    handleDeclined(){
        this.state.applicationstatus='declined'
        this.setState({
            applicationstatus:this.state.applicationstatus
            
        })
         this.viewApplication();
    }
    handleAll(){
        this.state.applicationstatus='all'
        this.setState({
            applicationstatus:this.state.applicationstatus
            
        })
          this.viewApplication();
    }


    viewApplication=()=>
    {
        
        let data = {
            userType:localStorage.getItem("user_type"),
            studentid:localStorage.getItem("user_id"),
            status:this.state.applicationstatus
        }
        console.log(JSON.stringify(data))
        axios.post('http://localhost:3001/jobs/getJobsApplied',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let applications=response.data;
                console.log(JSON.stringify(applications))
                this.setState({
                    applications   
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Job could not be viewed"});
        });


    }
    render() {
        let redirectVar;let applicationlist;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
       
        return (
            <div>
            {redirectVar}
            <div className="container">
        <div className="panel panel-default p50 uth-panel">
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Application Date</th>
                    <th> <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Status
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
        <li><a onClick={() => this.handleAll()}>All</a></li>
      <li><a onClick={() => this.handlePending()}>Pending</a></li>
      <li><a onClick={() => this.handleReviewed()}>Reviewed</a></li>
      <li><a onClick={() => this.handleDeclined()}>Declined</a></li>
    </ul>
  </div></th>
                    
                </tr>
            </thead>
            <tbody>
            {this.state.applications.map(application =>
                <tr>
                <td>{application.jobtitle} </td>
            <td>{application.applicationdate}</td>
            <td>{application.status}</td>
                </tr>
            )}
             </tbody>
        </table>
        </div>
        </div>
            </div>
           
            
    )
  }
}



export default Applications;