import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { getIsLoggedIn, logOut } from "../../store/users";

const Navbar = () => {
  const isAuth = useSelector(getIsLoggedIn());
  // const history = useHistory()

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
                  <form onSubmit={logOut()}>
                    <Button
                      variant={"outline-light"}
                      className="nav-link"
                      type="submit"
                    >
                      Выйти
                    </Button>
                  </form>
                  {/* <Link className="nav-link " aria-current="page" to="/auth">
                    Выйти
                  </Link> */}
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
