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



function App() {
  const isAuth = useSelector(getIsLoggedIn());
  // const qw = useSelector(getRole());
  // console.log(qw)
  // const currentUserId = localStorageService.getUserId();
  // console.log(currentUserId)
  // const currentUser = getUserById(currentUserId);
  // const q = useSelector(getCurrentUserData());
  // console.log(currentUser);
  // console.log(q.role)

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
