//FUNCTIONS
//form popups validation fuctions
function showInputError(element) {
  element.classList.add('popup__input-text_type_error');
};

function hideInputError(element) {
  element.classList.remove('popup__input-text_type_error');
};

function isValid(evt) {
  if (!evt.target.validity.valid) {
    showInputError(evt.target);
  } else {
    hideInputError(evt.target);
  }
};

//LISTENERS
//form popups validation listeners
document.addEventListener('input', isValid);

