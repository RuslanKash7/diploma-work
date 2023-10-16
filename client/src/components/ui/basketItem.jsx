import React, { useState } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import star from "../../assets/star.png";
import AreYouSureDelBasket from "../modals/AreYouSureDelBasket";
import { getProductById } from "../../store/products";
import { updateBasket } from "../../store/basket";

const BasketItem = ({ product }) => {
  const dispatch = useDispatch()
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);
  const productsList = useSelector(getProductById(product.productId));
  console.log(product.quantity);

  const changeQuantity = (product) => {
    dispatch(updateBasket({ ...product, quantity: product.quantity }));
  };

  return (
    <>
      <Col md={3} className={"mt-3"}>
        <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
          <Image
            width={150}
            height={150}
            src={productsList.img}
            alt={"No image yet"}
          />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{productsList.brand}</div>
            <div className="d-flex align-items-center">
              <div>{productsList.rating}</div>
              <Image width={16} height={16} src={star} />
            </div>
          </div>
          <div>{productsList.name}</div>
          <div>
          <Button
          variant={"outline-secondary"}
          className="p-1"
          onClick={() => changeQuantity(product, Math.max(1, product.quantity - 1))}
        >
          -
        </Button>
            <span>Количество: {product.quantity}</span>
            <Button
          variant={"outline-secondary"}
          className="p-1"
          onClick={() => changeQuantity(product, Math.max(1, product.quantity + 1))}
        >
          +
        </Button>
          </div>
          <div>Сотимость: {productsList.price}</div>
          <div>
            Сотимость всех товаров:{" "}
            {Number(productsList.price * product.quantity)}
          </div>
        </Card>
        <Button
          variant={"outline-danger"}
          className="mt-2 mb-4 p-1"
          onClick={() =>
            setAreYouSureVisible((prevState) =>
              prevState === false ? true : false
            )
          }
        >
          Удалить
        </Button>
      </Col>
      <AreYouSureDelBasket
        show={areYouSureVisible}
        onHide={() => setAreYouSureVisible(false)}
        value={product._id}
      />
    </>
  );
};

export default BasketItem;
