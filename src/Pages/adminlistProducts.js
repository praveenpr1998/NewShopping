import React, { Component } from "react";
import Heading from "./adminHomePage.js";
import "../styles.css";
class adminlistProducts extends Component {
 
    state={
        products:[]
    }

    componentDidMount() {
        //retrieving uique category names from the json file and storing in 2 states (filteredCat is used after clicking the checkbox, allCat is used to diplay all the categories left side os page)
        fetch("http://localhost:1337/products/data",{
            method:"POST",
         body:JSON.stringify({userid:localStorage.getItem("userid"),token:localStorage.getItem("token")}),
      }).then(res => res.json())
        .then(
          (result) => {
            if(result.message==="Success"){
            this.setState({products:result.data})}
             else{
               alert("Unauthorized Usage Need to Login again");
               this.props.history.push("/login")
             }
          })
          
     }

     onDelete(e){

        fetch("http://localhost:1337/products/delete",{
            method:"POST",
         body:JSON.stringify({id:e.target.id,userid:localStorage.getItem("userid"),token:localStorage.getItem("token"),id:e.target.id}),
      }).then(res => res.json())
        .then(
          (result) => {
            if(result.message==="Success"){ 
            this.setState({products:result.data})
            }
             else{
               alert("Unauthorized Usage Need to Login again");
               this.props.history.push("/login")
             }
          })
     }

     display(){
         return(
        this.state.products.map((data,index)=>{
            return(
           <tr key={index}>
           <td>{data.category}</td>
           <td>{data.name}</td>
           <td>{data.price}</td>
           <td>
              <input type="submit" id={data.id} value="Delete" onClick={(e)=>{this.onDelete(e)}} class="btn btn-danger" />
           </td>
       </tr>)
       })
    )
       
 
     }

render(){
    return(
        
        <div>
            <Heading/>

       <h1 class="display-4">Products</h1>
       <table class="table table-striped">
           <thead>
               <tr>
                   <th>Category</th>
                   <th>Name</th>
                   <th>Price</th>
                   <th></th>
               </tr>
           </thead>
           <tbody>
               {this.display()}
           </tbody>
       </table>
       
        </div>
    );
}
}
export default adminlistProducts;