import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radio.Field";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должено состоять минимум из 2 символов",
        value: 2,
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 6 символов",
        value: 6,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(data);
    if (!isValid) return;
    // const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    dispatch(signUp(data));
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <RadioField
        label="Выберите вашу роль"
        name="role"
        options={[
          { name: "USER", value: "USER" },
          { name: "ADMIN", value: "ADMIN" },
        ]}
        onChange={handleChange}
        value={data.role}
        error={errors.role}
      />
      <button
        className="btn btn-primary w-100 mx-auto mb-3"
        type="submit"
        disabled={!isValid}
      >
        Регистрация
      </button>
    </form>
  );
};

export default RegisterForm;
