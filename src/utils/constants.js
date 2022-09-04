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
  card: '.card',
  elementsContainer: '.elements__cards',
  cardImage: '.card__image',
  cardTitle: '.card__title',
  templateCard: '.template-card',
  popupForm: '.popup__form',
  formInput: '.popup__input',
  popupPicture: '.popup__picture',
  popupFigcaption: '.popup__figcaption'
}

export const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
export const buttonAddPlace = document.querySelector(selectors.buttonAddPlace);
export const nameProfileFormPopup = document.querySelector(selectors.nameProfileFormPopup);
export const newPlaceFormPopup = document.querySelector(selectors.newPlaceFormPopup);
export const fullNameFormPopup = document.querySelector(selectors.fullNameFormPopup);
export const professionFormPopup = document.querySelector(selectors.professionFormPopup);
export const elementsContainer = document.querySelector(selectors.elementsContainer);