import "./ItemCard.css";
import likeBtn from "../../assets/like-btn.svg";
import likeBtnFilled from "../../assets/like-btn-liked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  let validLikeBtn = item.likes.length === 0 ? likeBtn : likeBtnFilled;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    console.log(onCardLike);
    onCardLike({ id: item._id, isLiked: item.likes.length === 0 ? true : false });
  };

  return (
    <li className="card">
      <div className="card__title_wrapper">
        <h2 className="card__title">{item.name}</h2>
        <button onClick={handleLike} className="like-btn">
          <img className="like-img" src={validLikeBtn} alt="like button" />
        </button>
      </div>
      <img onClick={handleCardClick} className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
