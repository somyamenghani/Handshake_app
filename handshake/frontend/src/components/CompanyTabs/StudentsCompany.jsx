import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

class StudentsCompany extends Component {
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
            
            
    <div class="row">    
        <div class="col-xs-8 col-xs-offset-2">
		    <div class="input-group">
                <div class="input-group-btn search-panel">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    	<span id="search_concept">Filter by</span> <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="#contains">Student Name</a></li>
                      <li><a href="#its_equal">College Name</a></li>
                      <li><a href="#greather_than">Skills</a></li>
                    </ul>
                </div>
                <input type="hidden" name="search_param" value="all" id="search_param"/>         
                <input type="text" class="form-control" name="x" placeholder="Search term..."/>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                </span>
            </div>
        </div>
	</div>

           
            </div>
           
            
    )
  }
}



export default StudentsCompany;