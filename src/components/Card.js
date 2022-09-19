export default class Card {
  constructor(data, cardSelector, {handleCardClick}, selectors, {openPopupDelete}, {deleteLike}, {addLike}, myServerNumber) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._myServerNumber = myServerNumber;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._card = selectors.card;
    this._buttonDeleteCard = selectors.buttonDeleteCard;
    this._buttonCardLike = selectors.buttonCardLike;
    this._image = selectors.cardImage;
    this._title = selectors.cardTitle;
    this.openPopupDelete = openPopupDelete;
    this._deleteLike = deleteLike;
    this._addLike = addLike;
    this._activeHeart = 'card__button-like_active';
    this._cardLikeNumber = '.card__like-number';
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._likeNumber = this._element.querySelector(this._cardLikeNumber);
    this._cardTitle = this._element.querySelector(this._title);
    this._likeNumber.textContent = this._likes.length;

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(this._card)
      .cloneNode(true);
  }

  _setEventListeners() {
    this._buttonDeleteCard = this._element.querySelector(this._buttonDeleteCard);
    this._cardImage = this._element.querySelector(this._image);
    
    this._buttonDeleteCard.addEventListener('click', () => {
      this.openPopupDelete(this._id, this._element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeCard();

    this._modificationLike();
  }

  _likeCard() {
    this._heart = this._element.querySelector(this._buttonCardLike);
    this._meLike = this._likes.filter(item => item._id === this._myServerNumber);
    if (this._meLike.length > 0) {
      this._heart.classList.add(this._activeHeart)
    } else if (this._meLike.length === 0){
      this._heart.classList.remove(this._activeHeart)
    }
  }

  _modificationLike() {
    this._element.querySelector(this._buttonCardLike).addEventListener('click', () => {
      if (this._heart.classList.contains(this._activeHeart)) {
        this._deleteLike(this._id, this._likeNumber, this._heart, this._activeHeart);
      } else {
        this._addLike(this._id, this._likeNumber, this._heart, this._activeHeart);
      }
    })
  }
}