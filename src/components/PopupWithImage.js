//*класс PopupWithImage - наследник класса Popup и отвечает за открытие и закрытие фото-попапа

import { Popup } from './Popup.js';

//CLASS
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) { //*добавили два параметра, аргументы получим из класса Card, при вызове этого метода в index.js, как тела колбэк-функции handleCardClick
    const photoPopupPhoto = this._popup.querySelector('.popup__photo');
    const photoPopupTitle = this._popup.querySelector('.popup__photo-title');

    photoPopupPhoto.src = link;
    photoPopupPhoto.alt = `${name}.`;
    photoPopupTitle.textContent = name;

    super.open();
  }
}
