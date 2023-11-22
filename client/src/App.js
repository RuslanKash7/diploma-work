import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import LogOut from "./layouts/logOut";
import Basket from "./layouts/Basket";
import ProductPage from "./layouts/ProductPage";
import Shop from "./layouts/Shop";
// import AppLoader from "./components/ui/hoc/appLoader";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/users";
import localStorageService from "./services/localStorage.service";
import { getUserById, getUsersLoadingStatus } from "./store/users";

function App() {
  const isAuth = useSelector(getIsLoggedIn());
  const isLoading = useSelector(getUsersLoadingStatus());
  // console.log(isLoading);
  const currentUserId = localStorageService.getUserId();
  // console.log(currentUserId);
  const theUser = useSelector(getUserById(currentUserId));
  // console.log(theUser);
  const isAdmin = theUser ? theUser.role === "ADMIN" : false;
  // console.log(isAdmin);

  if (isLoading) return "Loading from App...";

  return (
    <div>
      {/* <AppLoader> убрал в индекс потому что так сразу доступ к theUser есть */}
      <Navbar />
      <Switch>
        {isAuth && isAdmin ? <Route path="/admin" component={Admin} /> : null}
        {isAuth && <Route path="/basket" component={Basket} />}
        <Route path="/auth/:type?" component={Auth} />
        <Route path="/logout" component={LogOut} />
        <Route path="/productpage/:productId?" component={ProductPage} />
        <Route path="/" exact component={Shop} />
        <Redirect to="/" />
      </Switch>
      {/* </AppLoader> */}
    </div>
  );
}

export default App;
