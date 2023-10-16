import React from "react";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import BasketItem from "./basketItem";
import { getProductsLoadingStatus } from "../../store/products";
import { getBasketByUsersId } from "../../store/basket";
import localStorageService from "../../services/localStorage.service";

const BasketList = () => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const currentUserId = localStorageService.getUserId();
  const usersBasketOnly = useSelector(getBasketByUsersId(currentUserId));

  if (!isLoading) {
    return (
      <>
        <Row className="d-flex">
          {usersBasketOnly.map((product) => (
            <BasketItem key={product.currentuserId} product={product} />
          ))}
        </Row>
      </>
    );
  } else return "loading ...";
};

export default BasketList;
