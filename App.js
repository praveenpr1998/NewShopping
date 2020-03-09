import React from "react";
import Home from "./Pages/homePage.js";
import Body from "./Pages/productsPage.js";
import Foot from "./components/footer.jsx";
import Signup from "./Pages/signup.js";
import Login from "./Pages/login.js";
import adminLogin from "./Pages/adminLogin.js";
import adminaddProducts from "./Pages/adminaddProducts.js";
import adminlistProducts from "./Pages/adminlistProducts.js";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Cart from "./Pages/cartPage.js";
import "react-bootstrap";
import "./styles.css";
import adminHomePage from "./Pages/adminHomePage.js";
function App(){
  return (
    <div>
    <Router>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/home" component={Body}/>
    <Route exact path="/cart" component={Cart}/>
    <Route exact path="/admin" component={adminLogin}/>
    <Route exact path="/admin/home" component={adminHomePage}/>
    <Route exact path="/admin/addProducts" component={adminaddProducts}/>
    <Route exact path="/admin/listProducts" component={adminlistProducts}/>
    <Route render={
      ()=>
        <div><h>404 Not Found </h></div>
    } />
    </Switch>
    </Router>
  <Foot />
  </div>
  );
}
export default App;