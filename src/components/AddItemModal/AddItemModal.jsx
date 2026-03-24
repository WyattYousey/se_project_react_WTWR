import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultItemValues } from "../../utils/constants";

const AddItemModal = ({ isOpen, handleAddItem, handleClose, isLoading, modalType }) => {
  const { values, handleChange, handleReset } = useForm(defaultItemValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleAddItem(values, handleReset);
  }

  return (
    <ModalWithForm
      modalType={modalType}
      name="add-garment"
      buttonText={isLoading ? "Adding garment..." : "Add garment"}
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit}
      title="New garment"
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__label modal__label_type_radio">
          <input
            checked={values.weather === "hot"}
            value="hot"
            name="weather"
            type="radio"
            id="hot"
            className="modal__radio-input"
            onChange={handleChange}
          />{" "}
          Hot
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            checked={values.weather === "warm"}
            value="warm"
            name="weather"
            type="radio"
            id="warm"
            className="modal__radio-input"
            onChange={handleChange}
          />{" "}
          Warm
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            checked={values.weather === "cold"}
            value="cold"
            name="weather"
            type="radio"
            id="cold"
            className="modal__radio-input"
            onChange={handleChange}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
