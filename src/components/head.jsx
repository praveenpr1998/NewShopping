import React from "react";
import "../styles.css";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavbarBrand,Nav} from "react-bootstrap";
import { Component } from "react";
class Heading extends Component {
  state={
    user:""
  }
  componentDidMount(){
    fetch("http://localhost:1337/users/finduser/",{
      method:"POST",
      body:JSON.stringify({userid:localStorage.getItem("userid")}),
    })
   .then(res => res.json())
   .then(
     (result) => {
      this.setState({user:result});
       })  
  }
  render(){
  return (
    <div className="NavBar ">
<Navbar  bg="dark" variant="dark" expand="lg">
  <NavbarBrand>Shopping Cart<img src="https://img.icons8.com/doodle/48/000000/cottage--v1.png" alt="cart"></img></NavbarBrand>
 <div style={{"color": "white"}}>&nbsp;Hello {this.state.user} !</div>
 <Navbar.Toggle aria-controls="responsive-navbar-nav " />
  <Navbar.Collapse id="responsive-navbar-nav ">
    <Nav className="ml-auto ">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/cart" style={{color:"yellow"}}>My Cart</Nav.Link>
      <Nav.Link href="/login" style={{color:"Red"}}>Logout</Nav.Link>
      </Nav>
      </Navbar.Collapse>
</Navbar>
      </div>
  );}
}
export default Heading;
