import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import dummy from '../../common/dummy.png';

class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []  ,
            modalIsOpen: false, 
            addIsOpen:false,
            companyIsOpen:false,
            applyIsOpen:false,
            jobtitle: '',
            description: '',
            msg: '',
            location:'',
            searchstring:'',
            jobid: 0 ,
            categoryValue:'',
            successUpdate: false,
            company_profile:[],
            jobid:''
           
        };
        this.openModal = this.openModal.bind(this);
        this.openCompanyModal = this.openCompanyModal.bind(this);
        this.openApplyModal = this.openApplyModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.searchJobPosting();
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
            modalIsOpen: false,
            companyIsOpen:false,
            applyIsOpen:false
        });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', this.state.userResume);
        data.append('studentid',localStorage.getItem("user_id"));
        data.append('jobid',this.state.jobid);
        data.append('jobtitle',this.state.jobtitle);

        axios.post('http://localhost:3001/jobs/applyJob',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                alert("Applied Successfully");
                this.setState({
                    applyIsOpen:false  
                });
                console.log("applied");

            }
        })
        .catch(err => { 
            alert("Already applied for job")
            this.setState({errorMessage:"Could not apply"});
        });
    }
    openModal(job) {
        this.setState({
            modalIsOpen: true,
            jobtitle:job.jobtitle,
            description:job.description         
        });
    }
    openApplyModal(job) {
        this.setState({
            applyIsOpen: true,
            jobid:job.jobid,
            jobtitle:job.jobtitle
           
        });
    }
    openCompanyModal(job) {
        this.setState({
            companyIsOpen: true,
           
        });
       
        const data={userId :job.CompanyId};
        axios.post('http://localhost:3001/companyProfile',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let company_profile=response.data;
                console.log(JSON.stringify(company_profile))
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
    handleResumeChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            userResume: e.target.files[0]
        });
    };
   
    render() {
        let redirectVar;let joblist;let company,name;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
        let userImage=this.state.company_profile.image||dummy;
console.log(this.state.company_profile.name);
        if (this.state && this.state.company_profile) {
            company = this.state.company_profile;
            name = company.name;
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
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </div>
                        </Modal>
                        <Modal
                            isOpen={this.state.companyIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           <div>             
                            <div class="container">
                            <div className="row mt-3">
                      <div className="col-sm-4">
                          <div className="card" style={{width: 15 +"rem"}}>
                              <img className="card-img-top" src={userImage} alt="" />
                              <div className="text-center">
                              <div className="card-body">

                              <div class="panel panel-default">
                        <div class="panel-heading">Contact</div>
                        <a>
                        <i class="glyphicon glyphicon-envelope"></i>
                        <div class="panel-body">{this.state.company_profile.emailId}</div>
                        </a>
                        </div>
                           </div>
                          </div>
                          </div>
                      </div>
                      
                      <div className="col-sm-7">
                      <div class="panel panel-default">
                     
                        <div class="panel-heading">Name</div>
                        <div class="panel-body">{this.state.company_profile.name}</div>
                        
                        
                    </div>
                        
                    <div class="panel panel-default">
                        <div class="panel-heading">Location</div>
                        <div class="panel-body">{this.state.company_profile.location}</div>
                       
                        
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">Description</div>
                        <div class="panel-body">{this.state.company_profile.description}</div>
          
                        
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">ContactInfo</div>
                        <div class="panel-body">{this.state.company_profile.contactInfo}</div>
                    </div>    
                      </div>  
                  </div> 
                            <center> 
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            
                        </div>
                        </Modal>
                        <Modal
                            isOpen={this.state.applyIsOpen}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal"
                              >
                           
                           <div>
                         <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                             
            <div class="container">
            <div class="panel panel-default">
    <div class="panel-heading">Apply for job:{this.state.jobtitle}</div>
                    <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Add Resume</b></span>
                                </div>
                                <input type="file" name="user_resume" accept="application/pdf" className="form-control" aria-label="resume" aria-describedby="basic-addon1" onChange={this.handleResumeChange} />
                            </div>
                            <center>
                                <Button variant="primary" type="submit">
                                    <b>Submit</b>
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
                    )
       
        return (
            <div>
            {redirectVar}
            
            <div className="container">
                    
                        
                            <div className="panel">
                                <h2>Job Search</h2>
                                  
    <div class="row">    
        <div class="col-xs-8 col-xs-offset-2">
		    <div class="main-div">
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
                <input type="text" class="form-control" name="jobtitle" placeholder="Job Title or Company Name" onChange={this.jobtitleSearch}/>
                <input type="text" class="form-control" name="city" placeholder="City" onChange={this.citySearch}/>
                <div  style={{display: "flex",justifyContent: "center",alignItems: "center"}} >
                    <button class="btn btn-primary" type="button" onClick={this.searchJobPosting}><span class="glyphicon glyphicon-search"></span>Search</button>
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