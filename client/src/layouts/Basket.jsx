import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import BasketList from "../components/ui/basketList";
const Basket = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={9}>
            <BasketList />
          </Col>
          <Col md={3}>
            <div>
              <h3>Итоговая сумма</h3>
              <Button
                  variant={"outline-success"}
                  className="mt-4 mb-4 p-2"
                  onClick={() => console.log("Итоговая сумма")}
                >
                  Оформить заказ
                </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Basket;
