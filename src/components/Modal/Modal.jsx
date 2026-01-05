import { useEffect } from "react";
import closeBtn from "../../assets/close.svg";
import "./Modal.css";

export const Modal = ({ onClose, isOpen, children, modalType }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal_type_${modalType}`} onClick={handleOverlay}>
      <div className={`modal__container modal__container_type_${isOpen ? modalType : ""}`}>
        {children}
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Modal Close Button" />
        </button>
      </div>
    </div>
  );
};
