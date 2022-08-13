import { selectors, openPopup, popupContainerOpenPicture } from './index.js';

export class Card {
  constructor(obj, cardSelector) {
    this._name = obj.name;
    this._link = obj.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const elementCopy = document
    .querySelector(this._cardSelector)
    .content
    .querySelector(selectors.card)
    .cloneNode(true);

    return elementCopy;
  }

  _setEventListeners() {
    this._element.querySelector(selectors.buttonDeleteCard).addEventListener('click', () => {
      this._removeCardClick();
    });

    this._element.querySelector(selectors.buttonCardLike).addEventListener('click', () => {
      this._likeCardClick();
    });

    this._element.querySelector(selectors.cardImage).addEventListener('click', () => {
      document.querySelector(selectors.picturePopup).src = this._link;
      document.querySelector(selectors.picturePopup).alt = this._name;
      document.querySelector(selectors.figcaptionPopup).textContent = this._name;
      this._openPopupImage();
    });
  }

  _removeCardClick() {
    this._element.remove();
  }

  _likeCardClick() {
    this._element.querySelector(selectors.buttonCardLike).classList.toggle('card__button-like_active');
  }

  _openPopupImage () {
    openPopup(popupContainerOpenPicture);
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(selectors.cardImage).alt = this._name;
    this._element.querySelector(selectors.cardImage).src = this._link;
    this._element.querySelector(selectors.cardTitle).textContent = this._name;

    return this._element;
  }
}