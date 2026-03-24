import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { defaultUserValues } from "../../utils/constants";

const EditProfileModal = ({ isOpen, editProfile, handleClose, isLoading, modalType }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, handleReset } = useForm(defaultUserValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    editProfile(values, handleReset);
  }

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, setValues]);
  return (
    <ModalWithForm
      modalType={modalType}
      name="edit-profile"
      buttonText={isLoading ? "Saving Changes..." : "Save Changes"}
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit}
      title="Change profile data"
    >
      <label htmlFor="name" className="modal__label">
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
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
