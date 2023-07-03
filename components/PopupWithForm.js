import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  _getInputValues() {
    const inputsObj = {};
    const inputs = this._popupForm.querySelectorAll(".form__input");
    inputs.forEach((input) => {
      inputsObj[input.name] = input.value;
    });

    return inputsObj;
  }

  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", this._submitForm);
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }
}
