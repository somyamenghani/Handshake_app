import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import Validation from 'react-validation';

class CompanyDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [{jobid:'7',companyid:'10001',jobtitle:'Software Engineer',postingdate:'2020-03-01 03:35:36',deadline:'2020-12-01',city:'santa clara',state:'CA',salary:'100000',description:'new engineer',jobcategory:'full-time'},
            {jobid:'8',companyid:'10001',jobtitle:'Software Engineer',postingdate:'2020-03-01 03:35:36',deadline:'2020-12-01',city:'santa clara',state:'CA',salary:'100000',description:'new engineer',jobcategory:'part-time'},
            {jobid:'9',companyid:'10001',jobtitle:'Software Engineer test',postingdate:'2020-03-01 03:35:36',deadline:'2020-12-01',city:'santa clara',state:'CA',salary:'100000',description:'new engineer',jobcategory:'full-time'}
        
        ]  ,
        modalIsOpen: false, 
        addIsOpen:false,
        jobTitle: '',
        description: '',
        msg: '',
        jobId: 0 ,
        value: 'full-time'            
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.logChange = this.logChange.bind(this); 
        this.addJobPost = this.addJobPost.bind(this);
        this.closeAddModal=this.closeAddModal.bind(this);
    }
    componentDidMount(){
        
    }
    openModal(job) {
        this.setState({
            modalIsOpen: true,
             jobId:job.jobid,
            jobTitle:job.jobtitle,
            description:job.description
            // category=job.category,    
            // salary=job.salary,
            // city=job.city,
            // state=job.state,       
            // postingdate =job.postingdate,
            // deadline=job.deadline
                    
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

    logChange(e) {
        this.setState({
           
        });
        console.log("log");
    }
    addJobPost(){

        this.setState({
            addIsOpen: true,          
        });
    }
    handleEdit(event) {
        //Edit functionality
        event.preventDefault()
        var data = {
            jobId: this.state.jobId,
            jobTitle: this.state.jobTitle,
            description: this.state.description
        }
       
        data = "success";
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been edited."
                });
            }
        
    }
   
    render() {
        let redirectVar;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        console.log(this.state.jobs)
       
        return (
            <div>
            {redirectVar}
            <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
            <div class="panel-heading clearfix">
            {/* <div class="panel-title pull-left" >Job Posting</div> */}
            <button type="button" class="btn btn-primary btn-block pull-right" onClick={this.addJobPost}>Add job post</button>
        </div>
        
            
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Job Id</th>
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
                        <td>{job.jobtitle} </td>
                        <td>{job.description}</td>
                        <td>{job.jobcategory}</td>
                        <td>{job.salary}</td>
                    <td>{job.city} {job.state}</td>
                    <td>{job.postingdate}</td>
                    <td>{job.deadline}</td>

                        <td><a onClick={() => this.openModal(job)}>View Students Applied</a></td>
                        </tr>
                    )}

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           
                           <div>
                         <form onSubmit={this.onSubmit}>
                             
            <div class="container">
            <div class="panel panel-default">
                    <div class="panel-heading">Job Details</div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Job Title</b></span>
                                </div>
                                <input type="text" size="50" name="jobTitle" className="form-control" aria-label="jobTitle" aria-describedby="basic-addon1" onChange={this.jobTitleChange}   pattern=".*\S.*" title="Company name cannot be spaces" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Job Description</b></span>
                                </div>
                                <input type="text" size="50" name="location" className="form-control" aria-label="location" aria-describedby="basic-addon1" onChange={this.descriptionChange} 
                                 pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Job Salary</b></span>
                                </div>
                                <input type="email" size="50" name="email_id" className="form-control" aria-label="Email" aria-describedby="basic-addon1"  readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Description</b></span>
                                </div>
                                <input type="textarea"style={{ height: 200 ,width:400}}   name="description" className="form-control" aria-label="description" aria-describedby="basic-addon1"  onChange={this.handleDescriptionChange} pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Contact Information</b></span>
                                </div>
                                <input type="text" size="50" name="contactInfo" className="form-control" aria-label="contactInfo" aria-describedby="basic-addon1" onChange={this.handleContactInfoChange}   pattern=".*\S.*" required />
                            </div>
                            
                            
                            <center>
                                <Button variant="primary" type="submit">
                                    <b>Update</b>
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
                    <div class="panel-heading">Job Post Details</div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Job Title</b></span>
                                </div>
                                <input type="text" size="50" name="jobTitle" className="form-control" aria-label="jobTitle" aria-describedby="basic-addon1" onChange={this.jobTitleChange}   pattern=".*\S.*" title="Job Title cannot be spaces" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Job Description</b></span>
                                </div>
                                <input type="text" size="50" name="description" className="form-control" aria-label="description" aria-describedby="basic-addon1" onChange={this.descriptionChange} 
                                 pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Job Category</b></span>
                                </div>
                                <select value={this.state.categoryValue} onChange={this.handleCategoryChange}  className="form-control" aria-label="category" aria-describedby="basic-addon1"  required >
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                                <option value="on-campus">On Campus</option>
                                <option value="intern">Intern</option>
                                </select>
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Salary</b></span>
                                </div>
                                <input type="text" size="50"   name="salary" className="form-control" aria-label="salary" aria-describedby="basic-addon1"  onChange={this.handleSalaryChange} pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>City</b></span>
                                </div>
                                <input type="text" size="50" name="city" className="form-control" aria-label="city" aria-describedby="basic-addon1" onChange={this.handleCityInfoChange}   pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>State</b></span>
                                </div>
                                <input type="text" size="50" name="state" className="form-control" aria-label="city" aria-describedby="basic-addon1" onChange={this.handleCityInfoChange}   pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Posting Date</b></span>
                                </div>
                                <input type="text" size="50" name="postingDate" className="form-control" aria-label="postingDate" aria-describedby="basic-addon1" onChange={this.handleCityInfoChange}   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD" title="Enter a date in this formart YYYY-MM-DD" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Deadline</b></span>
                                </div>
                                <input type="text" size="50" name="deadline" className="form-control" aria-label="deadline" aria-describedby="basic-addon1" onChange={this.handleCityInfoChange}   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD" title="Enter a date in this formart YYYY-MM-DD" required />
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
        </div>
        );
    }
}
           
export default CompanyDashboard;