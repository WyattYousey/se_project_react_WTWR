import close from "../../assets/close.svg";
import { Modal } from "../Modal/Modal";
import "./DeleteModal.css";

export default function DeleteModal({ card, isOpen, handleClose, handleDelete, isLoading, modalType }) {
  const handleDeleteClick = () => {
    handleDelete(card._id);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      <div className="modal__delete">
        <p className="modal__delete-title">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>
        <button onClick={handleDeleteClick} className="modal__delete-confirm">
          {isLoading ? "Deleting item..." : "Yes, delete item"}
        </button>
        <button onClick={handleClose} className="modal__delete-cancel">
          Cancel
        </button>
      </div>
    </Modal>
  );
}
