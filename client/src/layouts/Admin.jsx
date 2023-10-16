import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import EditProductList from "../components/ui/editProductList";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);

  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="w-100 mt-2">
          <Col md={3}>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2"
              onClick={() =>
                setEditProductVisible((prevState) =>
                  prevState === false ? true : false
                )
              }
            >
              ИЗМЕНИТЬ ТОВАРЫ
            </Button>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2"
              onClick={() => setTypeVisible(true)}
            >
              ИЗМЕНИТЬ ТИПЫ
            </Button>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2"
              onClick={() => setBrandVisible(true)}
            >
              ИЗМЕНИТЬ БРЭНДЫ
            </Button>
            <CreateProduct
              show={productVisible}
              onHide={() => setProductVisible(false)}
            />
            <CreateBrand
              show={brandVisible}
              onHide={() => setBrandVisible(false)}
            />
            <CreateType
              show={typeVisible}
              onHide={() => setTypeVisible(false)}
            />
          </Col>
          <Col md={9}>
            {editProductVisible && (
              <>
                <Button
                  variant={"outline-success"}
                  className="mt-4 mb-4 p-2"
                  onClick={() => setProductVisible(true)}
                >
                  Добавить товар
                </Button>
                <EditProductList />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
