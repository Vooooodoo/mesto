//*класс UserInfo отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
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
