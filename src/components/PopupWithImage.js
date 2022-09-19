import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup, selectors) {
    super(selectorPopup, selectors);
    this._popupPicture = this._popup.querySelector(selectors.popupPicture);
    this._popupFigcaption = this._popup.querySelector(selectors.popupFigcaption);
  }

  open(name, link) {
    super.open();
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupFigcaption.textContent = name;
  }
}