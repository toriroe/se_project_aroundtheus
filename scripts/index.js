let initialCards = [
  {
    name: "Alaverdi, Armenia",
    link: "https://unsplash.com/photos/RkOtjbPuHZw",
  },
  {
    name: "Angkor Wat, Cambodia",
    link: "https://unsplash.com/photos/4KKVELjJsNw",
  },
  {
    name: "Arches National Park, USA",
    link: "https://unsplash.com/photos/XuQGqCBpNGk",
  },
  {
    name: "Redwood National Park, USA",
    link: "https://unsplash.com/photos/V0OUeuUAtz4",
  },
  {
    name: "Mount Fuji, Japan",
    link: "https://unsplash.com/photos/9Qwbfa_RM94",
  },
  {
    name: "Deadvlei, Namibia",
    link: "https://unsplash.com/photos/jTJ9-4ESzU4",
  },
];

let profileEditButton = document.querySelector("#profile-edit-button");
let profileEditModal = document.querySelector("#profile-edit-modal");
let formExitButton = document.querySelector("#form-exit-button");

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

formExitButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});
