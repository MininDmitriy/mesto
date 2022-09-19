import './index.css';
import {
  selectors,
  buttonEditProfile,
  buttonAddPlace,
  editAvatarProfile,
  nameProfileFormPopup,
  newPlaceFormPopup,
  avatarFormPopup,
  fullNameInputFormPopup,
  professionInputFormPopup,
  elementsContainer
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation";

let myServerNumber;

function getActionInfo(selectorPopup, infoText) {
  const buttonSave = document.querySelector(selectorPopup).querySelector(selectors.buttonSave);
  buttonSave.value = `${infoText}`;
}

function createCard(cardItem) {
  const card = new Card(
    cardItem,
    selectors.templateCard, {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      }
    }, selectors, {
      openPopupDelete: (id, card) => {
        deleteCard.open();
        deleteCard.getInformationAboutCard(id, card);
      }
    }, {
      deleteLike: (id, like, heart, activeHeart) => {
        api.deleteLikeCard(id)
          .then((obj) => {
            like.textContent = obj.likes.length;
          })
          .then(() => {
            heart.classList.remove(activeHeart);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, {
      addLike: (id, like, heart, activeHeart) => {
        api.addLikeCard(id)
          .then((obj) => {
            like.textContent = obj.likes.length;
          })
          .then(() => {
            heart.classList.add(activeHeart);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, myServerNumber);
  return card.generateCard();
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50/',
  headers: {
    authorization: 'b1d31de1-5ebb-4a9e-a4d6-eae276edeb78',
    'content-type': 'application/json'
  }
});

api.getInfoAboutProfile()
  .then((obj) => {
    user.setUserInfo({name: obj.name, info: obj.about});
    editAvatarProfile.style.backgroundImage = `url(${obj.avatar})`;
    myServerNumber = obj._id;
  })
  .catch((err) => {
    console.log(err);
  });

api.getInfoAboutCards()
  .then((obj) => {
    sectionCards.renderItems(obj);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage (selectors.popupContainerOpenPicture, selectors);
popupWithImage.setEventListeners();

const user = new UserInfo (selectors.fullNameProfile, selectors.professionProfile);

const sectionCards = new Section ({
  renderer: (cardItem) => {
    if (cardItem.owner._id !== myServerNumber) {
      const cardWithoutElementDelete = createCard(cardItem);
      cardWithoutElementDelete.querySelector(selectors.buttonDeleteCard).remove();
      sectionCards.addItem(cardWithoutElementDelete);
    } else {
      sectionCards.addItem(createCard(cardItem));
    }
  }
}, elementsContainer);

const profileForm = new PopupWithForm (
  selectors.popupContainerFormProfile, {
  submitForm: (data) => {
    getActionInfo(selectors.popupContainerFormProfile, 'Сохранение...');
    const {'popup__input-text_fullname': name, 'popup__input-text_profession': info} = data;
    api.changeProfile(name, info)
      .then((obj) => {
        user.setUserInfo({name: obj.name, info: obj.about});
      })
      .then(() => {
        profileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getActionInfo(selectors.popupContainerFormProfile, 'Сохранить');
      });
  }
}, selectors);

profileForm.setEventListeners();

const avatarForm = new PopupWithForm(
  selectors.popupAvatar, {
    submitForm: (data) => {
      getActionInfo(selectors.popupAvatar, 'Сохранение...');
      const {'popup__input-text_source-on-avatar': avatar} = data;
      api.changeAvatar(avatar)
        .then((obj) => {
          editAvatarProfile.style.backgroundImage = `url(${obj.avatar})`;
        })
        .then(() => {
          avatarForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getActionInfo(selectors.popupAvatar, 'Сохранение');
        });
    }
  }, selectors);

avatarForm.setEventListeners();

const deleteCard = new PopupWithConfirmation (
  selectors.popupContainerDeletePicture, {
    submitForm: (id, card) => {
      api.deleteCard(id)
        .then(() => {
          card.remove();
          card = null;
        })
        .then(() => {
          deleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, selectors);

deleteCard.setEventListeners();

const newCard = new PopupWithForm (
  selectors.popupContainerFormNewPlace, {
  submitForm: (data) => {
    getActionInfo(selectors.popupContainerFormNewPlace, 'Сохранение...');
    const {'popup__input-text_name-place': name, 'popup__input-text_source-on-place': link} = data;
    api.addNewCard(name, link)
      .then((obj) => {
        sectionCards.addItem(createCard(obj));
      })
      .then(() => {
        newCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getActionInfo(selectors.popupContainerFormNewPlace, 'Создать');
      });
  }
}, selectors);

newCard.setEventListeners();

const newCardValidation = new FormValidator(newPlaceFormPopup);
newCardValidation.enableValidation();

const profileValidation = new FormValidator(nameProfileFormPopup);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(avatarFormPopup);
avatarValidation.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  const {name, info} = user.getUserInfo();
  fullNameInputFormPopup.value = name;
  professionInputFormPopup.value = info;
  profileValidation.resetValidation();
  profileForm.open();
});

buttonAddPlace.addEventListener('click',() => {
  newCard.open();
  newPlaceFormPopup.reset();
  newCardValidation.resetValidation();
});

editAvatarProfile.addEventListener('click', () => {
  avatarValidation.resetValidation();
  avatarForm.open();
});