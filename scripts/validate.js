//VARIABLES
//form popups validation vars
const enableValidationArgs = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  invalidButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_show'
}

//FUNCTIONS
//form popups validation fuctions
function showInputError(formElement, inputElement, errorMessage) {
  const inputErrorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  inputErrorElement.classList.add(errorClass);

  inputErrorElement.textContent = errorMessage; //*передали спэну, в качестве текста, сообщение об ошибке из параметра
}

function hideInputError(formElement, inputElement) {
  const inputErrorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  inputErrorElement.classList.remove(errorClass);

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
    submitButtonElement.classList.add(invalidButtonClass);
  } else {
    submitButtonElement.classList.remove(invalidButtonClass);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, submitButtonElement);

  inputList.forEach((item) => {
    item.addEventListener('input', function () {
      isValid(formElement, item);

      toggleButtonState(inputList, submitButtonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((item) => {
    setEventListeners(item);
  });
}

enableValidation();
