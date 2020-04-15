//popup open/close vars
const elementPopup = document.querySelector('.popup');
const elementProfileEditButton = document.querySelector('.profile__edit-button');
const elementPopupClose = document.querySelector('.popup__close');

//popup edit vars
const elementPopupInputText = document.querySelectorAll('.popup__input-text');
const elementProfileTitle = document.querySelector('.profile__title');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');
const elementPopupSubmit = document.querySelector('.popup__submit');

//popup open/close functions
function editPopupOpen () {
  elementPopup.classList.add('popup_opened');

  elementPopupInputText[0].value = elementProfileTitle.textContent;
  elementPopupInputText[1].value = elementProfileSubtitle.textContent;
}

function editPopupClose () {
  elementPopup.classList.remove('popup_opened');
}

//popup edit function
function formSubmitHandler (evt) {
  evt.preventDefault();

  elementProfileTitle.textContent = elementPopupInputText[0].value;
  elementProfileSubtitle.textContent = elementPopupInputText[1].value;
}

//popup open/close listeners
elementProfileEditButton.addEventListener('click', editPopupOpen);
elementPopupClose.addEventListener('click', editPopupClose);

//popup edit listeners
elementPopup.addEventListener('submit', formSubmitHandler);
elementPopupSubmit.addEventListener('click', editPopupClose);
