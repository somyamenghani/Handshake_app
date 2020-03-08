import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import dummy from '../../common/dummy.png';

class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successUpdate: false,
            students:[],
            searchstring:'',
            student_profile:[]       
        };
        this.openStudent = this.openStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        this.searchStudent();
        
    }
    studentCriteria=(e)=>
    {
        this.setState({
            searchstring : e.target.value
        })
    }
    searchStudent=()=>
    {
        let data = {
            searchString:this.state.searchstring   
        }
        axios.post('http://localhost:3001/profile/searchStudents',data)
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
            this.setState({errorMessage:"Students cannot be viewed"});
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
    closeModal() {
        this.setState({
            openStudent:false
        });
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
                    <tr key={student.StudentId}>
                    <td>{student.Name}</td>
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
                            <h2>Student Search</h2>
                              
<div class="row">    
    <div class="col-xs-8 col-xs-offset-2">
        <div class="input-group">
            <div class="input-group-btn search-panel">
            </div>
            <input type="text" class="form-control" name="search" placeholder="Student Name or College Name" onChange={this.studentCriteria}/>
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" onClick={this.searchStudent}><span class="glyphicon glyphicon-search"></span></button>
            </span>
        </div>
    </div>
</div>

</div>
</div>
{studentlist}

<Modal
                            isOpen={this.state.openStudent}
                            onRequestClose={this.closeModal}
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