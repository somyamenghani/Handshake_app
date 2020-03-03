import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successUpdate: false,        
        };
    }
    componentDidMount(){
        
    }
   
    render() {
        let redirectVar;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />;
        }
       
        return (
            <div>
            {redirectVar}
           
           
           <div>student</div>
            </div>
           
            
    )
  }
}



export default StudentDashboard;