import React, { Component } from "react";
import Heading from "./homePage.js";
import "../styles.css";
class login extends Component {
    state={
        email:"",
        emailError:"",
        password:"",
        passwordError:""
    }

    onChange(e){
        this.setState({
          [e.target.name]: e.target.value
        },()=>{
    this.validate()
        });
      };
    
      validate = () => {
        let isError = false;
        if (this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1) {
            isError = true;
            this.setState({
                emailError:"Requires Valid Email"
            })}else{this.setState({
              emailError:''})}
            
            if (this.state.password.length<3) {
              isError = true;
              this.setState({
                  passwordError:"Password needs to be atleast 4 characters long"
              })}else{this.setState({
                  passwordError:''})}
              
          return isError;
        };
      
    componentDidMount(){
        localStorage.removeItem("userid");
        localStorage.removeItem("token")
    }

    handleLogin(e){
        const checkValidity=this.validate();
        if(!checkValidity){
            fetch("http://localhost:1337/users/login/",{
                method:"POST",
                body:JSON.stringify({email:this.state.email,password:this.state.password}),
            })
                .then(res => res.json())
                .then(
                (result) => {
                    if(result.message==="Success"){    
                JSON.stringify(localStorage.setItem("userid",result.userid));
                JSON.stringify(localStorage.setItem("token",result.token));
                this.props.history.push("/home")
                            }
                            else{
                            alert("Invalid Email or Password");
                            window.location.reload();
                            }
        });
        }
    }


  render(){
      return(
    <div>
        <Heading />
    
        <div className="container register-form">
            <div className="form">
                <div className="note">
                    <p>Login Form.</p>
                </div>
                <div className="form-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="email" name="email" onChange={e => this.onChange(e)} className="form-control" value={this.state.email} placeholder="Your Email *" autoFocus={true}/><div style={{color:"red"}}>{this.state.emailError}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" name="password" onChange={e => this.onChange(e)} className="form-control" value={this.state.password}placeholder="Your Password *" /><div style={{color:"red"}}>{this.state.passwordError}</div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btnSubmit" onClick={(e)=>{this.handleLogin(e)}}>Login</button>
                </div>
            </div>
        </div>
    </div>
      )
  }
}
export default login;