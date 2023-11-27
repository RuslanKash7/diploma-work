import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Col, Image } from "react-bootstrap";
import star from "../../assets/star.png";
import EditProduct from "../modals/EditProduct";
import AreYouSure from "../modals/AreYouSure";
import { getBrandById, getBrandsLoadingStatus } from "../../store/brands";

const EditProductItem = ({ product }) => {
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);
  const isLoading = useSelector(getBrandsLoadingStatus());
  const brandId = product.brand.join(", ");
  const theBrand = useSelector(getBrandById(brandId));

  if (isLoading) return "Loading ...";

  return (
    <>
      <Col md={3} className={"mt-2"}>
        <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
          <Image
            width={150}
            height={150}
            src={"http://localhost:8080/" + product.img}
            alt={"No image yet"}
          />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{theBrand.name}</div>
            <div className="d-flex align-items-center">
              <div>{product.rating}</div>
              <Image width={16} height={16} src={star} />
            </div>
          </div>
          <div>{product.name}</div>
        </Card>
        <Button
          variant={"outline-primary"}
          className="mt-2 p-1"
          onClick={() => setEditProductVisible(true)}
        >
          Редактировать
        </Button>
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
      <AreYouSure
        show={areYouSureVisible}
        header="Вы дейстивтельно хотите удалить этот товар?"
        onHide={() => setAreYouSureVisible(false)}
        value={product._id}
      />
      <EditProduct
        show={editProductVisible}
        onHide={() => setEditProductVisible(false)}
        value={product}
      />
    </>
  );
};

export default EditProductItem;
