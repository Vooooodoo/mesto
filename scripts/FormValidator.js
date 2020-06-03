//CLASS
export class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._invalidButtonClass = data.invalidButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
  }

  _showInputError() {
    const formElement = document.querySelector(this._formSelector);
    this._element = formElement;

    const inputElement = this._element.querySelector(this._inputSelector);
    const inputErrorElement = this._element.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    inputErrorElement.classList.add(this._errorClass);

    inputErrorElement.textContent = inputElement.validationMessage; //*передали спэну, в качестве текста, стоковое сообщение браузера об ошибке валидации
  }

  _hideInputError() {
    const inputElement = this._element.querySelector(this._inputSelector);
    const inputErrorElement = this._element.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    inputErrorElement.classList.remove(this._errorClass);

    inputErrorElement.textContent = '';
  }

  _isValid() {
    const inputElement = this._element.querySelector(this._inputSelector);

    if (!inputElement.validity.valid) { //*если инпут не проходит валидацию - предупреждать об ошибке
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));

    inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._isValid();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    console.log('hello!');
  }
}
