import {
  openModal,
  closeModal,
  closeModalOutsideClick,
  closeModalEsc,
} from "../utils/utils.js";

class Card {
  constructor(data, cardSelector) {
    // cardSelector = "#card-template"
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    const previewExitButton = modalImagePreview.querySelector(
      ".modal__button-exit"
    );
    previewExitButton.addEventListener("click", () =>
      closeModal(modalImagePreview)
    );
    this._element
      .querySelector(".card_image")
      .addEventListener("click", this._handleImagePreviewModal());
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteButton());
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleImagePreviewModal(evt) {
    const modalImagePreview = document.querySelector("#modal-preview-image");
    const modalImage = modalImagePreview.querySelector(".modal__image");
    const modalCaption = modalImagePreview.querySelector(
      ".modal__preview-caption"
    );
    modalImage.src = evt.target.src;
    modalImage.alt = evt.target.alt;
    modalCaption.textContent = evt.target.alt;
    openModal(modalImagePreview);
    closeModalOutsideClick(evt);
    closeModalEsc(evt);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card_image").src = this._link;
    console.log(this._link);
    this._element.querySelector("card-title").textContent = this._name;
    this._element.querySelector("card_image").alt = `Photo of ${this._name}`;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
