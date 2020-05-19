//FUNCTIONS
//form popups validation fuctions
function showInputError(formElement, inputElement, errorMessage) {
  const inputErrorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add('popup__input-text_type_error');
  inputErrorElement.classList.add('popup__input-error_show');

  inputErrorElement.textContent = errorMessage; //*передали спэну, в качестве текста, сообщение об ошибке из параметра
}

function hideInputError(formElement, inputElement) {
  const inputErrorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('popup__input-text_type_error');
  inputErrorElement.classList.remove('popup__input-error_show');

  inputErrorElement.textContent = '';
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) { //*если инпут не проходит валидацию - предупреждать об ошибке
    showInputError(formElement, inputElement, inputElement.validationMessage); //*вторым аргументом передали стоковое сообщение браузера об ошибке валидации
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
}

function toggleButtonState(inputList, submitButtonElement) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add('popup__submit_invalid');
  } else {
    submitButtonElement.classList.remove('popup__submit_invalid');
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
  const submitButtonElement = formElement.querySelector('.popup__submit');

  toggleButtonState(inputList, submitButtonElement);

  inputList.forEach((item) => {
    item.addEventListener('input', function () {
      isValid(formElement, item);

      toggleButtonState(inputList, submitButtonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach((item) => {
    setEventListeners(item);
  });
}

enableValidation();
