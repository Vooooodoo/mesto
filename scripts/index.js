//todo зафиксить, чтобы браузер ругался на незаполненные поля ввода, а не закрывал их

//VARIABLES
//form popups open/close vars
const elementEditPopup = document.querySelector('#edit-popup');
const elementAddPopup = document.querySelector('#add-popup');

const elementProfileEditButton = document.querySelector('.profile__edit-button');
const elementProfileAddButton = document.querySelector('.profile__add-button');

const elementEditPopupClose = elementEditPopup.querySelector('.popup__close');
const elementAddPopupClose = elementAddPopup.querySelector('.popup__close');

//photo popup open/close vars
const elementPhotoPopup = document.querySelector('.photo-popup');
const elementPhotoPopupClose = document.querySelector('.photo-popup__close');

const elementPhotoPopupPhoto = document.querySelector('.photo-popup__photo');
const elementPhotoPopupTitle = document.querySelector('.photo-popup__title');

//popups submit vars
const elementPopupInputText = document.querySelectorAll('.popup__input-text');
const elementEditPopupInputName = document.querySelector('#edit-popup-input-name');
const elementEditPopupInputAbout = document.querySelector('#edit-popup-input-about');
const elementAddPopupInputName = document.querySelector('#add-popup-input-name');
const elementAddPopupInputLink = document.querySelector('#add-popup-input-link');

const elementProfileTitle = document.querySelector('.profile__title');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');

const elementEditPopupSubmit = elementEditPopup.querySelector('.popup__submit');
const elementAddPopupSubmit = elementAddPopup.querySelector('.popup__submit');

//add cards vars
const initialCards = [
  {
    name: 'Кавказ',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1564324738343-a8aeafb375d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Урал',
    link: 'https://images.unsplash.com/photo-1583425722128-4c2134bfff3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Крым',
    link: 'https://images.unsplash.com/photo-1586767240180-f99b455c8ec5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1571649425554-e94518844c37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
  }
];

const cardElementArray = [];

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

//FUNCTIONS
//form popups open/close functions
function popupOpen(popupType) {
  popupType.classList.add('popup_opened');

  elementEditPopupInputName.value = elementProfileTitle.textContent;
  elementEditPopupInputAbout.value = elementProfileSubtitle.textContent;
}

function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}

//photo popup open/close functions
function photoPopupOpen(evt) {
  const eventTargetClosestElement = evt.target.closest('.card');

  elementPhotoPopupPhoto.src = evt.target.src;
  elementPhotoPopupPhoto.alt = eventTargetClosestElement.querySelector('.card__title').textContent + '.';
  elementPhotoPopupTitle.textContent = eventTargetClosestElement.querySelector('.card__title').textContent;

  elementPhotoPopup.classList.add('photo-popup_opened');
}

function photoPopupClose() {
  elementPhotoPopup.classList.remove('photo-popup_opened');
}

//edit popup submit function
function editPopupSubmit(evt) {
  evt.preventDefault();

  elementProfileTitle.textContent = elementEditPopupInputName.value;
  elementProfileSubtitle.textContent = elementEditPopupInputAbout.value;
}

//add cards functions
function addDefaultCardsList() {
  for (let i = 0; i < initialCards.length; i++) {
    cardElementArray.push(cardTemplate.cloneNode(true));
  } //*запушили в массив cardElementArray шесть клонов шаблона

  cardElementArray.forEach(cardElement => {
    cardElement.querySelector('.card__photo').src = initialCards[cardElementArray.indexOf(cardElement)].link;
    cardElement.querySelector('.card__photo').alt = initialCards[cardElementArray.indexOf(cardElement)].name + '.';
    cardElement.querySelector('.card__title').textContent = initialCards[cardElementArray.indexOf(cardElement)].name;
    cardElement.querySelector('.card__like').addEventListener('click', cardLikeToggle);
    cardElement.querySelector('.card__trash').addEventListener('click', cardDelete);
    cardElement.querySelector('.card__photo').addEventListener('click', photoPopupOpen);
  }); //*каждому клону вставили соответствующую ссылку на фото, заголовок - альтернативный текст из массива initialCards и лисенеры

  cardsList.append(...cardElementArray); //*добавили готовые клоны в разметку
};

addDefaultCardsList();

function addNewCard(evt) {
  evt.preventDefault();

  cardElementArray.unshift(cardTemplate.cloneNode(true)); //*добавили новый клон шаблона в начало массива cardElementArray

  initialCards.unshift(
    {
      name: elementAddPopupInputName.value,
      link: elementAddPopupInputLink.value
    }
  ); //*добавили новый объект с информацией поля ввода в массив initialCards

  cardElementArray[0].querySelector('.card__photo').src = initialCards[0].link;
  cardElementArray[0].querySelector('.card__photo').alt = initialCards[0].name + '.';
  cardElementArray[0].querySelector('.card__title').textContent = initialCards[0].name;
  cardElementArray[0].querySelector('.card__like').addEventListener('click', cardLikeToggle);
  cardElementArray[0].querySelector('.card__trash').addEventListener('click', cardDelete);
  cardElementArray[0].querySelector('.card__photo').addEventListener('click', photoPopupOpen);
  //*заполнили новый клон данными из полей ввода(массив initialCards) и добавили лисенеры

  cardsList.prepend(cardElementArray[0]); //*добавили нового клона, с данными от пользователя, в начало разметки списка

  elementAddPopupInputLink.value = '';
  elementAddPopupInputName.value = '';
}

//cards like function
function cardLikeToggle(evt) {
  const eventTarget = evt.target;

  eventTarget.classList.toggle('card__like_active');
}

//card delete function
function cardDelete(evt) {
  const eventTarget = evt.target;
  const cardsListItem = eventTarget.closest('.card');

  cardsListItem.remove();
}

//LISTENERS
//form popups open/close listeners
elementProfileEditButton.addEventListener('click', () => popupOpen(elementEditPopup));
elementEditPopupClose.addEventListener('click', () => popupClose(elementEditPopup));

elementProfileAddButton.addEventListener('click', () => popupOpen(elementAddPopup));
elementAddPopupClose.addEventListener('click', () => popupClose(elementAddPopup));

//photo popup close listener
elementPhotoPopupClose.addEventListener('click', photoPopupClose);

//popups submit listeners
elementEditPopup.addEventListener('submit', editPopupSubmit);
elementEditPopupSubmit.addEventListener('click', () => popupClose(elementEditPopup));

elementAddPopup.addEventListener('submit', addNewCard);
elementAddPopupSubmit.addEventListener('click', () => popupClose(elementAddPopup));
