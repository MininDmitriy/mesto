import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, {submitForm}, selectors) {
    super(selectorPopup, selectors);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(selectors.popupForm);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._id, this._card);
    });
  }

  getInformationAboutCard(id, card) {
    this._id = id;
    this._card = card;
  }
}