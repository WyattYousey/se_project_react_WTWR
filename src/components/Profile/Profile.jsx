import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({ handleEditProfileClick, handleAddClick, clothingItems, handleCardClick }) {
  return (
    <section className="profile">
      <SideBar handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}
