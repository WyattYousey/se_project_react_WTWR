import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

function ModalWithForm({
  isOpen,
  children,
  buttonText,
  title,
  handleClose,
  name,
  onSubmit,
  modalType,
  secondaryButtonText,
  toggleModals
}) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} name={name} className="modal__form">
        {children}
        <div className="modal__btn_container">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {modalType === "add-user" || modalType === "user-login" ? (
            <button onClick={toggleModals} type="button" className="modal__log_in_btn">
              {secondaryButtonText}
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
