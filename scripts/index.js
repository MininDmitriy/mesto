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
export const popupContainerOpenPicture = document.querySelector(selectors.popupContainerOpenPicture);
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

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
};

function openProfilePopup() {
  fullNameFormPopup.value = fullNameProfile.textContent;
  professionFormPopup.value = professionProfile.textContent;
  
  openPopup(popupContainerFormProfile);
};

function closedPopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function submitAPopupProfileForm(evt) {
  fullNameProfile.textContent = fullNameFormPopup.value;
  professionProfile.textContent = professionFormPopup.value;
  closePopup(popupContainerFormProfile);
  evt.preventDefault();
};

function submitAPopupFormNewPlace(evt) {
  const card = new Card({name: namePlaceFormPopup.value, link: placeSourceFormPopup.value}, selectors.templateCard);
  const cardElement = card.generateCard();
  document.querySelector(selectors.elementsContainer).prepend(cardElement);
  
  startedValidityFormNewPlace(popupContainerFormNewPlace);
  closePopup(popupContainerFormNewPlace);
  evt.preventDefault();
  newPlaceFormPopup.reset();
};

function startedValidityFormNewPlace(popup) {
  const buttonElement = popup.querySelector(validationConfig.submitButtonSelector);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.remove(validationConfig.buttonWithFormValidity);
};

function startedValidityFormProfile(popup) {
  const buttonElement = popup.querySelector(validationConfig.submitButtonSelector);
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.add(validationConfig.buttonWithFormValidity);
  startedValidationInput(popup);
};

function startedValidationInput(popup) {
  const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach((inputElement) => {
    if (inputElement.validity.valid) {
      inputElement.classList.remove(validationConfig.inputErrorClass);
      inputElement.classList.add(validationConfig.inputValidity);
      popup.querySelector(`.${inputElement.name}-error`).textContent = '';
    } else if (popup.querySelector(`.${inputElement.name}-error`).textContent.length !== 0 && !inputElement.validity.valid) {
      inputElement.classList.add(validationConfig.inputErrorClass);
      inputElement.classList.remove(validationConfig.inputValidity);
    } else {
      inputElement.classList.remove(validationConfig.inputErrorClass);
      inputElement.classList.add(validationConfig.inputValidity);
    };
  });
}

initialCards.forEach((item) => {
  const card = new Card(item, selectors.templateCard);
  const cardElement = card.generateCard();

  document.querySelector(selectors.elementsContainer).prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const liveValidation = new FormValidator(validationConfig, formElement);
  liveValidation.enableValidation();
});

popupContainerFormProfile.addEventListener('click', closedPopupByClickOnOverlay);
popupContainerFormNewPlace.addEventListener('click', closedPopupByClickOnOverlay);
popupContainerOpenPicture.addEventListener('click', closedPopupByClickOnOverlay);

buttonEditProfile.addEventListener('click', () => {
  openProfilePopup();
  startedValidityFormProfile(popupContainerFormProfile);
});

buttonAddPlace.addEventListener('click',() => {
  openPopup(popupContainerFormNewPlace);
  startedValidationInput(popupContainerFormNewPlace);
});

buttonClosePopupFormProfile.addEventListener('click', () => closePopup(popupContainerFormProfile));
buttonClosePopupFormNewPlace.addEventListener('click', () => closePopup(popupContainerFormNewPlace));
buttonClosePopupOpenPicture.addEventListener('click', () => closePopup(popupContainerOpenPicture));
nameProfileFormPopup.addEventListener('submit', submitAPopupProfileForm);
newPlaceFormPopup.addEventListener('submit', submitAPopupFormNewPlace);