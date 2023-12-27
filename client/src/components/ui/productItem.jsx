import React from "react";
import { useSelector } from "react-redux";
import star from "../../assets/star.png";
import { useHistory } from "react-router-dom";
import { getBrandById, getBrandsLoadingStatus } from "../../store/brands";

const ProductItem = ({ product }) => {
  const history = useHistory();
  const isLoading = useSelector(getBrandsLoadingStatus());
  const brandId = product.brand.join(", "); // тут нужно получать строку, а не массив!!!
  const theBrand = useSelector(getBrandById(brandId));

  if (isLoading) return "Loading ...";

  return (
    <div
      className="col"
      onClick={() => history.push("/productpage/" + product._id)}
    >
      <div
        className="productItem-card"
        style={{ cursor: "pointer" }}
        border={"dark"}
      >
        <img
          src={"http://localhost:8080/" + product.img}
          alt={"product"}
          className="productItem-img"
        />
        <div className="fw-bold mt-1 d-flex justify-content-between align-items-center mx-2">
          <div>{theBrand ? theBrand.name : "нет бренда"}</div>
          <div className="d-flex align-items-center">
            <div>{product.rating}</div>
            <img width={16} height={16} src={star} alt={star} />
          </div>
        </div>
        <div className="mx-2 text-black-50">Стоимость {product.price}</div>
        <div className="mx-2">{product.name}</div>
      </div>
    </div>
  );
};

export default ProductItem;
