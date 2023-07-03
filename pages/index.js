import FormValidator from "../components/Formvalidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";

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

// MODAL ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const inputName = document.querySelector("#form-input-name");
const inputDescription = document.querySelector("#form-input-description");
const profileModalForm = document.forms["profile-modal-form"];
const cardAddButton = document.querySelector("#card-add-button");
const cardModalForm = document.forms["card-modal-form"];

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

// RENDER CARD FUNCTION

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
      const cardElement = renderCard(cardData); // call renderCard function
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
