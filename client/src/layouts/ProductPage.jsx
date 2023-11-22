import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../store/products";
import { Container, Card, Button, Col, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import localStorageService from "../services/localStorage.service";
import { addToBasket } from "../store/basket";

const ProductPage = () => {
  
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(getProductById(productId));
  const currentUserId = localStorageService.getUserId();

  const description = [
    { id: 1, title: "Цвет", description: "Белый" },
    { id: 2, title: "Ткань", description: "Хлопок" },
    { id: 3, title: "Размер", description: "M" },
    { id: 4, title: "Пол", description: "Мужской" },
    { id: 5, title: "Сезон", description: "Лето" },
  ];

  if (!product) return "loading...";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      currentUserId,
      productId,
    };
    dispatch(addToBasket(newData));
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={"http://localhost:8080/" + product.img}
            alt="Product image"
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{product.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 230,
                height: 230,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {product.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              border: "5px solid lightgray",
              fontSize: 32,
            }}
          >
            <h3>{product.price} руб.</h3>
            <Button
              variant={"outline-primary"}
              className="mt-2 p-1"
              onClick={handleSubmit}
            >
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {description.map((desc, index) => (
          <Row
            key={desc.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {desc.title}: {desc.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
