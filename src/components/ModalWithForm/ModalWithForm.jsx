import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

function ModalWithForm({ isOpen, children, buttonText, title, handleClose, name, onSubmit, modalType }) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} name={name} className="modal__form">
        {children}
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
