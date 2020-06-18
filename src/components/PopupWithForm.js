//*класс PopupWithForm - наследник класса Popup и отвечает за открытие и закрытие попапа-формы

import { Popup } from './Popup.js';

export class PopupWithForm extends Popup { //*расширили родительский класс Popup новым функционалом за счёт наследования
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector); //*ключевое слово, которое возвращает объект с унаследованными свойствами и методами родительского класса
    this._submitHandler = submitHandler; //*колбэк-функция, которая вызывается при сабмите формы (функция-обработчик сабмита формы)
  } //*расширили конструктор за счёт добавления нового свойства this._submitHandler

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

    inputList.map((item) => {
      return item.value;
    });
  }

  close() {
    const form = this._popup.querySelector('.popup__container');

    super.close();  //*метод close() родительского класса
    form.reset(); //*расширили функционал за счёт добавления сброса полей формы
  } //*перегрузили родительский метод close() за счёт полиморфизма, теперь у одноименного метода класса PopupWithForm своя реализация и расширенная функциональность

  setEventListeners() {
    super.setEventListeners(); //*добавили лисенер на кнопку закрытия попапа, используя родительский метод setEventListeners()

    this._popup.addEventListener('submit', this._submitHandler); //*добавили лисенер на кнопку сабмита
  }
}
