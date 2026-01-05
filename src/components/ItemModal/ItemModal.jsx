import "./ItemModal.css";
import closeBtn from "../../assets/white-close.svg";
import { Modal } from "../Modal/Modal";

function ItemModal({ isOpen, card, handleClose, handleDeleteClick, modalType }) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <div className="modal__footer-wrapper">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button onClick={handleDeleteClick} className="modal__delete-btn">
          Delete item
        </button>
      </div>
    </Modal>
  );
}

export default ItemModal;
