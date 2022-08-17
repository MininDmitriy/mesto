export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_border-bottom_red',
  inputValidity: 'popup__input_border-bottom_black',
  errorVisibility: 'popup__input-text_error-visible',
  buttonWithFormValidity: 'popup__button-save_hover'
};

export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._buttonWithFormValidity = validationConfig.buttonWithFormValidity;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputValidity = validationConfig.inputValidity;
    this._errorVisibility = validationConfig.errorVisibility;
    this._formElement = formElement;
  }
  //публичная функция начала валидации
  enableValidation() {
    this._setEventListeners();
  };
  //приватная функция 
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
  //приватная валидация по активации и дезактивации кнопки оптравки формы в зависимости от валидации формы
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
  //приватная функция по общей валидация всех инпутов валидируемой формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  //приватная функция по оценке валидности инпутов и выводу или сокрытию элементов и текста об ошибке
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  //приватная функция по демонстарции элементов ошибок и вывод текста ошибки
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.remove(this._inputValidity);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorVisibility);
  };
  //приватная функция по сокрытию элементов ошибок и очистка сообщений об ошибках
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.classList.add(this._inputValidity);
    this._errorElement.classList.remove(this._errorVisibility);
    this._errorElement.textContent = '';
  };
  
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      //console.log(inputElement);
      this._hideInputError(inputElement);
    });
  } 

   /*startedValidityFormNewPlace(popup) {
    this._buttonElement = popup.querySelector(this._submitButtonSelector);
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.remove(this._buttonWithFormValidity);
    this._resetValidation();
  };
  
  _startedValidityFormProfile() {
    //this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.add(this._buttonWithFormValidity);
    this._startedValidationInput();
  };

  _startedValidationInput() {
    //this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach((inputElement) => {
      if (inputElement.validity.valid) {
        inputElement.classList.remove(this._inputErrorClass);
        inputElement.classList.add(this._inputValidity);
        this._formElement.querySelector(`.${inputElement.name}-error`).textContent = '';
      } else if (this._formElement.querySelector(`.${inputElement.name}-error`).textContent.length !== 0 && !inputElement.validity.valid) {
        inputElement.classList.add(this._inputErrorClass);
        inputElement.classList.remove(this._inputValidity);
      } else {
        inputElement.classList.remove(this._inputErrorClass);
        inputElement.classList.add(this._inputValidity);
      };
    });
  }*/
}