import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";
import { useHistory } from "react-router-dom";
const LogOut = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        console.log("logout");
        dispatch(logOut());
        history.push("/")
    }, [dispatch, history]);
    return <h1>Вы вышли из аккаунта</h1>;
};

export default LogOut;
