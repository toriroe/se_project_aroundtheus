import { openModal, closeModal } from "../utils/utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", (evt) => this._handleImagePreviewModal(evt));
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle(".card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _handleImagePreviewModal(evt) {
    this._modalImagePreview = document.querySelector("#modal-preview-image");
    this._modalImage = this._modalImagePreview.querySelector(".modal__image");
    this._modalCaption = this._modalImagePreview.querySelector(
      ".modal__preview-caption"
    );
    this._modalImage.src = evt.target.src;
    this._modalImage.alt = evt.target.alt;
    this._modalCaption.textContent = evt.target.alt;
    openModal(this._modalImagePreview);
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
