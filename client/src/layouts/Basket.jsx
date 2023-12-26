import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import BasketList from "../components/ui/basketList";
import { useSelector, useDispatch } from "react-redux";
import localStorageService from "../services/localStorage.service";
import { getUserById, makePurchase } from "../store/users";
import { getProducts } from "../store/products";

const Basket = () => {
  const dispatch = useDispatch();
  const currentUserId = localStorageService.getUserId();
  const user = useSelector(getUserById(currentUserId));
  const products = useSelector(getProducts());
  const userCart = user.cart;

  const combinedArray = userCart.map((cartItem) => ({
    ...cartItem,
    ...products.find((productItem) => productItem._id === cartItem.productId),
  }));

  const calculatedArray = combinedArray.map((item) => ({
    ...item,
    total: item.quantity * item.price,
  }));

  const totalSum = calculatedArray.reduce((sum, item) => sum + item.total, 0);

  // console.log(totalSum)

  // const [emptyCart, setEmptyCart] = useState(totalSum === 0);

  // console.log(emptyCart)

  // useEffect(() => {
  //   console.log(emptyCart)
  // }, [totalSum]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const timePurchase = Date();
    const newData = {
      userCart,
      totalSum,
      timePurchase,
      currentUserId,
    };
    dispatch(makePurchase(newData));
  };

  return (
    <>
      {userCart.length ? (
        <Container>
          <Row>
            <Col md={9}>
              <BasketList />
            </Col>

            <Col md={3}>
              <div>
                <h3>
                  Итоговая сумма:{" "}
                  <span style={{ color: "red" }}>{totalSum} </span> рублей
                </h3>
                <Button
                  variant={"outline-success"}
                  className="mt-4 mb-4 p-2"
                  onClick={handleSubmit}
                >
                  Оформить заказ
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <h3>Корзина пуста</h3>
      )}
      {user.purchase ? (
        <>
          <h3>История ваших покупок</h3>
          <Row className="d-flex">
            {user.purchase.map(() => (
              <h5>Покупка</h5>
            ))}
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Basket;
