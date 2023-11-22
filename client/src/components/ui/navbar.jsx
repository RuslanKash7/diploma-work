import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
// import localStorageService from "./services/localStorage.service";
// import {getUserById, getUsersLoadingStatus} from "./store/users"
const Navbar = () => {
  const isAuth = useSelector(getIsLoggedIn());
  // const history = useHistory()
  // const isLoading = useSelector(getUsersLoadingStatus());
  // const currentUserId = localStorageService.getUserId();
  // console.log(currentUserId)
  // const theUser = useSelector(getUserById(currentUserId));
  // console.log(theUser);
  // if (isLoading) return "Loading from App...";

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
            {isAuth && (
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/admin">
                  Панель администратора
                </Link>
              </li>
            )}
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
