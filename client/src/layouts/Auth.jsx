import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Auth = () => {
  const { type } = useParams();

  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  // const formType = "register"

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Зарегистрируйтесь</h3>
              <RegisterForm />
              <p>
                Уже зарегистрированы?{" "}
                <a
                  role="button"
                  onClick={toggleFormType}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Войти!
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Войти</h3>
              <LoginForm />
              <p>
                Нет аккаунта?{" "}
                <a
                  role="button"
                  onClick={toggleFormType}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Зарегистрироваться!
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
