import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import dummy from '../../common/dummy.png';

class CompanyDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []  ,
            students:[],
        modalIsOpen: false, 
        addIsOpen:false,
        openStatus:false,
        openStudent:false,
        jobtitle: '',
        description: '',
        msg: '',
        jobid: 0 ,
        categoryValue:'full-time',
        applicationStatus:'pending',
        studentid:'',
        student_profile:[]
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeStudentModal = this.closeStudentModal.bind(this);
        this.addJobPost = this.addJobPost.bind(this);
        this.openStatus = this.openStatus.bind(this);
        this.openStudent = this.openStudent.bind(this);
    }
    componentDidMount(){
        this.viewJobPosting();   
    }
    viewJobPosting=()=>
    {
        
        let data = {
            userType:localStorage.getItem("user_type"),
            companyId:localStorage.getItem("user_id")
        }
        axios.post('http://localhost:3001/jobs/getJobsPosted',data)
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

    onAddSubmit=(e)=>
    {
        e.preventDefault()
        let data = {
            userType:localStorage.getItem("user_type"),
            companyId:localStorage.getItem("user_id"),
            companyname:localStorage.getItem("user_name"),
            jobtitle:this.state.jobtitle,
            description: this.state.description,
            salary: this.state.salary,
            postingdate:this.state.postingdate,
            deadline:this.state.deadline,
            state:this.state.state,
            city:this.state.city,
            jobcategory:this.state.categoryValue
        }
        axios.post('http://localhost:3001/jobs/postJobOpening',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    addIsOpen : false
                })
            }
            this.viewJobPosting();
        })
        .catch(err => { 
            this.setState({errorMessage:"Job could not be added"});
        });


    }
    openModal(job) {
        this.setState({
            modalIsOpen: true,
                  
        });
        const data={jobid :job.jobid};
        axios.post('http://localhost:3001/jobs/getStudentApplied',data)
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
    openStudent(student){
        this.setState({
            openStudent: true ,
            studentid:student.StudentId   
        });
        const data={userId :student.StudentId};
        axios.post('http://localhost:3001/profile',data)
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
    openStatus(student) {
        this.setState({
            openStatus: true ,
            studentid:student.StudentId,
            jobid:student.jobid      
        });
    }
    onUpdateStatus=(e)=>{
        e.preventDefault()
        const data={studentid :this.state.studentid,
                    jobid:this.state.jobid,
                    status:this.state.applicationStatus      
        };
        axios.post('http://localhost:3001/jobs/updateApplicationStatus',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                alert("updated status")
                // let students=response.data;
                // console.log(JSON.stringify(students))
                this.setState({
                    openStatus:false 
                });
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Student list could not be viewed"});
        });

    }
    handleStatusChange=(e)=>{

        this.setState({
            applicationStatus: e.target.value
        })
    }
    jobTitleChange=(e)=>{
        this.setState({
            jobtitle : e.target.value
        })


    }
    descriptionChange = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    handleCategoryChange = (e) => {
        this.setState({
            categoryValue : e.target.value
        })
    }
    handleSalaryChange = (e) => {
        this.setState({
            salary : e.target.value
        })
    }
    handleCityInfoChange = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    handleStateInfoChange = (e) => {
        this.setState({
            state: e.target.value
        })
    }
    handleDeadlineChange = (e) => {
        this.setState({
            deadline: e.target.value
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            addIsOpen: false
            
        });
    }
    closeStudentModal() {
        this.setState({
            openStatus:false,
            openStudent:false
        });
    }
    
    addJobPost(){

        this.setState({
            addIsOpen: true,          
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
                     </tbody>
                </table>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           
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
                        <td><a onClick={() => this.openStatus(student)}>Update Application Status</a></td>
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

                        <Modal
                            isOpen={this.state.openStatus}
                            onRequestClose={this.closeStudentModal}
                             contentLabel="Example Modal" >
                            
                         <form onSubmit={this.onUpdateStatus}>
                         <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Application Status</b></span>
                                </div>
                                <select value={this.state.applicationStatus} onChange={this.handleStatusChange}  className="form-control" aria-label="category" aria-describedby="basic-addon1"  required >
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="declined">Declined</option>
                                </select>
                            </div>
                            <center>
                            <Button variant="primary" type="submit">
                                    <b>Update Status</b>
                                    </Button>
                                <Button variant="primary" onClick={this.closeStudentModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </form>
                    
                        </Modal>
                        <Modal
                            isOpen={this.state.openStudent}
                            onRequestClose={this.closeStudentModal}
                             contentLabel="Example Modal" >
                                 <div className="row mt-3">
                  <div className="col-sm-4">
                      <div className="card" style={{width: 15 +"rem"}}>
                          <img className="card-img-top" src={dummy} alt="" />
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
                                <input type="text" size="50" name="state" className="form-control" aria-label="city" aria-describedby="basic-addon1" onChange={this.handleStateInfoChange}   pattern=".*\S.*" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Posting Date</b></span>
                                </div>
                                <input type="text" size="50" name="postingDate" className="form-control" aria-label="postingDate" aria-describedby="basic-addon1" onChange={this.handlePostingDtaeChange}   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD" title="Enter a date in this formart YYYY-MM-DD" required />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Deadline</b></span>
                                </div>
                                <input type="text" size="50" name="deadline" className="form-control" aria-label="deadline" aria-describedby="basic-addon1" onChange={this.handleDeadlineChange}   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD" title="Enter a date in this formart YYYY-MM-DD" required />
                            </div>
                            
                            
                            <center>
                                <Button variant="primary" type="submit">
                                    <b>Add</b>
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
        </div>
        </div>
        );
    }
}
           
export default CompanyDashboard;