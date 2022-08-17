import { Card } from './Card.js';
import { initialCards } from './places.js';
import { FormValidator, validationConfig } from './FormValidator.js';

export const selectors = {
  popupContainerFormProfile: '.popup_form_profile',
  popupContainerFormNewPlace: '.popup_form_new-place',
  popupContainerOpenPicture: '.popup_open-picture',
  buttonEditProfile: '.profile__edit-button',
  buttonAddPlace: '.profile__add-button',
  buttonClosePopup: '.popup__button-close',
  buttonDeleteCard: '.card__button-delete',
  buttonCardLike: '.card__button-like',
  nameProfileFormPopup: '.popup__form_name',
  newPlaceFormPopup: '.popup__form_place',
  fullNameProfile: '.profile__fullname',
  professionProfile: '.profile__profession',
  fullNameFormPopup: '.popup__input_form_name',
  professionFormPopup: '.popup__input_form_profession',
  namePlaceFormPopup: '.popup__input_form_name-place',
  placeSourceFormPopup: '.popup__input_form_source-on-place',
  card: '.card',
  elementsContainer: '.elements__cards',
  cardImage: '.card__image',
  picturePopup: '.popup__picture',
  figcaptionPopup: '.popup__figcaption',
  cardTitle: '.card__title',
  templateCard: '.template-card'
}

const popupContainerFormProfile = document.querySelector(selectors.popupContainerFormProfile);
const popupContainerFormNewPlace = document.querySelector(selectors.popupContainerFormNewPlace);
const popupContainerOpenPicture = document.querySelector(selectors.popupContainerOpenPicture);
const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
const buttonAddPlace = document.querySelector(selectors.buttonAddPlace);
const buttonClosePopupFormProfile = popupContainerFormProfile.querySelector(selectors.buttonClosePopup);
const buttonClosePopupFormNewPlace = popupContainerFormNewPlace.querySelector(selectors.buttonClosePopup);
const buttonClosePopupOpenPicture = popupContainerOpenPicture.querySelector(selectors.buttonClosePopup);
const nameProfileFormPopup = document.querySelector(selectors.nameProfileFormPopup);
const newPlaceFormPopup = document.querySelector(selectors.newPlaceFormPopup);
const fullNameProfile = document.querySelector(selectors.fullNameProfile);
const professionProfile = document.querySelector(selectors.professionProfile);
const fullNameFormPopup = document.querySelector(selectors.fullNameFormPopup);
const professionFormPopup = document.querySelector(selectors.professionFormPopup);
const namePlaceFormPopup = document.querySelector(selectors.namePlaceFormPopup);
const placeSourceFormPopup = document.querySelector(selectors.placeSourceFormPopup);
const elementsContainer = document.querySelector(selectors.elementsContainer);
//открытие поп-апов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressButtonEsc);
};
//закрытие поп-апов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressButtonEsc);
};
//откртие поп-апа с заполнением полей
function openProfilePopup() {
  fullNameFormPopup.value = fullNameProfile.textContent;
  professionFormPopup.value = professionProfile.textContent;
  openPopup(popupContainerFormProfile);
};
//открытие поп-апа с картикой в масштабе
function openImagePopup(name, link) {
  document.querySelector(selectors.picturePopup).src = link;
  document.querySelector(selectors.picturePopup).alt = name;
  document.querySelector(selectors.figcaptionPopup).textContent = name;
  openPopup(popupContainerOpenPicture); 
};
//закрытие поп-апов при клике на оверлей
function closedPopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};
//закрытие поп-апов при нажатии на кнопку Esc
function closePopupByPressButtonEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
//отправка формы профиля с закрытием поп-апа и отменой стандартного события обрыботки формы
function submitPopupProfileForm(evt) {
  fullNameProfile.textContent = fullNameFormPopup.value;
  professionProfile.textContent = professionFormPopup.value;
  closePopup(popupContainerFormProfile);
  evt.preventDefault();
};
//отправка формы нового места с закрытием поп-апа, созданием новой карточки
//с использованием класса, отменной стандартного события обработки формы, очистка инпутов
//формы нового места
function submitPopupFormNewPlace(evt) {
  const card = new Card({name: namePlaceFormPopup.value, link: placeSourceFormPopup.value}, selectors.templateCard, openImagePopup, selectors);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
  closePopup(popupContainerFormNewPlace);
  evt.preventDefault();
  newPlaceFormPopup.reset();
};
//создание карточек с использованием массива данных о карточках
initialCards.forEach((item) => {
  const card = new Card(item, selectors.templateCard, openImagePopup, selectors);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
});
//создание объектов валидации форм и вызов методов валидации
const profileValidation = new FormValidator(validationConfig, newPlaceFormPopup);
const newCardValidation = new FormValidator(validationConfig, nameProfileFormPopup);
profileValidation.enableValidation();
newCardValidation.enableValidation();
//закрытие поп-апов при клике на оверлей
popupContainerFormProfile.addEventListener('click', closedPopupByClickOnOverlay);
popupContainerFormNewPlace.addEventListener('click', closedPopupByClickOnOverlay);
popupContainerOpenPicture.addEventListener('click', closedPopupByClickOnOverlay);
//открытие поп-апа редактирования профиля и задание стартовой валидации
buttonEditProfile.addEventListener('click', () => {
  openProfilePopup();
  profileValidation.resetValidation();
});
//открытие поп-апа нового места и задание стартовой валидации
buttonAddPlace.addEventListener('click',() => {
  openPopup(popupContainerFormNewPlace);
  newCardValidation.resetValidation();
});
//закрытие поп-апов при клике на кнопку закрытия
buttonClosePopupFormProfile.addEventListener('click', () => closePopup(popupContainerFormProfile));
buttonClosePopupFormNewPlace.addEventListener('click', () => closePopup(popupContainerFormNewPlace));
buttonClosePopupOpenPicture.addEventListener('click', () => closePopup(popupContainerOpenPicture));
//отправка заполенных форм
nameProfileFormPopup.addEventListener('submit', submitPopupProfileForm);
newPlaceFormPopup.addEventListener('submit', submitPopupFormNewPlace);