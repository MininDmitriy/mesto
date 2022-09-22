import {selectors} from "../utils/constants";

export default class Card {
  constructor({name, link, likes, idUser, ownerId}, cardSelector, {handleCardClick}, selectors, {openPopupDelete}, {deleteLike}, {addLike}, myServerNumber) {
    this._name = name;
    this._link = link;
    this._id = idUser;
    this._ownerId = ownerId;
    this._likes = likes;
    this._myServerNumber = myServerNumber;
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
    this._activeHeart = selectors.activeHeart;
    this._cardLikeNumber = selectors.cardLikeNumber;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._heart = this._element.querySelector(this._buttonCardLike);
    this._cardImage = this._element.querySelector(this._image);
    this._likeNumber = this._element.querySelector(this._cardLikeNumber);
    this._cardTitle = this._element.querySelector(this._title);
    this._likeNumber.textContent = this._likes.length;
    this._buttonDeleteCard = this._element.querySelector(this._buttonDeleteCard);
    if (this._ownerId !== this._myServerNumber) {
      this._element.querySelector(selectors.buttonDeleteCard).remove();
    }

    this._setEventListeners();

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
    this._buttonDeleteCard.addEventListener('click', () => {
      this.openPopupDelete(this._id, this._element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeCard();

    this._setLikeHandler();
  }

  _likeCard() {
    this._meLike = this._likes.filter(item => item._id === this._myServerNumber);
    if (this._meLike.length > 0) {
      this._heart.classList.add(this._activeHeart)
    } else if (this._meLike.length === 0){
      this._heart.classList.remove(this._activeHeart)
    }
  }

  _setLikeHandler() {
    this._element.querySelector(this._buttonCardLike).addEventListener('click', () => {
      if (this._heart.classList.contains(this._activeHeart)) {
        this._deleteLike(this._id, this._likeNumber, this._heart, this._activeHeart);
      } else {
        this._addLike(this._id, this._likeNumber, this._heart, this._activeHeart);
      }
    })
  }
}