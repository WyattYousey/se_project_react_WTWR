import "./ItemCard.css";
import likeBtn from "../../assets/like-btn.svg";
import likeBtnFilled from "../../assets/like-btn-liked.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  let validLikeBtn = isLiked ? likeBtnFilled : likeBtn;
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (!item?._id) return;
    onCardLike({ id: item._id, isLiked: item.likes.includes(currentUser?._id) });
  };

  return (
    <li className="card">
      <div className="card__title_wrapper">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && (
          <button onClick={handleLike} className="like-btn">
            <img className="like-img" src={validLikeBtn} alt="like button" />
          </button>
        )}
      </div>
      <img onClick={handleCardClick} className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
