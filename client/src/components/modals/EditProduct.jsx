import React, { useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTypes } from "../../store/type";
import { getBrands } from "../../store/brands";
import { updateProduct } from "../../store/products";

const EditProduct = ({ show, onHide, value: product }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: product.name,
    price: product.price,
    file: product.file,
    brand: product.brand,
    type: product.type,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...data,
      productId: product._id // отдельно передал, а потом этот ключ в БД не появляется по тому что нет в схеме бакэнда
    }
    dispatch(updateProduct(newData));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактирование товара
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={handleSubmit}>
          Сохранить изменения
        </Button>
        <Button variant={"outline-secondary"} onClick={onHide}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProduct;
