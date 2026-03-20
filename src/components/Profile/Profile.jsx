import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  handleEditProfileClick,
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
  signout,
}) {
  return (
    <section className="profile">
      <SideBar signout={signout} handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        onCardLike={onCardLike}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}
