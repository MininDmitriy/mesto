const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_border-bottom_red',
  inputValidity: 'popup__input_border-bottom_black',
  errorVisibility: 'popup__input-text_error-visible',
  buttonWithFormValidity: 'popup__button-save_hover'
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(config);

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.remove(config.buttonWithFormValidity);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.add(config.buttonWithFormValidity);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  inputElement.classList.remove(config.inputValidity);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorVisibility);
};

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  inputElement.classList.add(config.inputValidity);
  errorElement.classList.remove(config.errorVisibility);
  errorElement.textContent = '';
};

function startedValidityFormNewPlace(popup) {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  const buttonElement = popup.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    if (popup.querySelector(`.${inputElement.name}-error`).textContent.length !== 0) {
      inputElement.classList.add(config.inputErrorClass);
      inputElement.classList.remove(config.inputValidity);
    } else {
      inputElement.classList.remove(config.inputErrorClass);
      inputElement.classList.add(config.inputValidity);
    };
  });
};

function startedValidityFormProfile(popup) {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  const buttonElement = popup.querySelector(config.submitButtonSelector);
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.add(config.buttonWithFormValidity);
  inputList.forEach((inputElement) => {
    if (inputElement.validity.valid) {
      inputElement.classList.remove(config.inputErrorClass);
      inputElement.classList.add(config.inputValidity);
      popup.querySelector(`.${inputElement.name}-error`).textContent = '';
    };
  });
};