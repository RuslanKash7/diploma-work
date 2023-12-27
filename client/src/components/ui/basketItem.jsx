import React, { useState } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import star from "../../assets/star.png";
import AreYouSureDelBasket from "../modals/AreYouSureDelBasket";
import { getProductById } from "../../store/products";
import { getBrandById } from "../../store/brands";
import { useDispatch } from "react-redux";
import { changeProdQuantity } from "../../store/users";

const BasketItem = ({ product, currentUserId }) => {
  const dispatch = useDispatch();
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);

  const { productId } = product;

  const productsList = useSelector(getProductById(productId));
  // console.log(product);
  // console.log(productsList);
  // console.log(currentUserId);

  const brandId = productsList.brand.join(", "); // тут нужно получать строку, а не массив!!!
  const theBrand = useSelector(getBrandById(brandId));

  const changeQuantity = (item) => {
    const newData = {
      item,
      currentUserId,
      productId,
    };
    dispatch(changeProdQuantity(newData));
  };

  if (!productsList) {
    return "loading basketItem...";
  }
  return (
    <>
      <Col md={3} className={"mt-3"}>
        <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
          <Image
            width={150}
            height={150}
            src={"http://localhost:8080/" + productsList.img}
            alt={"No image yet"}
          />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{theBrand ? theBrand.name : "нет бренда"}</div>
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
              onClick={() => {
                changeQuantity("minus");
              }}
            >
              -
            </Button>
            <span>Количество: {product.quantity}</span>
            <Button
              variant={"outline-secondary"}
              className="p-1"
              onClick={() => {
                changeQuantity("plus");
              }}
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
        value={productsList._id}
        currentUserId={currentUserId}
      />
    </>
  );
};

export default BasketItem;
