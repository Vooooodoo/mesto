//FUNCTIONS
//form popups validation fuctions
function showInputError(inputElement, errorMessage) {
  const inputErrorElement = document.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add('popup__input-text_type_error');
  inputErrorElement.classList.add('popup__input-error_show');

  inputErrorElement.textContent = errorMessage; //*передали спэну в качестве текста сообщение об ошибке из параметра
}

function hideInputError(inputElement) {
  const inputErrorElement = document.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('popup__input-text_type_error');
  inputErrorElement.classList.remove('popup__input-error_show');

  inputErrorElement.textContent = '';
}

function hasInvalidInput(evt) {
  const parentPopup = evt.target.closest('.popup');
  const inputList = parentPopup.querySelectorAll('.popup__input-text')

  return inputList.some((item) => {
    return !item.validity.valid;
  });
}

function toggleButtonState(evt) {
  const parentPopup = evt.target.closest('.popup');
  const submitButton = parentPopup.querySelector('.popup__submit');

  if (!evt.target.validity.valid) {
    submitButton.classList.add('popup__submit_invalid');
  } else {
    submitButton.classList.remove('popup__submit_invalid');
  }
}

function isValid(evt) {
  if (!evt.target.validity.valid) { //*если инпут не проходит валидацию - предупреждать об ошибке
    showInputError(evt.target, evt.target.validationMessage); //*вторым аргументом передали стоковое сообщение браузера об ошибке валидации
  } else {
    hideInputError(evt.target);
  }

  if (hasInvalidInput(evt)) {
    console.log('есть невалидное поле');
  }
}

//LISTENERS
//form popups validation listeners
profileElement.addEventListener('input', isValid); //*отслеживаем все дочерние инпуты элемента profile, за счёт делегирования
