//popups open/close vars
const elementPopup = document.querySelectorAll('.popup');
const elementEditPopup = elementPopup[0];
const elementAddPopup = elementPopup[1];

const editPopupIndex = 0; //индекс объекта в массиве
const addPopupIndex = 1;

const elementProfileEditButton = document.querySelector('.profile__edit-button');
const elementProfileAddButton = document.querySelector('.profile__add-button');

const elementPopupClose = document.querySelectorAll('.popup__close');
const elementEditPopupClose = elementPopupClose[0];
const elementAddPopupClose = elementPopupClose[1];

//popups submit vars
const elementPopupInputText = document.querySelectorAll('.popup__input-text');
const elementEditPopupInputName = elementPopupInputText[0];
const elementEditPopupInputAbout = elementPopupInputText[1];
const elementAddPopupInputName = elementPopupInputText[2];
const elementAddPopupInputLink = elementPopupInputText[3];

const elementProfileTitle = document.querySelector('.profile__title');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');

const elementPopupSubmit = document.querySelectorAll('.popup__submit');
const elementEditPopupSubmit = elementPopupSubmit[0];
const elementAddPopupSubmit = elementPopupSubmit[1];

//cards vars
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardElementArray = [];

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

const cardElement = cardTemplate.cloneNode(true); //клонируем содержимое тега template
const cardElementTitle = cardElement.querySelector('.card__title'); //нашли заголовок клона
const cardElementPhoto = cardElement.querySelector('.card__photo'); //нашли фото клона



//popups open/close functions
function popupOpen(popupIndex) {
  elementPopup[popupIndex].classList.add('popup_opened');

  elementEditPopupInputName.value = elementProfileTitle.textContent;
  elementEditPopupInputAbout.value = elementProfileSubtitle.textContent;
}

function popupClose(popupIndex) {
  elementPopup[popupIndex].classList.remove('popup_opened');
}

//edit popup submit function
function editPopupSubmit(evt) {
  evt.preventDefault();

  elementProfileTitle.textContent = elementEditPopupInputName.value;
  elementProfileSubtitle.textContent = elementEditPopupInputAbout.value;
}

//add cards functions
function addDefaultCardsList() {
  for (let i = 0; i < 6; i++) {
    cardElementArray.push(cardElement);
  }

  cardElementArray.forEach(element => {
    cardElementPhoto.src = initialCards[cardElementArray.indexOf(element)].link;
    cardElementTitle.textContent = initialCards[cardElementArray.indexOf(element)].name;
  });

  cardsList.append(...cardElementArray);
};

addDefaultCardsList();

function addCard(evt) {
  evt.preventDefault();

  cardElementPhoto.src = elementAddPopupInputLink.value;
  cardElementTitle.textContent = elementAddPopupInputName.value;

  cardElementArray.unshift(cardElement);

  elementAddPopupInputLink.value = '';
  elementAddPopupInputName.value = '';
}

//popups open/close listeners
elementProfileEditButton.addEventListener('click', () => popupOpen(editPopupIndex));
elementEditPopupClose.addEventListener('click', () => popupClose(editPopupIndex));

elementProfileAddButton.addEventListener('click', () => popupOpen(addPopupIndex));
elementAddPopupClose.addEventListener('click', () => popupClose(addPopupIndex));

//popups submit listeners
elementEditPopup.addEventListener('submit', editPopupSubmit);
elementEditPopupSubmit.addEventListener('click', () => popupClose(editPopupIndex));

elementAddPopup.addEventListener('submit', addCard);
elementAddPopupSubmit.addEventListener('click', () => popupClose(addPopupIndex));
