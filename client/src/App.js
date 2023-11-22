import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import LogOut from "./layouts/logOut";
import Basket from "./layouts/Basket";
import ProductPage from "./layouts/ProductPage";
import Shop from "./layouts/Shop";
import AppLoader from "./components/ui/hoc/appLoader";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/users";
// import localStorageService from "./services/localStorage.service";
// import { getUserById, getUsersLoadingStatus } from "./store/users";

function App() {
  const isAuth = useSelector(getIsLoggedIn());

  // console.log(isAuth);
  // const isLoading = useSelector(getUsersLoadingStatus());
  // console.log(isLoading);
  // const currentUserId = localStorageService.getUserId();
  // console.log(currentUserId);
  // const theUser = useSelector(getUserById(currentUserId));
  // if (!isLoading) {
  //   console.log(theUser.role);
  //   const isAdmin = theUser.role === "ADMIN" ? true : false
  //   console.log(isAdmin)
  // }

  // if (isLoading) return "Loading from App..."; так не работает

  return (
    <div>
      <AppLoader>
        <Navbar />
        <Switch>
          {isAuth && <Route path="/admin" component={Admin} />}
          {isAuth && <Route path="/basket" component={Basket} />}
          <Route path="/auth/:type?" component={Auth} />
          <Route path="/logout" component={LogOut} />
          <Route path="/productpage/:productId?" component={ProductPage} />
          <Route path="/" exact component={Shop} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
    </div>
  );
}

export default App;
