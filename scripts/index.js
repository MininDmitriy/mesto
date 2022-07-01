let popupContainer = document.querySelector('.popup');
let addButtonPopup = document.querySelector('.profile__edit-button');
let closeButtonPopup = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let fullNameProfile = document.querySelector('.profile__fullname');
let professionProfile = document.querySelector('.profile__profession');
let fullNameForm = document.querySelector('.popup__input_form_name');
let professionForm = document.querySelector('.popup__input_form_profession');

fullNameForm.value = fullNameProfile.textContent;
professionForm.value = professionProfile.textContent;

let togglePopupOpened = function() {
  popupContainer.classList.toggle('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  fullNameProfile.textContent = fullNameForm.value;
  professionProfile.textContent = professionForm.value;
  popupContainer.classList.toggle('popup_opened');
}

addButtonPopup.addEventListener('click', togglePopupOpened);
closeButtonPopup.addEventListener('click', togglePopupOpened);

form.addEventListener('submit', formSubmitHandler); 