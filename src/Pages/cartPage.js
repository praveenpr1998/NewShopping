import React, { Component } from "react";
import "../styles.css";
import {Table} from "react-bootstrap"
import Heading from "../components/head.jsx";
class cartPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      data:[],
      totalAmount:"0"
    }
  }

  //filtering the unique selected items and storing it in the allProducts state
  componentDidMount(){
    fetch("http://localhost:1337/products/data",{
      method:"POST",
      body:JSON.stringify({userid:localStorage.getItem("userid"),token:localStorage.getItem("token")}),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.message==="Success"){
        this.setState({data:result.data})}
        else{
          alert("Unauthorized Usage Need to Login again");
          this.props.history.push("/login")
        }
      })

    fetch("http://localhost:1337/cartitems?userid="+localStorage.getItem("userid"))
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({allProducts:result});
       this.totalAmount();
     })
  }
  
  //displaying all the unique selected items 
  display() {
    console.log(this.state.allProducts)
      if(this.state.allProducts.length>0&&this.state.data.length>0){  
      return this.state.allProducts.sort().map((data, index) => {
      const ad = this.state.data.filter(q => q.name === data.Name);
      return (
      <tr key={index} className="tab">
        <td>{ad[0].name}</td>
        <td>{ad[0].price }</td>
        <td><button className="btn btn-info btn-sm  cartButtons" type="true" value={ad[0].name} id={ad[0].id} onClick={(e)=>{this.increment(e)}}>+</button> {data.Quantity} <button button className="btn btn-info btn-sm cartButtons" button="true"  id={ad[0].id} onClick={(e)=>{(data.Quantity>1)?this.decrement(e):this.removedata(e)}}>-</button></td>
        <td><button className="btn btn-danger btn-sm  " style={{marginTop:"10px"}} value={ad[0].name} id={ad[0].id}  onClick={(e)=>{this.removedata(e)}}>Remove</button></td>
      </tr>)
      })
  }}

  //removing the item using splice method and setting the state
  removedata(e){
    fetch("http://localhost:1337/cartitems/remove/",{
      method:"POST",
      body:JSON.stringify({productId:e.target.id,userid:localStorage.getItem("userid"),token:localStorage.getItem("token")}),
    })
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({allProducts:result});
      this.totalAmount();
       })  

  }

  //copying the selecteditems value to SelectedItems array and filtering that SelectedItems array with the selected event and incrementing/decrementing the Quantity and setting back the data to local storage
  increment(e){
    fetch("http://localhost:1337/cartitems/increment/",{
      method:"POST",
      body:JSON.stringify({productId:e.target.id,userid:localStorage.getItem("userid")}),
    })
   .then(res => res.json())
   .then(
     (result) => {
      this.setState({allProducts:result});
      this.totalAmount();
       })  
       
  
  }

  //making a post request to sails cartitems controller to decrement
  // the Quantity and calling the totalAmount fucntion to update the value
  decrement(e){
    fetch("http://localhost:1337/cartitems/decrement/",{
      method:"POST",
      body:JSON.stringify({productId:e.target.id,userid:localStorage.getItem("userid")}),
    })
   .then(res => res.json())
   .then(
     (result) => {
      this.setState({allProducts:result});
    this.totalAmount()
  })  
       
  }

//counting the totalAmount with selected items data
  totalAmount(){
    fetch("http://localhost:1337/cartitems/totalAmount",{
      method:"POST",
      body:JSON.stringify({userid:localStorage.getItem("userid")})
    })
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({totalAmount:result})
     }) 
  }
  
  render() {
    return (
      <div>
    <Heading />
      <div className="cartbox">
       <h4 style={{margin:"5px"}}>Cart Items</h4><br></br>
          <Table striped bordered hover  className="tab">
            <thead>
              <tr className="tab">
                <th className="tab">ITEM NAME</th>
                <th className="tab">PRICE</th>
                <th className="tab">QUANTITY</th>
                <th className="tab">REMOVE</th>
              </tr>
            </thead>
            <tbody >
              {this.display()}
            </tbody>
          </Table>
          <div className="checkout">
          <b >Total Amount:{this.state.totalAmount}</b>
          <button  className="btn btn-danger checkout " >Checkout</button>
          </div>
        </div>
        </div>
    );
  }
}
export default cartPage;