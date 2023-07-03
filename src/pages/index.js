import "./index.css";
import FormValidator from "../components/Formvalidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import { initialCards } from "../utils/constants.js";

// MODAL ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const inputName = document.querySelector("#form-input-name");
const inputDescription = document.querySelector("#form-input-description");
const profileModalForm = document.forms["profile-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");

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

// POPUP ELEMENTS

const imagePreviewPopup = new PopupWithImage("#modal-preview-image");

const addCardPopup = new PopupWithForm("#modal-add-card", handleCardFormSubmit);

const editProfilePopup = new PopupWithForm(
  "#modal-profile-edit",
  handleProfileFormSubmit
);

const userInfo = new UserInfo(
  document.querySelector(".profile__name"),
  document.querySelector(".profile__subtitle")
);

// RENDER CARD FUNCTIONS

function handleCardClick({ name, link }) {
  imagePreviewPopup.open(name, link);
}

function renderCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleCardClick);
  return cardElement.getView();
}

// RENDER INITAL CARDS

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = renderCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__list"
);

cardSection.renderItems();

// EVENT HANDLERS - for submitting edit profile form and add card form

function handleProfileFormSubmit(formData) {
  const { name, description } = formData;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
  profileModalForm.reset();
  formValidators["profile-form"].resetValidation(); // disable submit button when reopened
}

function handleCardFormSubmit(inputValues) {
  const { name, link } = inputValues;
  const cardElement = renderCard({ name, link });
  cardSection.addItem(cardElement);
  addCardPopup.close();
  // cardModalForm.reset();
  formValidators["card-form"].resetValidation(); // disable submit button when reopened
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  const { profileName, description } = userInfo.getUserInfo();
  inputName.value = profileName;
  inputDescription.value = description;
  editProfilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopup.open();
});
