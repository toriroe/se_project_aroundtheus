import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = document.querySelector(".modal__image");
    this._previewCaption = document.querySelector(".modal__preview-caption");
  }

  open(name, link) {
    this._previewImage.src = link;
    this._previewCaption.textContent = name;
    this._previewImage.alt = `Photo of ${name}`;
    super.open();
  }
}
