import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultUserValues } from "../../utils/constants";

const RegisterModal = ({ isOpen, signup, handleClose, isLoading, modalType, toggleModals }) => {
  const { values, setValues, handleChange, handleReset } = useForm(defaultUserValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    signup(values, handleReset);
  }

  return (
    <ModalWithForm
      modalType={modalType}
      name="add-user"
      buttonText={isLoading ? "Signing you up..." : "Next"}
      secondaryButtonText="or Login"
      toggleModals={toggleModals}
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit}
      title="Sign Up"
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="registerEmail"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="registerPassword"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="registerName"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="registerAvatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
