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
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
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
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
