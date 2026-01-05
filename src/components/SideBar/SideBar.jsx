import { useMediaQuery } from "react-responsive";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <aside className="sidebar">
      {isMobile ? (
        <div className="sidebar__user-wrapper">
          <div className="sidebar__user-settings">
            <p className="sidebar__username sidebar__username_mobile">Terrence Tegegne</p>
            <button className="sidebar__profile-change">Change profile data</button>
            <button className="sidebar__profile-logout">Log out</button>
          </div>
          <img src={avatar} alt="Avatar Photo" className="sidebar__avatar" />
        </div>
      ) : (
        <div className="sidebar__user-wrapper">
          <p className="sidebar__username">Terrence Tegegne</p>
          <img src={avatar} alt="Avatar Photo" className="sidebar__avatar" />
        </div>
      )}
    </aside>
  );
}
