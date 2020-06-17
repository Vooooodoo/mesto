//*класс PopupWithForm - наследник класса Popup и отвечает за открытие и закрытие попапа-формы

import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler; //*колбэк-функция, которая вызывается при сабмите формы (обработчик сабмита формы)
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

    inputList.map((item) => {
      return item.value;
    });
  }

  close() {
    const form = this._popup.querySelector('.popup__container');

    super.close();
    form.reset(); //*сбросили все поля формы
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', this._submitHandler);
  }
}
