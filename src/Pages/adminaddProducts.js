import React, { Component } from "react";
import Heading from "./adminHomePage.js";
import "../styles.css";
class adminaddProducts extends Component {
    state={
        category:"",
        name:"",
        price:""
    }

    onchange(e){
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    addProducts() {
        //retrieving uique category names from the json file and storing in 2 states (filteredCat is used after clicking the checkbox, allCat is used to diplay all the categories left side os page)
        fetch("http://localhost:1337/products/add",{
            method:"POST",
         body:JSON.stringify({userid:localStorage.getItem("userid"),token:localStorage.getItem("token"),category:this.state.category,name:this.state.name,price:this.state.price}),
      }).then(res => res.json())
        .then(
          (result) => {
            if(result.message==="Success"){
            this.props.history.push("/admin/listProducts")
            }
             else{
               alert("Unauthorized Usage Need to Login again");
               this.props.history.push("/login")
             }
          })
     }
render(){
    return(
        
        <div>
            <Heading/>
        <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/products/list">products</a></li>
    <li class="breadcrumb-item active">Add</li>
</ol>
<h1 class="display-4">Add Article</h1>
    <div class="form-group">
        <label for="title">Category</label>
        <input type="text" name="category" onChange={(e)=>{this.onchange(e)}} value={this.state.category}class="form-control" />
    </div>
    <div class="form-group">
        <label for="body">Name</label>
        <textarea name="name" class="form-control" onChange={(e)=>{this.onchange(e)}}value={this.state.name}></textarea>
    </div>
    <div class="form-group">
        <label for="body">Price</label>
        <textarea name="price" class="form-control"onChange={(e)=>{this.onchange(e)}}value={this.state.price}></textarea>
    </div>
    <input type="button" value="Submit" onClick={()=>{this.addProducts()}}class="btn btn-primary" />
        </div>
    );
}
}
export default adminaddProducts;