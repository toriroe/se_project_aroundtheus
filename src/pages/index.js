import "./index.css";
import FormValidator from "../components/Formvalidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import { config } from "../utils/constants.js";
import {
  profileEditButton,
  inputName,
  inputDescription,
  cardAddButton,
  avatarEditButton,
} from "../utils/constants.js";

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ API INSTANCE                                                            │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e1b3b9f-b018-4d2b-bc9a-2c16cad524b1",
    "Content-Type": "application/json",
  },
});

let cardSection;
let userId;

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ POPUP ELEMENTS                                                          │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const imagePreviewPopup = new PopupWithImage("#modal-preview-image");

const addCardPopup = new PopupWithForm("#modal-add-card", handleCardFormSubmit);

const editProfilePopup = new PopupWithForm(
  "#modal-profile-edit",
  handleProfileFormSubmit
);

const cardDeletePopup = new PopupWithConfirm("#modal-card-delete");

const avatarEditPopup = new PopupWithForm(
  "#modal-avatar-edit",
  handleAvatarFormSubmit
);

const userInfo = new UserInfo(
  document.querySelector(".profile__name"),
  document.querySelector(".profile__subtitle"),
  document.querySelector(".profile__photo")
);

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ LOAD INITIAL CARDS/ USER INFO FROM SERVER                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
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
  .catch(console.error);

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ VALIDATION;                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */

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

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ RENDER CARD FUNCTIONS                                                   │
  └─────────────────────────────────────────────────────────────────────────┘
 */

function handleCardClick({ name, link }) {
  imagePreviewPopup.open(name, link);
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    function handleDeleteClick() {
      cardDeletePopup.setSubmitAction(() => {
        cardDeletePopup.setLoading(true);
        api
          .removeCard(cardData._id)
          .then((res) => {
            cardElement.removeCardElement(res._id);
            cardDeletePopup.close();
          })
          .catch(console.error)
          .finally(() => {
            cardDeletePopup.setLoading(false);
          });
      });
      cardDeletePopup.open();
    },
    function handleLikeButtonClick() {
      api
        .changeLikeStatus(cardData._id, cardElement.isLiked)
        .then((res) => {
          console.log(res);
          cardElement.updateLikes(res.isLiked);
        })
        .catch(console.error);
    }
  );
  return cardElement.getView();
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ EVENT HANDLERS                                                          │
  └─────────────────────────────────────────────────────────────────────────┘
 */

function handleProfileFormSubmit({ name, description }) {
  editProfilePopup.setLoading(true);
  api
    .updateUserInfo(name, description)
    .then(() => {
      userInfo.setUserInfo(name, description);
      editProfilePopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

function handleCardFormSubmit({ name, link }) {
  addCardPopup.setLoading(true);
  api
    .addCard({ name, link })
    .then((cardData) => {
      const cardElement = renderCard(cardData);
      cardSection.prependItem(cardElement);
      addCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addCardPopup.setLoading(false);
    });
}

function handleAvatarFormSubmit({ url }) {
  avatarEditPopup.setLoading(true);
  api
    .setUserAvatar(url)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      avatarEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarEditPopup.setLoading(false);
    });
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
 */

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

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
  formValidators["avatar-form"].resetValidation();
});
