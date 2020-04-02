import React, { Component } from "react";
import "../styles.css";
import { Card } from "react-bootstrap";
import Heading from "../components/head.jsx";
import Description from "../components/description.jsx";
import PopUp from "../components/PopUp.jsx";

class Body extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      descriptionValue: "",
      products: [],
      filteredCat: [],
      allCat: [],
      modalShow: false,
      modalPop:false
    }  
  }
  componentDidMount() {
   //retrieving uique category names from the json file and storing in 2 states (filteredCat is used after clicking the checkbox, allCat is used to diplay all the categories left side os page)
   fetch("http://localhost:1337/products/data",{
       method:"POST",
    body:JSON.stringify({userid:localStorage.getItem("userid"),token:localStorage.getItem("token")}),
 }).then(res => res.json())
   .then(
     (result) => {
       console.log(result.message )
       if(result.message==="Success"){
       this.setState({products:result.data})
   const allCat = [...new Set(this.state.products.map(data => data.category))]
   this.setState({ allCat: allCat, filteredCat: allCat })}
        else{
          alert("Unauthorized Usage Need to Login again");
          this.props.history.push("/login")
        }
     })
}

  //updating the searchValue state when user searches
  onSearch(e) {
    this.setState({ searchValue: e.target.value })
  }

  //on clicking a checkbox concatenate that value to filteredCat state /unchecking
  // the checkbox will remove the value from filteredcat state 
  onChangecheckbox(e) {
    if (e.target.checked === false) {
      var tempArray = [...this.state.filteredCat];
      var index = tempArray.indexOf(e.target.value)
      if (index !== -1) {
        tempArray.splice(index, 1);
        this.setState({ filteredCat: tempArray });
      }
    }
    else {
      this.setState({ filteredCat: this.state.filteredCat.concat(e.target.value)})
    }
  } 

  //get pre existing data from sails storage and push new added product data using an array object
  additems(e,rs){
    fetch("http://localhost:1337/cartitems/add/",{
      method:"POST",
      body:JSON.stringify({Name:e.target.value,Quantity:"1",price:rs,productId:e.target.id,userid:localStorage.getItem("userid"),token:localStorage.getItem("token")}),
    })
   .then(res => res.json())
   .then(
     (result) => {
       if(result.message !== "Success"){
        alert("Unauthorized Usage Need to Login again");
        this.props.history.push("/login")
       }
     });
  }

  //to display all the unique categories in left side column using allCat state object 
  displayCategories(){
    return(
      this.state.allCat.sort().map((data,i) => {
        return (<div key={i}><input type="checkbox" value={data} defaultChecked={true} onClick={e => { this.onChangecheckbox(e) }} />{data}<br></br></div>);
      })
    )
  }

  //map all the filtered categories and filter relevant data with search filter and displaying in card format
  displayAllData(){
    return(
      this.state.filteredCat.sort().map((Category,i) => {
      const ad = this.state.products.filter(x => { return x.category === Category });
      const add = ad.filter(data => {
        return data.name.toLowerCase().indexOf(this.state.searchValue) !== -1;
      });
    return (
        <div className="allItems" key={i}>
            {add.length>0?<b>{Category}</b>:null}   
          <div className="row " >
         
            {add.map((xx,i) => {
              return (
                <div key={i} className="col-lg-3 col-md-5 col-sm-4" style={{margin:"10px"}}>
                  <Card  className="cartItems" >
                    <Card.Body>
                      <p style={{ textAlign: "center" }}>{xx.name}&nbsp;&nbsp; 
                    <button className="btn btn-sm btn-warning cartButtons" onClick={() => { this.setState({ modalShow: true, descriptionValue: xx.name }) }}>i</button> </p>
                      <p style={{ textAlign: "center" }} >RS  :{xx.price}      <button  className="btn btn-sm btn-danger " value={xx.name} id={xx.id} onClick={(e)=>{this.additems(e,xx.price);this.setState({modalPop:true});setTimeout(()=>{this.setState({modalPop:false})},500);}}>  Add</button></p>
                    </Card.Body>
                  </Card>
                </div>
              )
            })}

          </div>
        </div>)
    }) 
  )
  }

  //Description component to display products description as modal pop up 
  //and PopUp component to indicate when a product is added clciking add button 
  popUp(){
    return(<div>
      <Description name={this.state.descriptionValue} show={this.state.modalShow} onHide={() => { this.setState({ modalShow: false, descriptionValue: "" }) }} />
      <PopUp show={this.state.modalPop} /></div>)
  }

  render() {
    return (     
      <div>
    <Heading />
        <div className="row">
          <div className="column aa">
            <div className="Catt">
              <h6 >Categories</h6><br></br>
                    {this.displayCategories()}
                    
            </div>
          </div>
          <div className="column bb">
            <div className="search">
              <input type="textbox" placeholder="Search Items" autoFocus={true} onChange={e => { this.onSearch(e) }}></input>
            </div>
            {this.displayAllData()}
             </div>
        </div>
        {this.popUp()}
      </div>
    );
  }
}
export default Body;
