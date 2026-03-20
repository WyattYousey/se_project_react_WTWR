import { NavLink } from "react-router-dom";
import "./ProfileMobileModal.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Modal } from "../Modal/Modal";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ProfileMobileModal({
  handleSignUpClick,
  handleLogInClick,
  isOpen,
  handleClose,
  onAddClick,
  modalType,
  signout
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const avatarSrc = currentUser?.avatar;

  const avatarContent = avatarSrc ? (
    <img src={avatarSrc} alt="Avatar" className="header__avatar" />
  ) : (
    <div className="header__avatar-placeholder">{currentUser?.name?.[0]?.toUpperCase()}</div>
  );

  const authorizedContent = (
    <div className="mobile-profile__profile">
      <NavLink to="/profile" className="mobile-profile__user-wrapper mobile-profile__nav-link">
        {avatarContent}
        <p className="mobile-profile__username">{currentUser?.name}</p>
      </NavLink>
      <button type="button" onClick={onAddClick} className="mobile-profile__add-clothes-btn">
        + Add Clothes
      </button>
      <ToggleSwitch />
    </div>
  );

  const unauthorizedContent = (
    <div className="mobile-profile__profile">
      <button className="mobile-profile__add-clothes-btn" onClick={handleSignUpClick}>
        Sign Up
      </button>
      <button className="mobile-profile__add-clothes-btn" onClick={handleLogInClick}>
        Log In
      </button>
      <ToggleSwitch />
    </div>
  );
  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalType={modalType}>
      {isLoggedIn ? authorizedContent : unauthorizedContent}
    </Modal>
  );
}
