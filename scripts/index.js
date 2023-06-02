import FormValidator from "./formvalidator.js";
import Card from "./card.js";
import initialCards from "../utils/constants.js";
import {
  closeModalOutsideClick,
  closeModalEsc,
  openModal,
  closeModal,
} from "../utils/utils.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".gallery__list");

// MODAL WRAPPERS

const modalProfileEdit = document.querySelector("#modal-profile-edit");
const modalAddCard = document.querySelector("#modal-add-card");

// PROFILE EDIT MODAL VARIABLES

const profileEditButton = document.querySelector("#profile-edit-button");
const profileExitButton = modalProfileEdit.querySelector(".modal__button-exit");
const inputName = document.querySelector("#form-input-name");
const inputDescription = document.querySelector("#form-input-description");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileModalForm = document.querySelector("#profile-modal-form");

// CARD ADD MODAL VARIABLES
const cardAddButton = document.querySelector("#card-add-button");
const cardExitButton = modalAddCard.querySelector(".modal__button-exit");
const inputCardTitle = document.querySelector("#card-form-input-title");
const inputCardImage = document.querySelector("#card-form-input-url");
const cardModalForm = document.querySelector("#card-modal-form");

// VALIDATION

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editProfileModalValidator = new FormValidator(config, modalProfileEdit);
editProfileModalValidator.enableValidation();

const addCardModalValidator = new FormValidator(config, modalAddCard);
addCardModalValidator.enableValidation();

// RENDER INITIAL CARDS

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getView();
  return cardElement;
}

initialCards.forEach((card) => {
  cardList.prepend(renderCard(card));
});

// OPEN AND FILL PROFILE EDIT MODAL

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileSubtitle.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(modalProfileEdit);
}

// EVENT HANDLERS - for editing profile and adding new card

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  profileModalForm.reset();
  closeModal(modalProfileEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: inputCardTitle.value, link: inputCardImage.value };
  const newCard = renderCard(cardData);
  cardList.prepend(newCard);
  cardModalForm.reset();
  closeModal(modalAddCard);

  const inputElements = [...modalAddCard.querySelectorAll(".form__input")];
  const submitButton = modalAddCard.querySelector(".form__button");
  toggleButtonState(inputElements, submitButton, config);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", openEditProfileModal);

profileExitButton.addEventListener("click", () => closeModal(modalProfileEdit));

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", () => openModal(modalAddCard));

cardExitButton.addEventListener("click", () => closeModal(modalAddCard));

cardModalForm.addEventListener("submit", handleCardFormSubmit);
