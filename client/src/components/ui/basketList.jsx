import React from "react";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import BasketItem from "./basketItem";
import { getProductsLoadingStatus } from "../../store/products";
import localStorageService from "../../services/localStorage.service";
import { getUserById } from "../../store/users";

const BasketList = () => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const currentUserId = localStorageService.getUserId();
  const user = useSelector(getUserById(currentUserId));

  if (!isLoading) {
    return (
      <>
        <Row className="d-flex">
          {user.cart.map((product) => (
            <BasketItem
              key={product.productId}
              product={product}
              currentUserId={currentUserId}
            />
          ))}
        </Row>
      </>
    );
  } else return "loading ...";
};

export default BasketList;
