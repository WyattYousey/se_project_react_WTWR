import "./ItemModal.css";
import { Modal } from "../Modal/Modal";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, handleClose, handleDeleteClick, modalType }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;
  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <div className="modal__footer-wrapper">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button onClick={handleDeleteClick} className="modal__delete-btn">
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
