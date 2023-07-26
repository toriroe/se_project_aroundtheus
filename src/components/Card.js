class Card {
  constructor(
    cardData,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeButtonClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._isLiked = cardData.isLiked;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;

    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _setLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _toggleLikeButton() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._likeButton.classList.remove("card__like-button_active");
    } else {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _handleLikeButton() {
    this._toggleLikeButton();
    this._handleLikeButtonClick();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
  }

  removeCardElement() {
    this._cardElement.remove();
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeCounter = this._cardElement.querySelector(".card__like-counter");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._setEventListeners();
    this._setLikeButton();
    return this._cardElement;
  }
}

export default Card;
