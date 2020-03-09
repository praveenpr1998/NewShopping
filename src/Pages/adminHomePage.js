import React, { Component } from "react";
import "../styles.css";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavbarBrand,Nav} from "react-bootstrap";
class adminHomePage extends Component {
  render(){
      return(
    <div>
        <Navbar  bg="dark" variant="dark" expand="lg">
  <NavbarBrand>Shopping Cart<img src="https://img.icons8.com/doodle/48/000000/cottage--v1.png" alt="cart"></img></NavbarBrand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav " />
  <Navbar.Collapse id="responsive-navbar-nav ">
    <Nav className="ml-auto ">
      <Nav.Link href="/admin/addProducts">Add Products</Nav.Link>
      <Nav.Link href="/admin/listProducts" style={{color:"yellow"}}>List Products</Nav.Link>
      </Nav>
      </Navbar.Collapse>
</Navbar>
    </div>
      )
    }
}
export default adminHomePage;