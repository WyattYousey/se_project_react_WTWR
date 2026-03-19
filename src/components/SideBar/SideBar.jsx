import { useMediaQuery } from "react-responsive";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const currentUser = useContext(CurrentUserContext);
  const avatarSrc = currentUser?.avatar;

  const avatarContent = avatarSrc ? (
    <img src={avatarSrc} alt="Avatar" className="sidebar__avatar" />
  ) : (
    <div className="header__avatar-placeholder">{currentUser?.name?.[0]?.toUpperCase()}</div>
  );

  return (
    <aside className="sidebar">
      {isMobile ? (
        <div className="sidebar__user-wrapper">
          <div className="sidebar__user-settings">
            <p className="sidebar__username sidebar__username_mobile">{currentUser?.name}</p>
            <button onClick={handleEditProfileClick} className="sidebar__profile-change">
              Change profile data
            </button>
            <button className="sidebar__profile-logout">Log out</button>
          </div>
          {avatarContent}
        </div>
      ) : (
        <div className="sidebar__wrapper">
          <div className="sidebar__user-wrapper">
            <p className="sidebar__username">{currentUser?.name}</p>
            {avatarContent}
          </div>
          <div className="sidebar__user-settings desktop">
            <button onClick={handleEditProfileClick} className="sidebar__profile-change desktop">
              Change profile data
            </button>
            <button className="sidebar__profile-logout desktop">Log out</button>
          </div>
        </div>
      )}
    </aside>
  );
}
