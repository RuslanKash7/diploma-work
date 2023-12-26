import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AreYouSureDelType from "../modals/AreYouSureDelType";
import EditType from "../modals/EditType";

const EditThingItem = ({ thing }) => {
  const [areYouSureVisible, setAreYouSureVisible] = useState(false);
  const [editTypeVisible, setEditTypeVisible] = useState(false);

  return (
    <>
      <div>
        <ul>
          <li key={thing._id}>
            {thing.name}{" "}
            <Button
              variant={"outline-primary"}
              className="m-2 p-1"
              onClick={() => setEditTypeVisible(true)}
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
      <AreYouSureDelType
        show={areYouSureVisible}
        value={thing._id}
        header="Вы дейстивтельно хотите удалить этот тип?"
        onHide={() => setAreYouSureVisible(false)}
      />
      <EditType
        header="Редактирование типа"
        show={editTypeVisible}
        onHide={() => setEditTypeVisible(false)}
        value={thing}
      />
    </>
  );
};

export default EditThingItem;
