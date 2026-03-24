import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultUserValues } from "../../utils/constants";

const LoginModal = ({ isOpen, signin, handleClose, isLoading, modalType, toggleModals }) => {
  const { values, handleChange, handleReset } = useForm(defaultUserValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    signin(values, handleReset);
  }

  return (
    <ModalWithForm
      modalType={modalType}
      name="user-login"
      buttonText={isLoading ? "Logging you in..." : "Log in"}
      secondaryButtonText="or Register"
      toggleModals={toggleModals}
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit}
      title="Log in"
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="loginEmail"
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
          id="loginPassword"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
