// INITAL CARDS ARRAY

let initialCards = [
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

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".gallery__list");

// MODAL WRAPPERS

const modalProfileEdit = document.querySelector("#modal-profile-edit");
const modalImagePreview = document.querySelector("#modal-preview-image");
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

// GET CARD ELEMENT FUCTION / RENDER CARDS

function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const modalImage = modalImagePreview.querySelector(".modal__image");
  const modalCaption = modalImagePreview.querySelector(
    ".modal__preview-caption"
  );
  const previewExitButton = modalImagePreview.querySelector(
    ".modal__button-exit"
  );

  cardImage.addEventListener("click", () => {
    openModal(modalImagePreview);
    modalImage.src = cardImage.src;
    modalImage.alt = cardImage.alt;
    modalCaption.textContent = cardTitle.textContent;
  });
  previewExitButton.addEventListener("click", () =>
    closeModal(modalImagePreview)
  );
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitle.textContent = cardData.name;
  cardImage.alt = "Photo of " + cardTitle.textContent;
  cardImage.src = cardData.link;

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardList));

// OPEN/CLOSE MODAL FUNCTIONS

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// EVENT HANDLERS - for editing profile and adding new card

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  closeModal(modalProfileEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputCardTitle.value;
  const link = inputCardImage.value;
  renderCard({ name, link }, cardList);
  closeModal(modalAddCard);
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileSubtitle.textContent;
  openModal(modalProfileEdit);
});

profileExitButton.addEventListener("click", () => closeModal(modalProfileEdit));

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", () => openModal(modalAddCard));

cardExitButton.addEventListener("click", () => closeModal(modalAddCard));

cardModalForm.addEventListener("submit", handleCardFormSubmit);
