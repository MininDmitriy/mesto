let popupContainer = document.querySelector('.popup');
let addButtonPopup = document.querySelector('.profile__edit-button');
let closeButtonPopup = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let fullNameProfile = document.querySelector('.profile__fullname');
let professionProfile = document.querySelector('.profile__profession');
let fullNameForm = document.querySelector('.popup__input_form_name');
let professionForm = document.querySelector('.popup__input_form_profession');

let addPopupOpened = function() {
  popupContainer.classList.add('popup_opened');
  fullNameForm.value = fullNameProfile.textContent;
  professionForm.value = professionProfile.textContent;
};

let removePopupOpened = function() {
  popupContainer.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  fullNameProfile.textContent = fullNameForm.value;
  professionProfile.textContent = professionForm.value;
  popupContainer.classList.remove('popup_opened');
}

addButtonPopup.addEventListener('click', addPopupOpened);
closeButtonPopup.addEventListener('click', removePopupOpened);

form.addEventListener('submit', formSubmitHandler); 