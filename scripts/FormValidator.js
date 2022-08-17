export class FormValidator {
  constructor(formElement) {
    this._formSelector = '.popup__form';
    this._inputSelector = '.popup__input';
    this._submitButtonSelector = '.popup__button-save';
    this._inactiveButtonClass = 'popup__button-save_disabled';
    this._buttonWithFormValidity = 'popup__button-save_hover';
    this._inputErrorClass = 'popup__input_border-bottom_red';
    this._inputValidity = 'popup__input_border-bottom_black';
    this._errorVisibility = 'popup__input-text_error-visible';
    this._formElement = formElement;
  }
  //публичный метод живой валидации
  enableValidation() {
    this._setEventListeners();
  };
  //публичный метод стартовой валидации
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      //console.log(inputElement);
      this._hideInputError(inputElement);
    });
  };
  //приватный метод по валидации, активации и дезактивации кнопки отправки формы
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
  //приватный метод валидация по активации и дезактивации кнопки оптравки формы в зависимости от валидации формы
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
  //приватный метод по общей валидация всех инпутов валидируемой формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  //приватный метод по оценке валидности инпутов и выводу или сокрытию элементов и текста об ошибке
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  //приватный метод по демонстарции элементов ошибок и вывод текста ошибки
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.remove(this._inputValidity);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorVisibility);
  };
  //приватный метод по сокрытию элементов ошибок и очистка сообщений об ошибках
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.classList.add(this._inputValidity);
    this._errorElement.classList.remove(this._errorVisibility);
    this._errorElement.textContent = '';
  };
}