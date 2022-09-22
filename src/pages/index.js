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

function createCard(cardInfo) {
  const card = new Card(
    {name: cardInfo.name,
      link: cardInfo.link,
      likes: cardInfo.likes,
      idUser: cardInfo._id,
      ownerId: cardInfo.owner._id
    },
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

Promise.all([api.getInfoAboutProfile(), api.getInfoAboutCards()])
  .then(([userData, cards]) => {
    user.setUserInfo({name: userData.name, info: userData.about, avatar: userData.avatar});
    myServerNumber = userData._id;
    sectionCards.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage (selectors.popupContainerOpenPicture, selectors);
popupWithImage.setEventListeners();

const user = new UserInfo (selectors.fullNameProfile, selectors.professionProfile, selectors.avatarProfile);

const sectionCards = new Section ({
  renderer: (cardItem) => {
    sectionCards.addItem(createCard(cardItem));
  }
}, elementsContainer);

const profileForm = new PopupWithForm (
  selectors.popupContainerFormProfile, {
  submitForm: (data) => {
    profileForm.renderLoading(true);
    const {'popup__input-text_fullname': name, 'popup__input-text_profession': info} = data;
    api.changeProfile(name, info)
      .then((userData) => {
        user.setUserInfo({name: userData.name, info: userData.about, avatar: userData.avatar});
        profileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileForm.renderLoading(false);
      });
  }
}, selectors);

profileForm.setEventListeners();

const avatarForm = new PopupWithForm(
  selectors.popupAvatar, {
    submitForm: (data) => {
      avatarForm.renderLoading(true);
      const {'popup__input-text_source-on-avatar': avatar} = data;
      api.changeAvatar(avatar)
        .then((userData) => {
          user.setUserInfo({name: userData.name, info: userData.about, avatar: userData.avatar});
          avatarForm.close();
        })
        .then(() => {
          avatarForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          avatarForm.renderLoading(false);
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
    newCard.renderLoading(true);
    const {'popup__input-text_name-place': name, 'popup__input-text_source-on-place': link} = data;
    api.addNewCard(name, link)
      .then((obj) => {
        sectionCards.addItem(createCard(obj));
        newCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newCard.renderLoading(false);
      });
  }
}, selectors);

newCard.setEventListeners();

const newCardValidation = new FormValidator(newPlaceFormPopup, selectors);
newCardValidation.enableValidation();

const profileValidation = new FormValidator(nameProfileFormPopup, selectors);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(avatarFormPopup, selectors);
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
  newCardValidation.resetValidation();
});

editAvatarProfile.addEventListener('click', () => {
  avatarValidation.resetValidation();
  avatarForm.open();
});