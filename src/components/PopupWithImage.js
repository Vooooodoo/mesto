//*класс PopupWithImage - наследник класса Popup и отвечает за открытие и закрытие фото-попапа

import { Popup } from './Popup.js';

//CLASS
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    const photoPopupPhoto = this._popup.querySelector('.popup__photo');
    const photoPopupTitle = this._popup.querySelector('.popup__photo-title');

    photoPopupPhoto.src = evt.target.src;
    photoPopupPhoto.alt = evt.target.alt;
    photoPopupTitle.textContent = evt.target.alt.slice(0, -1);

    super.open();

    console.log(evt.target.alt.slice(0, -1));
  }
}
