export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleClickClose);
  }

  _handleEscClose(evt) {
    // closes popup on 'escape' key
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    // closes popup on 'exit button' click, or clicking outside of modal
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__button-exit")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._handleClickClose);
  }
}
