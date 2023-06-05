import FormValidator from "../components/Formvalidator.js";
import Card from "../components/Card.js";
import { openModal, closeModal } from "../utils/utils.js";

// INITIAL CARDS ARRAY

const initialCards = [
  {
    name: "Alaverdi, Armenia",
    link: "https://images.unsplash.com/photo-1543862475-eb136770ae9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Angkor Wat, Cambodia",
    link: "https://images.unsplash.com/photo-1600807455249-89d2e285b9e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Arches National Park, USA",
    link: "https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Redwood National Park, USA",
    link: "https://images.unsplash.com/photo-1547014762-3a94fb4df70a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    name: "Mount Fuji, Japan",
    link: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Deadvlei, Namibia",
    link: "https://images.unsplash.com/photo-1448831338187-78296e6fdc4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
  },
];

// WRAPPERS

const cardList = document.querySelector(".gallery__list");
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const modalAddCard = document.querySelector("#modal-add-card");

// MODAL ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const inputName = document.querySelector("#form-input-name");
const inputDescription = document.querySelector("#form-input-description");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileModalForm = document.forms["profile-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");
const inputCardTitle = document.querySelector("#card-form-input-title");
const inputCardImage = document.querySelector("#card-form-input-url");
const cardModalForm = document.forms["card-modal-form"];
const modalExitButtons = document.querySelectorAll(".modal__button-exit");

// VALIDATION

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

// RENDER CARD FUNCTION

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template").getView();
  return card;
}

// RENDER INITAL CARDS

initialCards.forEach((card) => {
  cardList.append(renderCard(card));
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

function openNewCardModal() {
  openModal(modalAddCard);
}

// EVENT HANDLERS - for submitting edit profile form and add card form

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  profileModalForm.reset();
  formValidators["profile-form"].resetValidation(); // disable submit button when reopened
  closeModal(modalProfileEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: inputCardTitle.value, link: inputCardImage.value };
  const newCard = renderCard(cardData);
  cardList.prepend(newCard);
  cardModalForm.reset();
  formValidators["card-form"].resetValidation(); // disable submit button when reopened
  closeModal(modalAddCard);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", openEditProfileModal);

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", openNewCardModal);

cardModalForm.addEventListener("submit", handleCardFormSubmit);

modalExitButtons.forEach((exitButton) => {
  exitButton.addEventListener("click", () => {
    const modal = exitButton.closest(".modal");
    closeModal(modal);
  });
});
