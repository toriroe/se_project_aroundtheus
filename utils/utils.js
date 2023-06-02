// CLOSE MODALS WITH ESC/CLICKING OUTSIDE MODAL BOX

export function closeModalOutsideClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
}

// OPEN/CLOSE MODAL FUNCTIONS

export function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOutsideClick);
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOutsideClick);
  document.removeEventListener("keydown", closeModalEsc);
}
