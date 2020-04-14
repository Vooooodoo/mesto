//popup open/close functions
const elementPopup = document.querySelector('.popup');

function editPopupOpen () {
  elementPopup.classList.add('popup_opened');

  elementPopupInputText[0].value = elementProfileTitle.textContent;
  elementPopupInputText[1].value = elementProfileSubtitle.textContent;
}

function editPopupClose () {
  elementPopup.classList.remove('popup_opened');
}

//popup open/close listeners
const elementProfileEditButton = document.querySelector('.profile__edit-button');
elementProfileEditButton.addEventListener('click', editPopupOpen);

const elementPopupReset = document.querySelector('.popup__reset');
elementPopupReset.addEventListener('click', editPopupClose);

//popup edit function
const elementPopupInputText = document.querySelectorAll('.popup__input-text');
const elementProfileTitle = document.querySelector('.profile__title');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
  evt.preventDefault();

  elementProfileTitle.textContent = elementPopupInputText[0].value;
  elementProfileSubtitle.textContent = elementPopupInputText[1].value;
}

//popup edit listeners
elementPopup.addEventListener('submit', formSubmitHandler);

const elementPopupSubmit = document.querySelector('.popup__submit');
elementPopupSubmit.addEventListener('click', editPopupClose);
