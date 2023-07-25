import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".form__button");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading, normalText) {
    if (isLoading) {
      this._submitButton.textContent = "Removing...";
    } else {
      this._submitButton.textContent = normalText;
    }
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}
