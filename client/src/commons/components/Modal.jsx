import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalPopUp(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props?.detailHospital?.data?.hospital?.name}</h4>
        <i>
          {props?.detailHospital?.data?.hospital?.address}, {props?.detailHospital?.data?.hospital?.region}
        </i><br />
        <i>
          {props?.detailHospital?.data?.hospital?.phone}
        </i>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}