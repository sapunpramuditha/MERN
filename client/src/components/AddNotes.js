import React, { Component } from 'react'
import Container  from "react-bootstrap/Container";
import axios from 'axios';

export default class Adduser extends Component {

    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            date:"",
            time:""  
        }
    }

    handleInputChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {title,description,date,time} = this.state;
        const data = {
            title:title,
            description:description,
            date:date,
            time:time
        }
        console.log(data);

        axios.post("http://localhost:5000/StudentNote/add",data).then((res) => {
            if(res.data.success){
                alert("StudentNote Added Successfully!")
                this.setState(
                    {
                        title:"",
                        description:"",
                        date:"",
                        time:""
                        
                    }
                )
            }
        })
    }

    render() {
        return (
            <Container>
                <div class="row">
            <div class="col">
    <img className="img2" src="img2.png" alt=''/>
        </div>
        <div class="col">
                <br></br><br></br><h4>Add Note</h4><br></br><hr></hr><br></br>
            <form className="row g-3">

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Note Title</label>
                        <input type="text" className="form-control" name="title" placeholder="Enter product title..."
                            value={this.state.title}
                            onChange={this.handleInputChange} />
                    </div><br></br><br></br>
                    </div>
                    <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Note Description</label>
                        <input type="text" className="form-control" name="description" placeholder="Write about product..."
                            value={this.state.description}
                            onChange={this.handleInputChange} />
                    </div>

                    <br/><br/>
                    </div>
                    <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Note Date</label>
                        <input type="date" className="form-control" name="date" placeholder="Note Date..."
                            value={this.state.productqty}
                            onChange={this.handleInputChange} />
                    </div>

                    <br/><br/>
                    </div>
                    <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Note Time</label>
                        <input type="time" className="form-control" name="time" placeholder="Note Time..."
                            value={this.state.productcolor}
                            onChange={this.handleInputChange} />
                    </div>

                   

                    <br/><br/>
                    </div>
                    <hr/>
                    <br></br><br></br>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Note</button>
                        <a href="/allnotes" className="btn btn-danger my-2">
          View My Note

        </a>
                    </div>
                    
            </form></div></div>
            
            <br/><br/><br/><br/>
            </Container>
            
        )
    }
}