import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getUserById,
  getUsersLoadingStatus,
} from "../../store/users";
import localStorageService from "../../services/localStorage.service";

const Navbar = () => {
  // const history = useHistory()

  const isAuth = useSelector(getIsLoggedIn());
  const isLoading = useSelector(getUsersLoadingStatus());
  const currentUserId = localStorageService.getUserId();
  const theUser = useSelector(getUserById(currentUserId));
  const isAdmin = theUser ? theUser.role === "ADMIN" : false

  if (isLoading) return "Loading from Navbar...";

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">
              SP shop
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <ul className="nav">
            {isAuth && isAdmin ? (
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/admin">
                  Панель администратора
                </Link>
              </li>
            ) : null}
            {isAuth && (
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/basket">
                  Корзина
                </Link>
              </li>
            )}
            <li>
              {!isAuth ? (
                <Link className="nav-link " aria-current="page" to="/auth">
                  Войти
                </Link>
              ) : (
                <div>
                  {/* <form onSubmit={logOut()}>
                    <Button
                      variant={"outline-light"}
                      className="nav-link"
                      type="submit"
                    >
                      Выйти
                    </Button>
                  </form> */}
                  <Link className="nav-link " aria-current="page" to="/logout">
                    Выйти
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
