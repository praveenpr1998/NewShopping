import React, { Component } from "react";
import "../styles.css";
import Heading from "./homePage.js";
class signup extends Component {
    state = {
        Name: "",
        email: "",
        password: "",
        Nameerror:"",
        Emailerror:"",
        Passworderror:"",
        alreadyUser:""
      };

    onChange(e){
        this.setState({
          [e.target.name]: e.target.value
        },
        () => {
            this.validate();
        });
      };
    
      validate = () => {
        let isError = false;
        if (this.state.Name.length <6) {
            
          isError = true;
        this.setState({
            Nameerror:'Username needs to be atleast 6 characters long'
        })
        }else{this.setState({
            Nameerror:''})}
    
         if (this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1) {
          isError = true;
          this.setState({
              Emailerror:"Requires Valid Email"
          })}else{this.setState({
            Emailerror:''})}
          
          if (this.state.password.length<3) {
            isError = true;
            this.setState({
                Passworderror:"Password needs to be atleast 3 characters long"
            })}else{this.setState({
                Passworderror:''})}
            
    
        return isError;
      };
    
      onSubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            fetch("http://localhost:1337/users/create/",{
                method:"POST",
                body:JSON.stringify({name:this.state.Name,email:this.state.email,password:this.state.password}),
                })
                .then(res => res.json())
                .then(
                (result) => {
                    if(result.message==="Success"){
                        JSON.stringify(localStorage.setItem("userid",result.userid));
                        JSON.stringify(localStorage.setItem("token",result.token));
                        this.props.history.push("/home")}
                    else if(result.message==="Exists"){
                      
                        this.setState({alreadyUser:"Email already Exists"})
                    }
            })
        }
        
      }
    
      render() {
        return (
            <div>
                <Heading />
          
        <div className="container register-form">
            <div className="form">
                <div className="note">
                    <p>SignUp Form.</p>
                </div>
                <div className="form-content">
                    <div className="row">
                        <div className="col-md-6">
                            {this.state.alreadyUser}
                        <div className="form-group">
                                <input type="text" name="Name" onChange={e => this.onChange(e)} className="form-control" placeholder="Your Name *" value={this.state.Name}  autoFocus={true}/><div style={{color:"red"}}>{this.state.Nameerror}</div>
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" onChange={e => this.onChange(e)}  className="form-control" placeholder="Your Email *" value={this.state.email}/><div style={{color:"red"}}>{this.state.Emailerror}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" name="password" onChange={e => this.onChange(e)}  className="form-control" placeholder="Your Password *" value={this.state.password}/><div style={{color:"red"}}>{this.state.Passworderror}</div>
                            </div>
                            
                        </div>
                    </div>
                    <button type="button" className="btnSubmit" onClick={(e)=>{this.onSubmit(e)}}>Login</button>
                </div>
            </div>
        </div>
    </div>
        );
      }
    }
export default signup;