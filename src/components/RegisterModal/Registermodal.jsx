import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultUserValues } from "../../utils/constants";

const RegisterModal = ({ isOpen, handleAddItem, handleClose, isLoading, modalType }) => {
  const { values, setValues, handleChange, handleReset } = useForm(defaultUserValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleAddItem(values, handleReset);
  }

  return (
    <ModalWithForm
      modalType={modalType}
      name="add-user"
      buttonText={isLoading ? "Signing you up..." : "Next"}
      secondaryButtonText="or Login"
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
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatarUrl"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
