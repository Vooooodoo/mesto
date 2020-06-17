//*класс PopupWithImage - наследник класса Popup и отвечает за открытие и закрытие фото-попапа

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup { //*расширили родительский класс Popup новым функционалом за счёт наследования
  constructor(popupSelector) {
    super(popupSelector); //*ключевое слово, которое возвращает объект с унаследованными свойствами и методами родительского класса
  }

  open() {
    const photoPopupPhoto = this._popup.querySelector('.photo-popup__photo');
    const photoPopupTitle = this._popup.querySelector('.photo-popup__title');

    photoPopupPhoto.src = this._link;
    photoPopupPhoto.alt = `${this._name}.`;
    photoPopupTitle.textContent = this._name;
    //todo разобраться как правильно передать данные

    super.open(); //*метод open() родительского класса
  } //*перегрузили родительский метод open() за счёт полиморфизма, теперь у одноименного метода класса PopupWithImage своя реализация и расширенная функциональность
}
