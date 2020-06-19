//*класс PopupWithForm - наследник класса Popup и отвечает за открытие и закрытие попапа-формы

import { Popup } from './Popup.js';

//CLASS
export class PopupWithForm extends Popup { //*расширили родительский класс Popup новым функционалом за счёт наследования
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector); //*ключевое слово, которое возвращает объект с унаследованными свойствами и методами родительского класса
    this._handleSubmit = handleSubmit; //*колбэк-функция, которая вызывается при сабмите формы (функция-обработчик сабмита формы)
  } //*расширили конструктор за счёт добавления нового свойства this._handleSubmit

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

    inputList.map((item) => {
      return item.value;
    });
  }

  disableSubmitButton() {
    const submitButtonElement = this._popup.querySelector('.popup__submit');

    submitButtonElement.classList.add('popup__submit_invalid');
  }

  resetInputErrors() {
    const inputList = Array.from( this._popup.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

    inputList.forEach(item => {
      const inputErrorElement = document.querySelector(`#${item.id}-error`);

      item.classList.remove('popup__input-text_type_error');
      inputErrorElement.classList.remove('popup__input-error_show');

      inputErrorElement.textContent = '';
    }); //*прошлись по массиву и для каждого инпута скрыли ошибки
  }

  close() {
    const form = this._popup.querySelector('.popup__container');

    super.close();  //*метод close() родительского класса
    form.reset(); //*расширили функционал за счёт добавления сброса полей формы
  } //*перегрузили родительский метод close() за счёт полиморфизма, теперь у одноименного метода класса PopupWithForm своя реализация и расширенная функциональность

  setEventListeners() {
    super.setEventListeners(); //*добавили лисенер на кнопку закрытия попапа, используя родительский метод setEventListeners()

    this._popup.addEventListener('submit', this._handleSubmit); //*добавили лисенер на кнопку сабмита
  }
}
