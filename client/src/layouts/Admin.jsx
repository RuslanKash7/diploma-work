import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import EditProductList from "../components/ui/editProductList";
import { getTypes, getTypesLoadingStatus } from "../store/type";
import { getBrands, getBrandsLoadingStatus } from "../store/brands";
import EditThingList from "../components/ui/editThingList";
import EditBrandList from "../components/ui/editBrandList";

const Admin = () => {
  const [productVisible, setProductVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);

  const [typeVisible, setTypeVisible] = useState(false);
  const [editTypeVisible, setEditTypeVisible] = useState(false);

  const [brandVisible, setBrandVisible] = useState(false);
  const [editBrandVisible, setEditBrandVisible] = useState(false);

  const brands = useSelector(getBrands());
  const isBrandsLoading = useSelector(getBrandsLoadingStatus());

  const types = useSelector(getTypes());
  const isTypesLoading = useSelector(getTypesLoadingStatus());

  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="w-100 mt-2">
          <Col md={3}>
            <Button
              variant={"outline-dark"}
              className="m-2 p-2"
              style={{ width: "200px" }}
              onClick={() => {
                setEditProductVisible((prevState) =>
                  prevState === false ? true : false
                );
                setEditTypeVisible(false);
                setEditBrandVisible(false);
              }}
            >
              ИЗМЕНИТЬ ТОВАРЫ
            </Button>
            <Button
              variant={"outline-dark"}
              className="m-2 p-2"
              style={{ width: "200px" }}
              onClick={() => {
                setEditTypeVisible((prevState) =>
                  prevState === false ? true : false
                );
                setEditProductVisible(false);
                setEditBrandVisible(false);
              }}
            >
              ИЗМЕНИТЬ ТИПЫ
            </Button>
            <Button
              variant={"outline-dark"}
              className="m-2 p-2"
              style={{ width: "200px" }}
              onClick={() => {
                setEditBrandVisible((prevState) =>
                  prevState === false ? true : false
                );
                setEditTypeVisible(false);
                setEditProductVisible(false);
              }}
            >
              ИЗМЕНИТЬ БРЕНДЫ
            </Button>
            <CreateProduct
              show={productVisible}
              onHide={() => setProductVisible(false)}
              header="Добавить новый товар"
            />
            <CreateBrand
              show={brandVisible}
              onHide={() => setBrandVisible(false)}
              header="Добавить новый бренд"
              header1="Введите название бренда"
            />
            <CreateType
              show={typeVisible}
              onHide={() => setTypeVisible(false)}
              header="Добавить новый тип"
              header1="Введите название типа"
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

            {editTypeVisible && (
              <>
                <EditThingList
                  things={types}
                  isLoading={isTypesLoading}
                  setThingVisible={setTypeVisible}
                  header="Добавить новый тип"
                />
              </>
            )}

            {editBrandVisible && (
              <EditBrandList
              things={brands}
              isLoading={isBrandsLoading}
              setThingVisible={setBrandVisible}
              header="Добавить новый бренд"
            />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
