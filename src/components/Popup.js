export default class Popup {
  constructor(selectorPopup, selectors) {
    this._popup = document.querySelector(selectorPopup);
    this._popupButtonClose = this._popup.querySelector(selectors.buttonClosePopup);
    this._popupOpened = 'popup_opened';
    this._openPopup = document.querySelector('.popup_opened');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._popupOpened);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._popupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupButtonClose.addEventListener('click', () => {
      this.close();
    });
    
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}