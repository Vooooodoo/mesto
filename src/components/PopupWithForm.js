//*класс PopupWithForm - наследник класса Popup и отвечает за открытие и закрытие попапа-формы

import { Popup } from './Popup.js';

//CLASS
export class PopupWithForm extends Popup { //*расширили родительский класс Popup новым функционалом за счёт наследования
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector); //*ключевое слово, которое возвращает объект с унаследованными свойствами и методами родительского класса
    this._handleSubmit = handleSubmit; //*колбэк-функция, которая вызывается при сабмите формы (функция-обработчик сабмита формы)
  } //*расширили конструктор за счёт добавления нового свойства this._handleSubmit

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input-text'); //*нашли все инпуты внутри формы

    this._formValues = {}; //*создали пустой объект

    this._inputList.forEach(item => {
      this._formValues[item.name] = item.value;
    }); //*добавили в пустой объект значения всех инпутов, ключами будут значения атрибутов name

    return this._formValues; //*вернули объект со значениями
  }

  _resetInputErrors() {
    const inputList = Array.from( this._popup.querySelectorAll('.popup__input-text')); //*сделали массив из всех

    inputList.forEach(item => {
      const inputErrorElement = document.querySelector(`#${item.id}-error`);

      item.classList.remove('popup__input-text_type_error');
      inputErrorElement.classList.remove('popup__input-error_show');

      inputErrorElement.textContent = '';
    }); //*прошлись по массиву и для каждого инпута скрыли ошибки
  }

  disableSubmitButton() {
    const submitButtonElement = this._popup.querySelector('.popup__submit');

    submitButtonElement.classList.add('popup__submit_invalid');
  }

  close() {
    const form = this._popup.querySelector('.popup__container');

    super.close();  //*метод close() родительского класса
    this._resetInputErrors(); //*сбросили залипшие ошибки валидации
    form.reset(); //*cбросили поля формы стоковым методом для работы с формами
  } //*перегрузили родительский метод close() за счёт полиморфизма, теперь у одноименного метода класса PopupWithForm своя реализация и расширенная функциональность

  setEventListeners() {
    super.setEventListeners(); //*добавили лисенер на кнопку закрытия попапа, используя родительский метод setEventListeners()

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmit(this._getInputValues()); //*результат работы _getInputValues окажется на месте параметра formData при описании обработчика в index.js
    }); //*добавили лисенер на кнопку сабмита
  }
}
