import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import { loadTypesList } from "../../../store/type";
import { loadBrandsList } from "../../../store/brands";
import { loadProductsList } from "../../../store/products";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadBrandsList());
    dispatch(loadTypesList());
    dispatch(loadProductsList());
    dispatch(loadUsersList());
  }, [dispatch]);

  if (usersStatusLoading) return "loading";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AppLoader;
