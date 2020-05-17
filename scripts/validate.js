//FUNCTIONS
//form popups validation fuctions
function showInputError(elementInput, errorMessage) {
  const elementInputError = document.querySelector(`#${elementInput.id}-error`);

  elementInput.classList.add('popup__input-text_type_error');
  elementInputError.classList.add('popup__input-error_show');

  elementInputError.textContent = errorMessage; //*передали спэну в качестве текста сообщение об ошибке из параметра
};

function hideInputError(elementInput) {
  const elementInputError = document.querySelector(`#${elementInput.id}-error`);

  elementInput.classList.remove('popup__input-text_type_error');
  elementInputError.classList.remove('popup__input-error_show');

  elementInputError.textContent = '';
};

function isValid(evt) {
  if (!evt.target.validity.valid) { //*если инпут не проходит валидацию - предупреждать об ошибке
    showInputError(evt.target, evt.target.validationMessage); //*вторым аргументом передали стоковое сообщение браузера об ошибке валидации
  } else {
    hideInputError(evt.target);
  }
};

//LISTENERS
//form popups validation listeners
elementProfile.addEventListener('input', isValid); //*отслеживаем все дочерние инпуты элемента profile, за счёт делегирования
