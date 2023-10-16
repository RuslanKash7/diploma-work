import React, { useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/products";
import { getTypes, getTypesLoadingStatus } from "../../store/type";
import { getBrands, getBrandsLoadingStatus } from "../../store/brands";
import { createNewProduct } from "../../store/products";

const CreateProduct = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    price: "",
    totalAmount: 0,
    file: null,
    brand: null,
    type: null,
  });

  const products = useSelector(getProducts());
  const brands = useSelector(getBrands());
  const brandsList = brands.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const types = useSelector(getTypes());
  const typesList = types.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...data,
    };
    console.log(newData);
    dispatch(createNewProduct(newData));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Введите название товара"
            className="mt-3 mb-1"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <TextField
            label="Введите стоимость товара"
            className="mt-3 mb-1"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
          <SelectField
            label="Выберите брэнд товара"
            defaultOption="Выберите..."
            name="brand"
            options={brandsList}
            onChange={handleChange}
            value={data.brand}
          />
          <SelectField
            label="Выберите типа товара"
            defaultOption="Выберите..."
            name="type"
            options={typesList}
            onChange={handleChange}
            value={data.type}
          />
          <Form.Control
            placeholder={"Добавьте изображение товарa"}
            className="mt-3 mb-3"
            type="file"
            name="file"
            value={data.file}
            onChange={handleChange}
          />
          {/* <button className="btn btn-primary w-100 mx-auto" type="submit">
            Добавить новый товар
          </button> */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={handleSubmit}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProduct;
