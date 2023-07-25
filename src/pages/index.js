import "./index.css";
import FormValidator from "../components/Formvalidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";

// MODAL ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const inputName = document.querySelector("#form-input-name");
const inputDescription = document.querySelector("#form-input-description");
const cardAddButton = document.querySelector("#card-add-button");
const avatarEditButton = document.querySelector(".profile__photo-edit-button");

// API INSTANCE

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e1b3b9f-b018-4d2b-bc9a-2c16cad524b1",
    "Content-Type": "application/json",
  },
});

let cardSection;

// Load User Info from Server

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

// Load Cards From Server

api
  .getInitialCards()
  .then((res) => {
    console.log(res);
    cardSection = new Section(
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
  })
  .catch((err) => console.error(err));

// VALIDATION

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
  document.querySelector(".profile__subtitle"),
  document.querySelector(".profile__photo")
);

// RENDER CARD FUNCTIONS

function handleCardClick({ name, link }) {
  imagePreviewPopup.open(name, link);
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleCardClick
    // function handleLikeClick() {
    //   api
    //     .changeLikeStatus(cardData._id, cardElement.isLiked())
    //     .then((res) => {
    //       const likes = res.likes;
    //       cardElement.setLikes(likes);
    //       cardElement.toggleLikes();
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
  );
  return cardElement.getView();
}

// EVENT HANDLERS - for submitting edit profile form and add card form

function handleProfileFormSubmit(formData) {
  const { name, description } = formData;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
}

function handleCardFormSubmit(inputValues) {
  const { name, link } = inputValues;
  const cardElement = renderCard({ name, link });
  cardSection.prependItem(cardElement);
  addCardPopup.close();
}

function handleDeleteCardFormSubmit() {
  //
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  const { profileName, description } = userInfo.getUserInfo();
  inputName.value = profileName;
  inputDescription.value = description;
  editProfilePopup.open();
  formValidators["profile-form"].resetValidation();
});

cardAddButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["card-form"].resetValidation();
});
