const selectors = {
  popupContainerFormProfile: '.popup_form_profile',
  popupContainerFormNewPlace: '.popup_form_new-place',
  popupContainerOpenPicture: '.popup_open-picture',
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
const template = document.querySelector(selectors.template).content;
const elementsContainer = document.querySelector(selectors.elementsContainer);
const elementItem = template.querySelector(selectors.card);

function openProfilePopup() {
  fullNameFormPopup.value = fullNameProfile.textContent;
  professionFormPopup.value = professionProfile.textContent;
  popupContainerFormProfile.classList.add('popup_opened');
};

function openNewPlacePopup() {
  popupContainerFormNewPlace.classList.add('popup_opened');
};

function removePopupOpened() {
  popupContainerFormProfile.classList.remove('popup_opened');
  popupContainerFormNewPlace.classList.remove('popup_opened');
  popupContainerOpenPicture.classList.remove('popup_opened');
};

function submitAPopupProfileForm (evt) {
  evt.preventDefault();
  fullNameProfile.textContent = fullNameFormPopup.value;
  professionProfile.textContent = professionFormPopup.value;
  removePopupOpened();
};

function submitAPopupFormNewPlace (evt) {
  evt.preventDefault();
  renderCard({name: namePlaceFormPopup.value, link: placeSourceFormPopup.value});
  removePopupOpened();

  //Функция создания карточки отработала, очистили значение input формы
  namePlaceFormPopup.value = '';
  placeSourceFormPopup.value = '';
};

buttonEditProfile.addEventListener('click', () => openProfilePopup());
buttonAddPlace.addEventListener('click',() => openNewPlacePopup());
buttonClosePopupFormProfile.addEventListener('click', () => removePopupOpened());
buttonClosePopupFormNewPlace.addEventListener('click', () => removePopupOpened());
buttonClosePopupOpenPicture.addEventListener('click', () => removePopupOpened());

nameProfileFormPopup.addEventListener('submit', submitAPopupProfileForm);
newPlaceFormPopup.addEventListener('submit', submitAPopupFormNewPlace);

function createCard({name, link}) {
  const elementCopy = elementItem.cloneNode(true);
  const cardImage = elementCopy.querySelector(selectors.cardImage);
  
  elementCopy.querySelector(selectors.cardTitle).textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  
  //Кнопка "удалить"
  elementCopy.querySelector(selectors.buttonDeleteCard).addEventListener('click', function() {
  elementCopy.remove();
  });
  
  //Кнопка "нравится"
  const buttonCardLike =  elementCopy.querySelector(selectors.buttonCardLike);
  
  buttonCardLike.addEventListener('click', function() {
  buttonCardLike.classList.toggle('card__button-like_active');
  });
  
  //Добавление атрибутов в поп-ап и его открытие
  const picturePopup = document.querySelector(selectors.picturePopup);

  cardImage.addEventListener('click', function() {
  picturePopup.src = link;
  picturePopup.alt = name;
  document.querySelector(selectors.figcaptionPopup).textContent = name;
  popupContainerOpenPicture.classList.add('popup_opened');
  });

  return elementCopy;
};

function renderCard(card) {
  let variable = createCard(card);
  elementsContainer.prepend(variable);
};

function createInitialCards() {
  initialCards.forEach(renderCard);
};

createInitialCards();