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
    this._inputElement.classList.add(this._inputErrorClass);
    this._inputErrorElement.classList.add(this._errorClass);

    this._inputErrorElement.textContent = this._inputElement.validationMessage; //*передали спэну, в качестве текста, стоковое сообщение браузера об ошибке валидации
  }

  _hideInputError() {
    this._inputElement.classList.remove(this._inputErrorClass);
    this._inputErrorElement.classList.remove(this._errorClass);

    this._inputErrorElement.textContent = '';
  }

  _isValid() {
    if (!this._inputElement.validity.valid) { //*если инпут не проходит валидацию - предупреждать об ошибке
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((item) => {
      return !item.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._invalidButtonClass);
    } else {
      this._submitButtonElement.classList.remove(this._invalidButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._isValid();

        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._element = document.querySelector(this._formSelector);
    this._inputElement = this._element.querySelector(this._inputSelector);
    this._inputErrorElement = this._element.querySelector(`#${this._inputElement.id}-error`);
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._element.querySelector(this._submitButtonSelector);

    this._setEventListeners();
  }
}
