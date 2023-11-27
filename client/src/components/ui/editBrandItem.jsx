import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AreYouSureDelBrand from "../modals/AreYouSureDelBrand";
import EditBrand from "../modals/EditBrand";

const EditBrandItem = ({ thing }) => {
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);
  const [editBrandVisible, setEditBrandVisible] = useState(false);

  return (
    <>
      <div>
        <ul>
          <li key={thing._id}>
            {thing.name}{" "}
            <Button
              variant={"outline-primary"}
              className="m-2 p-1"
              onClick={() => setEditBrandVisible(true)}
            >
              Редактировать
            </Button>
            <Button
              variant={"outline-danger"}
              className="m-2 p-1"
              value={thing._id}
              onClick={() =>
                setAreYouSureVisible((prevState) =>
                  prevState === false ? true : false
                )
              }
            >
              Удалить
            </Button>
            <hr />
          </li>
        </ul>
      </div>
      <AreYouSureDelBrand
        show={areYouSureVisible}
        value={thing._id}
        header="Вы дейстивтельно хотите удалить этот бренд?"
        onHide={() => setAreYouSureVisible(false)}
      />
      <EditBrand
        header="Редактирование бренда"
        header1="Введите название бренда"
        show={editBrandVisible}
        onHide={() => setEditBrandVisible(false)}
        value={thing}
      />
    </>
  );
};

export default EditBrandItem;
