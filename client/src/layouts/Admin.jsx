import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const { change } = useParams();

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
                const newPath =
                  change === "products" ? "/admin/" : "/admin/products";
                history.push(newPath);
              }}
            >
              ИЗМЕНИТЬ ТОВАРЫ
            </Button>
            <Button
              variant={"outline-dark"}
              className="m-2 p-2"
              style={{ width: "200px" }}
              onClick={() => {
                const newPath = change === "types" ? "/admin/" : "/admin/types";
                history.push(newPath);
              }}
            >
              ИЗМЕНИТЬ ТИПЫ
            </Button>
            <Button
              variant={"outline-dark"}
              className="m-2 p-2"
              style={{ width: "200px" }}
              onClick={() => {
                const newPath =
                  change === "brands" ? "/admin/" : "/admin/brands";
                history.push(newPath);
              }}
            >
              ИЗМЕНИТЬ БРЕНДЫ
            </Button>
          </Col>
          <Col md={9}>
            {change === "products" && (
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
            {change === "types" && (
              <>
                <EditThingList
                  things={types}
                  isLoading={isTypesLoading}
                  setThingVisible={setTypeVisible}
                  header="Добавить новый тип"
                />
              </>
            )}
            {change === "brands" && (
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
    </>
  );
};

export default Admin;
