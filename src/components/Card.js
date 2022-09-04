export default class Card {
  constructor(obj, cardSelector, {handleCardClick}, selectors) {
    this._name = obj.name;
    this._link = obj.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._card = selectors.card;
    this._buttonDeleteCard = selectors.buttonDeleteCard;
    this._buttonCardLike = selectors.buttonCardLike;
    this._cardImage = selectors.cardImage;
    this._cardTitle = selectors.cardTitle;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardTitle = this._element.querySelector(this._cardTitle);

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const elementCopy = document
    .querySelector(this._cardSelector)
    .content
    .querySelector(this._card)
    .cloneNode(true);

    return elementCopy;
  }

  _setEventListeners() {
    this._buttonDeleteCard = this._element.querySelector(this._buttonDeleteCard);
    this._buttonCardLike = this._element.querySelector(this._buttonCardLike);
    this._cardImage = this._element.querySelector(this._cardImage);
    
    this._buttonDeleteCard.addEventListener('click', () => {
      this._removeCardClick();
    });

    this._buttonCardLike.addEventListener('click', () => {
      this._likeCardClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeCardClick() {
    this._element.remove();
    this._element = null;
  }

  _likeCardClick() {
    this._buttonCardLike.classList.toggle('card__button-like_active');
  }
}