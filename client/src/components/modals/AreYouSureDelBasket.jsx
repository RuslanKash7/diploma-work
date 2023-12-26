import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeProductFromUserCart } from "../../store/users";


const AreYouSureDelBasket = ({ show, onHide, value: productId, currentUserId }) => {
  const dispatch = useDispatch();

  // console.log(productId, currentUserId )

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      currentUserId,
      productId,
    };
    // console.log(newData)
    dispatch(removeProductFromUserCart(newData));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Вы дейстивтельно хотите удалить товар из корзины?
        </Modal.Title>
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

export default AreYouSureDelBasket;
