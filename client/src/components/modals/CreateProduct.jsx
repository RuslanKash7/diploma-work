import React, { useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTypes } from "../../store/type";
import { getBrands } from "../../store/brands";
import { createNewProduct } from "../../store/products";

const CreateProduct = ({ show, onHide, header }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    price: "",
    // totalAmount: "",
    img: null,
    brand: null,
    type: null,
  });

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

  const handleImgChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      img: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Для передачи изображения на сервер, нужно использовать объект FormData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("type", data.type);
    if (data.img) {
      formData.append("img", data.img);
    }
console.log(formData)
    try {
      dispatch(createNewProduct(formData));
      onHide();
    } catch (error) {
      console.error("Error creating new product:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
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
          {/* <TextField
            label="Введите количество товара"
            className="mt-3 mb-1"
            name="totalAmount"
            value={data.totalAmount}
            onChange={handleChange}
          /> */}
          <SelectField
            label="Выберите бренд товара"
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
            name="img"
            onChange={handleImgChange}
          />
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
