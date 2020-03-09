import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import "../styles.css";
import description from "../Data/descriptionn.json";
class Description extends Component {

  render() {
    const a = description.filter(q => q.name === this.props.name);

    return (
      
        <div className="descriptionPopup">
          <Modal {...this.props}

            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.props.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {a.map((data,i) => {
                return (<div key={i}>
                  <img style={{marginLeft:"200px"}}src={data.image} alt="img"/>
                  <p>{data.description1}{data.description2}</p></div>)
              })}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        </div>
         

    );
  }

}
export default Description;