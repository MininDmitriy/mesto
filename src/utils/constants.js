export const selectors = {
  popupContainerFormProfile: '.popup_form_profile',
  popupContainerFormNewPlace: '.popup_form_new-place',
  popupContainerOpenPicture: '.popup_open-picture',
  popupContainerDeletePicture: '.popup_delete-picture',
  buttonEditProfile: '.profile__edit-button',
  buttonAddPlace: '.profile__add-button',
  buttonClosePopup: '.popup__button-close',
  buttonDeleteCard: '.card__button-delete',
  buttonCardLike: '.card__button-like',
  buttonSave: '.popup__button-save',
  nameProfileFormPopup: '.popup__form_name',
  newPlaceFormPopup: '.popup__form_place',
  avatarFormProfile: '.popup__form_avatar',
  fullNameProfile: '.profile__fullname',
  professionProfile: '.profile__profession',
  avatarProfile: '.profile__avatar',
  fullNameInputFormPopup: '.popup__input_form_name',
  professionInputFormPopup: '.popup__input_form_profession',
  card: '.card',
  elementsContainer: '.elements__cards',
  cardImage: '.card__image',
  cardTitle: '.card__title',
  templateCard: '.template-card',
  popupForm: '.popup__form',
  formInput: '.popup__input',
  popupPicture: '.popup__picture',
  popupFigcaption: '.popup__figcaption',
  popupAvatar: '.popup_form_edit-picture-profile'
}

export const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
export const buttonAddPlace = document.querySelector(selectors.buttonAddPlace);
export const editAvatarProfile = document.querySelector(selectors.avatarProfile);

export const nameProfileFormPopup = document.querySelector(selectors.nameProfileFormPopup);
export const newPlaceFormPopup = document.querySelector(selectors.newPlaceFormPopup);
export const avatarFormPopup = document.querySelector(selectors.avatarFormProfile);

export const fullNameInputFormPopup = document.querySelector(selectors.fullNameInputFormPopup);
export const professionInputFormPopup = document.querySelector(selectors.professionInputFormPopup);

export const elementsContainer = document.querySelector(selectors.elementsContainer);