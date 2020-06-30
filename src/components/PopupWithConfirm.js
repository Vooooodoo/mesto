//*класс PopupWithConfirm - наследник класса Popup и отвечает за открытие и закрытие попапа с подтверждением

import { Popup } from './Popup.js';

//CLASS
export class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', (evt) => {
      this._handleSubmit();
    });
  }
}
