
import React, { Component } from "react";

import { Modal } from "react-bootstrap";

class PopUp extends Component{

    render(){
      return <div>
      <Modal {...this.props}

        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <p>Item Added to cart</p>
        
      </Modal></div>
    }
  }
  export default PopUp;