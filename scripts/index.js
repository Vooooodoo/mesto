//VARIABLES
//delegation var
const profileElement = document.querySelector('.profile');

//form popups open/close vars
const editPopupElement = document.querySelector('#edit-popup');
const addPopupElement = document.querySelector('#add-popup');

const editPopupFormElement = document.forms.edit;
const addPopupFormElement = document.forms.add;

const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const editPopupCloseElement = editPopupElement.querySelector('.popup__close');
const addPopupCloseElement = addPopupElement.querySelector('.popup__close');

//photo popup open/close vars
const photoPopupElement = document.querySelector('.photo-popup');
const photoPopupCloseElement = document.querySelector('.photo-popup__close');

const photoPopupPhotoElement = document.querySelector('.photo-popup__photo');
const photoPopupTitleElement = document.querySelector('.photo-popup__title');

//form popups submit vars
const editPopupInputNameElement = editPopupFormElement.elements.name;
const editPopupInputAboutElement = editPopupFormElement.elements.about;
const addPopupInputNameElement = addPopupFormElement.elements.name;
const addPopupInputLinkElement = addPopupFormElement.elements.link;

const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const editPopupSubmitElement = editPopupElement.querySelector('.popup__submit');
const addPopupSubmitElement = addPopupElement.querySelector('.popup__submit');

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

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

//FUNCTIONS
//form popups open/close functions
function resetInputsErrors(popupType) {
  const inputs = popupType.querySelectorAll('.popup__input-text');
  const inputsErrors = popupType.querySelectorAll('.popup__input-error');

  inputs.forEach(item => {
    item.classList.remove('popup__input-text_type_error');
  }); //*убрали подчёркивания ошибок валидации

  inputsErrors.forEach(item => {
    item.classList.remove('popup__input-error_show');
    item.textContent = '';
  }); //*убрали тексты ошибок валидации
}

function editPopupEscape(evt) {
  if (evt.key === 'Escape') {
    popupClose(editPopupElement);
  }
}

function addPopupEscape(evt) {
  if (evt.key === 'Escape') {
    popupClose(addPopupElement);
  }
}
//*создали две именованные функции-обработчики для каждого попапа, чтобы была возможность снять лисенер (через функциональное выражение его снять не получится)

function popupOpen(popupType) {
  popupType.classList.add('popup_opened');

  if (popupType === editPopupElement) {
    editPopupInputNameElement.value = profileTitleElement.textContent;
    editPopupInputAboutElement.value = profileSubtitleElement.textContent;
  } else if (popupType === addPopupElement) {
    addPopupInputNameElement.value = '';
    addPopupInputLinkElement.value = '';
  }

  if (popupType === editPopupElement) {
    profileElement.addEventListener('keydown', editPopupEscape);
  } else if (popupType === addPopupElement) {
    profileElement.addEventListener('keydown', addPopupEscape);
  }
}

function popupClose(popupType) {
  resetInputsErrors(popupType);

  popupType.classList.remove('popup_opened');

  if (popupType === editPopupElement) {
    profileElement.removeEventListener('keydown', editPopupEscape);
  } else if (popupType === addPopupElement) {
    profileElement.removeEventListener('keydown', addPopupEscape);
  }
}

//photo popup open/close functions
function photoPopupOpen(evt) {
  const eventTargetClosestElement = evt.target.closest('.card');

  if (evt.target.classList.contains('card__photo')) {
    photoPopupPhotoElement.src = evt.target.src;
    photoPopupPhotoElement.alt = `${eventTargetClosestElement.querySelector('.card__title').textContent}.`;
    photoPopupTitleElement.textContent = eventTargetClosestElement.querySelector('.card__title').textContent;

    photoPopupElement.classList.add('photo-popup_opened');
  }
}

function photoPopupClose() {
  photoPopupElement.classList.remove('photo-popup_opened');
}

//edit popup submit function
function editPopupSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = editPopupInputNameElement.value;
  profileSubtitleElement.textContent = editPopupInputAboutElement.value;

  popupClose(editPopupElement);
}

//add cards functions
function createCard(object) {
  const cardElement = cardTemplate.cloneNode(true); //*создали пустого клона

  cardElement.querySelector('.card__photo').src = object.link;
  cardElement.querySelector('.card__photo').alt = `${object.name}.`;
  cardElement.querySelector('.card__title').textContent = object.name;
  //*вставили клону ссылку на фото и заголовок-альтернативный текст из объекта, передав его в качестве аргумента

  return cardElement; //*вернули готового клона
}

function addDefaultCards() {
  const cardElementArray = initialCards.map(item => {
    return createCard(item);
  }); //*создали массив cardElementArray и заполнили его готовыми клонами

  cardsList.append(...cardElementArray); //*добавили готовые клоны в разметку, разложив массив cardElementArray
}

addDefaultCards();

function addNewCard(evt) {
  evt.preventDefault();

  initialCards.unshift(
    {
      name: addPopupInputNameElement.value,
      link: addPopupInputLinkElement.value
    }
  ); //*добавили новый объект с информацией поля ввода в начало массива initialCards

  const newCard = createCard(initialCards[0]); //*создали нового клона, указав в качестве аргумента функции createCard, объект с информацией поля ввода

  cardsList.prepend(newCard); //*добавили нового клона, с данными от пользователя, в начало разметки списка

  addPopupFormElement.reset(); //*сбросили все поля формы

  popupClose(addPopupElement);
}

//cards like function
function cardLikeToggle(evt) {
  if (evt.target.classList.contains('card__like')) {
    evt.target.classList.toggle('card__like_active');
  }
}

//card delete function
function cardDelete(evt) {
  const cardsListItem = evt.target.closest('.card');

  if (evt.target.classList.contains('card__trash')) {
    cardsListItem.remove();
  }
}

//LISTENERS
//form popups open/close listeners
profileEditButtonElement.addEventListener('click', () => popupOpen(editPopupElement));
profileAddButtonElement.addEventListener('click', () => popupOpen(addPopupElement));

editPopupCloseElement.addEventListener('click', () => popupClose(editPopupElement));
addPopupCloseElement.addEventListener('click', () => popupClose(addPopupElement));

editPopupElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    popupClose(editPopupElement);
  }
});
addPopupElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    popupClose(addPopupElement);
  }
});

//photo popup close listener
photoPopupCloseElement.addEventListener('click', photoPopupClose);

//form popups submit listeners
editPopupElement.addEventListener('submit', editPopupSubmit);
addPopupElement.addEventListener('submit', addNewCard);

//add cards listeners
cardsList.addEventListener('click', cardLikeToggle);
cardsList.addEventListener('click', cardDelete);
cardsList.addEventListener('click', photoPopupOpen);
//*прикрепили лисенеры на родительский элемент списка и за счёт делегирования отслеживаем все дочерние по условию в функции-обработчике
