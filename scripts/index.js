const selectors = {
  popupContainer: '.popup',
  buttonEditProfile: '.profile__edit-button',
  buttonAddPlace: '.profile__add-button',
  buttonClosePopup: '.popup__close',
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
  template: '.template',
  card: '.card',
  elementsContainer: '.elements__cards',
  cardImage: '.card__image',
  picturePopup: '.popup__picture',
  figcaptionPopup: '.popup__figcaption',
  cardTitle: '.card__title'
}

const popupContainer = document.querySelectorAll(selectors.popupContainer);
const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
const buttonAddPlace = document.querySelector(selectors.buttonAddPlace);
const buttonClosePopup = document.querySelectorAll(selectors.buttonClosePopup);
const nameProfileFormPopup = document.querySelector(selectors.nameProfileFormPopup);
const newPlaceFormPopup = document.querySelector(selectors.newPlaceFormPopup);
const fullNameProfile = document.querySelector(selectors.fullNameProfile);
const professionProfile = document.querySelector(selectors.professionProfile);
const fullNameFormPopup = document.querySelector(selectors.fullNameFormPopup);
const professionFormPopup = document.querySelector(selectors.professionFormPopup);
const namePlaceFormPopup = document.querySelector(selectors.namePlaceFormPopup);
const placeSourceFormPopup = document.querySelector(selectors.placeSourceFormPopup);

function addPopupOpened(index) {
  popupContainer[index].classList.add('popup_opened');
  fullNameFormPopup.value = fullNameProfile.textContent;
  professionFormPopup.value = professionProfile.textContent;
};

function removePopupOpened(index) {
  popupContainer[index].classList.remove('popup_opened');
};

function submitAPopupProfileForm (evt) {
  evt.preventDefault();
  fullNameProfile.textContent = fullNameFormPopup.value;
  professionProfile.textContent = professionFormPopup.value;
  removePopupOpened(0);
};

function submitAPopupFormNewPlace (evt) {
  evt.preventDefault();
  createCard({name: namePlaceFormPopup.value, link: placeSourceFormPopup.value});
  removePopupOpened(1);
};

buttonEditProfile.addEventListener('click', () => addPopupOpened(0));
buttonAddPlace.addEventListener('click',() => addPopupOpened(1));
buttonClosePopup[0].addEventListener('click', () => removePopupOpened(0));
buttonClosePopup[1].addEventListener('click', () => removePopupOpened(1));
buttonClosePopup[2].addEventListener('click', () => removePopupOpened(2));

nameProfileFormPopup.addEventListener('submit', submitAPopupProfileForm);
newPlaceFormPopup.addEventListener('submit', submitAPopupFormNewPlace);

function createCard({name, link}) {
  const template = document.querySelector(selectors.template).content;
  const elementItem = template.querySelector(selectors.card);
  const elementsContainer = document.querySelector(selectors.elementsContainer);
  const elementCopy = elementItem.cloneNode(true);
  
  elementCopy.querySelector(selectors.cardTitle).textContent = name;
  elementCopy.querySelector(selectors.cardImage).alt = name;
  elementCopy.querySelector(selectors.cardImage).src = link;
  
  //Кнопка "удалить"
  elementCopy.querySelector(selectors.buttonDeleteCard).addEventListener('click', function() {
  elementCopy.remove();
});
  
  //Кнопка "нравится"
  elementCopy.querySelector(selectors.buttonCardLike).addEventListener('click', function() {
  elementCopy.querySelector(selectors.buttonCardLike).classList.toggle('card__button-like_active');
});
  
  //Добавление атрибутов в поп-ап и его открытие
  elementCopy.querySelector(selectors.cardImage).addEventListener('click', function() {
  document.querySelector(selectors.picturePopup).src = link;
  document.querySelector(selectors.picturePopup).alt = name;
  document.querySelector(selectors.figcaptionPopup).textContent = name;
  popupContainer[2].classList.add('popup_opened');
});

  elementsContainer.prepend(elementCopy);
};