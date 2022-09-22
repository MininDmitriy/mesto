export default class FormValidator {
  constructor(formElement, selectors) {
    this._formElement = formElement;
    this._inputSelector = selectors.formInput;
    this._submitButtonSelector = selectors.buttonSave;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._buttonWithFormValidity = selectors.buttonWithFormValidity;
    this._inputErrorClass = selectors.inputErrorClass;
    this._inputValidity = selectors.inputValidity;
    this._errorVisibility = selectors.errorVisibility;
  }
 
  enableValidation() {
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.remove(this._buttonWithFormValidity);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.add(this._buttonWithFormValidity);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.remove(this._inputValidity);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorVisibility);
  };

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.classList.add(this._inputValidity);
    this._errorElement.classList.remove(this._errorVisibility);
    this._errorElement.textContent = '';
  };
}