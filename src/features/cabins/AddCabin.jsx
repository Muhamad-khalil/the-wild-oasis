import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function onClose() {
    setIsOpenModal((show) => !show);
  }

  return (
    <>
      <Button onClick={onClose}>Add New Cabin</Button>
      {isOpenModal && (
        <Modal onClose={onClose}>
          <CreateCabinForm onCloseModal={onClose} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
