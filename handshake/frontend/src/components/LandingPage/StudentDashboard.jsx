import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []  ,
            modalIsOpen: false, 
            addIsOpen:false,
            companyIsOpen:false,
            jobtitle: '',
            description: '',
            msg: '',
            location:'',
            searchstring:'',
            jobid: 0 ,
            categoryValue:'',
            successUpdate: false
           
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        
    }
    citySearch=(e)=>
    {
        this.setState({
            location : e.target.value
        })
    }
    jobtitleSearch=(e)=>
    {
        this.setState({
            searchstring : e.target.value
        })
    }
    handleCategoryChange=(e)=>
    {
        this.setState({
            categoryValue : e.target.value
        })

    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    openModal(job) {
        this.setState({
            modalIsOpen: true,
            jobtitle:job.jobtitle,
            description:job.description         
        });
    }
    openCompanyModal(job) {
        this.setState({
            companyIsOpen: true,
            companyId:job.CompanyId
                     
        });
        const data={userId : this.state.companyId}
        axios.post('http://localhost:3001/companyProfile',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let company_profile=response.data;
                this.setState({
                    company_profile  
                    
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Company profile could not be viewed"});
        });


        }

    searchJobPosting=()=>
    {
        let data = {
            userType:localStorage.getItem("user_type"),
            companyId:localStorage.getItem("user_id"),
            location:this.state.location,
            searchString:this.state.searchstring,
            category:this.state.categoryValue
        }
        axios.post('http://localhost:3001/jobs/searchJobs',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let jobs=response.data;
                this.setState({
                    jobs  
                    
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Job could not be viewed"});
        });


    }
   
    render() {
        let redirectVar;let joblist;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
            joblist =( <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Job Id</th>
                            <th>Company Name</th>
                            <th>Job Title</th>
                            <th>Job Description</th>
                            <th>Job Category</th>
                            <th>Job Salary</th>
                            <th>Job Location</th>
                            <th>Posting Date</th>
                            <th>Deadline</th>   
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.jobs.map(job =>
                        <tr key={job.jobid}>
                        <td>{job.jobid} </td>
                        <td><a onClick={() => this.openCompanyModal(job)}>{job.companyname}</a></td>
                        <td>{job.jobtitle} </td>
                        <td><a onClick={() => this.openModal(job)}>View Job Description</a></td>
                        <td>{job.jobcategory}</td>
                        <td>{job.salary}</td>
                    <td>{job.city} {job.state}</td>
                    <td>{job.postingdate}</td>
                    <td>{job.deadline}</td>
                        <td><a onClick={() => this.openApplyModal(job)}>Apply</a></td>
                        </tr>
                    )}
                     </tbody>
                </table>
                    <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           <div>             
                            <div class="container">
                            <div class="panel panel-default">
                            <div class="panel-heading">Job Description </div>
                            <div class="panel-heading">{this.state.jobtitle}</div>
                            <div class="panel-body">{this.state.description}</div>
                            <center> 
                                <Button variant="secondary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </div>
                        </Modal>
                    </div>
                    )
       
        return (
            <div>
            {redirectVar}
            
            <div className="container">
                    
                        <div className="main-div">
                            <div className="panel">
                                <h2>Job Search</h2>
                                  
    <div class="row">    
        <div class="col-xs-8 col-xs-offset-2">
		    <div class="input-group">
                <div class="input-group-btn search-panel">
                    <button type="button" class="btn btn-default">
                    	<span id="search_concept">Filter by Job Category : 
                         <select id="search_concept" onChange={this.handleCategoryChange} value={this.state.categoryValue}>
                  <option value="">All</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="on-campus">On-Campus</option>
                  <option value="intern">Intern</option>
               </select>
               </span> 
               
                    </button>
                  
                </div>
             
                <input type="text" class="form-control" name="jobtitle" placeholder="Job Title..." onChange={this.jobtitleSearch}/>
   
                <input type="text" class="form-control" name="city" placeholder="City" onChange={this.citySearch}/>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" onClick={this.searchJobPosting}><span class="glyphicon glyphicon-search"></span></button>
                </span>
            </div>
        </div>
	</div>
    
</div>
</div>
{joblist}
</div>
          
            </div>
           
            
    )
  }
}



export default StudentDashboard;