import { NavLink } from "react-router-dom";
import "./ProfileMobileModal.css";
import basicClose from "../../assets/basic-close.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Modal } from "../Modal/Modal";

export default function ProfileMobileModal({ isOpen, handleClose, onAddClick, modalType }) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      <div className="mobile-profile__profile">
        <NavLink to="/profile" className="mobile-profile__user-wrapper mobile-profile__nav-link">
          <p className="mobile-profile__username">Terrence Tegegne</p>
          <img src={avatar} alt="Avatar Photo" className="mobile-profile__avatar" />
        </NavLink>
        <button type="button" onClick={onAddClick} className="mobile-profile__add-clothes-btn">
          + Add Clothes
        </button>
        <ToggleSwitch />
      </div>
    </Modal>
  );
}
