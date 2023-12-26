import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../store/products";

const AreYouSure = ({ show, header, onHide, value: productId }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productId);
    dispatch(removeProduct(productId));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={handleSubmit}>
          Да, удалить
        </Button>
        <Button variant={"outline-secondary"} onClick={onHide}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AreYouSure;
