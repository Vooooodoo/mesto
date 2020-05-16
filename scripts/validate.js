//VARIABLES
//form popups validation vars
const elementEditPopupForm = document.forms.edit;
const elementAddPopupForm = document.forms.add;

const elementEditPopupInputName = elementEditPopupForm.elements.name;
const elementEditPopupInputAbout = elementEditPopupForm.elements.about;
const elementAddPopupInputName = elementAddPopupForm.elements.name;
const elementAddPopupInputLink = elementAddPopupForm.elements.link;



//FUNCTIONS
//form popups validation fuctions
function showInputError(element) {
  element.classList.add('popup__input-text_type_error');
};

function hideInputError(element) {
  element.classList.remove('popup__input-text_type_error');
};

function isValid(evt) {
  if (!evt.target.validity.valid && evt.target.classList.contains('popup__input-text')) {
    showInputError(evt.target);
  } else {
    hideInputError(evt.target);
  }
};

//LISTENERS
//form popups validation listeners
document.addEventListener('input', isValid);
