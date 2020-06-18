//*класс PopupWithImage - наследник класса Popup и отвечает за открытие и закрытие фото-попапа

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    const photoPopupPhoto = this._popup.querySelector('.photo-popup__photo');
    const photoPopupTitle = this._popup.querySelector('.photo-popup__title');

    photoPopupPhoto.src = this._link;
    photoPopupPhoto.alt = `${this._name}.`;
    photoPopupTitle.textContent = this._name;
    //todo разобраться как правильно передать данные

    super.open();
  }
}
