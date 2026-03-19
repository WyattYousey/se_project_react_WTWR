import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import profileBtn from "../../assets/profile-btn.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, handleAddClick, handleSignUpClick, handleLogInClick, onMobileProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const avatarSrc = currentUser?.avatar;

  const avatarContent = avatarSrc ? (
    <img src={avatarSrc} alt="Avatar" className="header__avatar" />
  ) : (
    <div className="header__avatar-placeholder">{currentUser?.name?.[0]?.toUpperCase()}</div>
  );

  const authorizedContent = (
    <>
      <ToggleSwitch />
      <button type="button" onClick={handleAddClick} className="header__add-clothes-btn">
        + Add Clothes
      </button>

      <NavLink className="header__nav-link" to="/profile">
        <p className="header__username">{currentUser?.name}</p>
        {avatarContent}
      </NavLink>
    </>
  );

  const unauthorizedContent = (
    <>
      <ToggleSwitch />
      <button className="header__add-clothes-btn" onClick={handleSignUpClick}>
        Sign Up
      </button>
      <button className="header__add-clothes-btn" onClick={handleLogInClick}>
        Log In
      </button>
    </>
  );

  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <NavLink className="header__nav-link" to="/">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      {isDesktop ? (
        <div className="header__desktop-profile">{isLoggedIn ? authorizedContent : unauthorizedContent}</div>
      ) : (
        <button onClick={onMobileProfileClick} className="header__mobile-profile-btn">
          <img src={profileBtn} alt="Profile Button" className="header__profile-btn" />
        </button>
      )}
    </header>
  );
}

export default Header;
