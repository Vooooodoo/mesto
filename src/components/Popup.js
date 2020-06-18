//*класс Popup отвечает за открытие и закрытие попапа

//CLASS
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const popupCloseButton = this._popup.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
