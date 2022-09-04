import './index.css';
import { initialCards } from '../components/places.js';
import {
  selectors,
  buttonEditProfile,
  buttonAddPlace,
  nameProfileFormPopup,
  newPlaceFormPopup,
  fullNameFormPopup,
  professionFormPopup,
  elementsContainer
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupWithImage = new PopupWithImage (selectors.popupContainerOpenPicture, selectors);
popupWithImage.setEventListeners();

function createCard(cardItem) {
  const card = new Card(
    cardItem, 
    selectors.templateCard, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  }, selectors);
  return card.generateCard();
};

const sectionCards = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    sectionCards.addItem(createCard(cardItem));
  }
}, elementsContainer);

sectionCards.renderItems();

const newCard = new PopupWithForm (
  selectors.popupContainerFormNewPlace, {
  submitForm: (data) => {
    const {'popup__input-text_name-place': name, 'popup__input-text_source-on-place': link} = data;
    sectionCards.addItem(createCard({name, link}));
    newCard.close();
  }
}, selectors);

newCard.setEventListeners();

const user = new UserInfo (selectors.fullNameProfile, selectors.professionProfile);

const profileForm = new PopupWithForm (
  selectors.popupContainerFormProfile, {
  submitForm: (data) => {
    const {'popup__input-text_fullname': name, 'popup__input-text_profession': info} = data;
    user.setUserInfo({name, info});
    profileForm.close();
  }
}, selectors);

profileForm.setEventListeners();

const profileValidation = new FormValidator(nameProfileFormPopup);
const newCardValidation = new FormValidator(newPlaceFormPopup);
profileValidation.enableValidation();
newCardValidation.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  const {name, info} = user.getUserInfo();
  fullNameFormPopup.value = name;
  professionFormPopup.value = info;
  profileValidation.resetValidation();
  profileForm.open();
});

buttonAddPlace.addEventListener('click',() => {
  newCard.open();
  newPlaceFormPopup.reset();
  newCardValidation.resetValidation();
});