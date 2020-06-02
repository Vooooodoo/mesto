//MODULES
import { Card } from './Card.js';

//VARIABLES
//delegation var
const profile = document.querySelector('.profile');

//form-popups open/close vars
const editPopup = document.querySelector('#edit-popup');
const addPopup = document.querySelector('#add-popup');

const editPopupForm = document.forms.edit;
const addPopupForm = document.forms.add;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//photo-popup open/close vars
const photoPopup = document.querySelector('.photo-popup');
const photoPopupCloseButton = document.querySelector('.photo-popup__close');

const photoPopupPhoto = document.querySelector('.photo-popup__photo');
const photoPopupTitle = document.querySelector('.photo-popup__title');

//form-popups submit vars
const editPopupNameInput = editPopupForm.elements.name;
const editPopupAboutInput = editPopupForm.elements.about;
const addPopupNameInput = addPopupForm.elements.name;
const addPopupLinkInput = addPopupForm.elements.link;

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//render cards vars
const cardsList = document.querySelector('.cards__list');
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

//FUNCTIONS
//form-popups open/close functions
function resetInputErrors(popupType) {
  const inputList = Array.from(popupType.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

  inputList.forEach(item => {
    hideInputError(popupType, item, 'popup__input-text_type_error', 'popup__input-error_show');
  }); //*прошлись по массиву и для каждого инпута скрыли ошибки
}

function escapeEditPopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(editPopup);
  }
}

function escapeAddPopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(addPopup);
  }
}
//*создали две именованные функции-обработчики для каждого попапа, чтобы была возможность снять лисенер (через функциональное выражение его снять не получится)

function fillInputValues(popupType) {
  if (popupType === editPopup) {
    editPopupNameInput.value = profileTitle.textContent;
    editPopupAboutInput.value = profileSubtitle.textContent;
  } else if (popupType === addPopup) {
    addPopupNameInput.value = '';
    addPopupLinkInput.value = '';
  }
}

function addEscapeListener(popupType) {
  if (popupType === editPopup) {
    profile.addEventListener('keydown', escapeEditPopup);
  } else if (popupType === addPopup) {
    profile.addEventListener('keydown', escapeAddPopup);
  }
}

function openPopup(popupType) {
  const submitButtonElement = popupType.querySelector('.popup__submit');

  popupType.classList.add('popup_opened');
  submitButtonElement.classList.add('popup__submit_invalid');

  fillInputValues(popupType);//*при открытии заполнили инпуты в соответствии с ТЗ

  addEscapeListener(popupType);
}

function removeEscapeListener(popupType) {
  if (popupType === editPopup) {
    profile.removeEventListener('keydown', escapeEditPopup);
  } else if (popupType === addPopup) {
    profile.removeEventListener('keydown', escapeAddPopup);
  }
}

function closePopup(popupType) {
  resetInputErrors(popupType); //*сбросили залипшие ошибки валидации

  popupType.classList.remove('popup_opened');

  removeEscapeListener(popupType);
}

//photo-popup open/close functions
// function openPhotoPopup(evt) {
//   const parentCard = evt.target.closest('.card'); //*карточка-родитель фотографии по которой произошел клик

//   if (evt.target.classList.contains('card__photo')) {
//     photoPopupPhoto.src = evt.target.src;
//     photoPopupPhoto.alt = `${parentCard.querySelector('.card__title').textContent}.`;
//     photoPopupTitle.textContent = parentCard.querySelector('.card__title').textContent;

//     photoPopup.classList.add('photo-popup_opened');
//   }
// }

function closePhotoPopup() {
  photoPopup.classList.remove('photo-popup_opened');
}

//edit-popup submit function
function submitEditPopup(evt) {
  evt.preventDefault();

  profileTitle.textContent = editPopupNameInput.value;
  profileSubtitle.textContent = editPopupAboutInput.value;

  closePopup(editPopup);
}

//render default cards function
function renderCards(array) {
  array.forEach((item) => {
    const card = new Card(item, '#card-template'); //*cоздали новый объект-экземпляр класса Card с данными из объекта в массиве initialCards
    const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

    cardsList.append(cardElement); //*добавили готовую карточку в DOM
  });
}
renderCards(initialCards); //*передали функции рэндера карточек, в качестве аргумента, массив с данными

//add new card function
function addNewCard(evt) {
  evt.preventDefault();

  initialCards.unshift(
    {
      name: addPopupNameInput.value,
      link: addPopupLinkInput.value
    }
  ); //*добавили новый объект с данными поля ввода в начало массива initialCards

  const card = new Card(initialCards[0], '#card-template'); //*cоздали новый экземпляр класса Card с данными из полей ввода
  const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

  cardsList.prepend(cardElement); //*добавили новую карточку, с данными от пользователя, в начало разметки списка

  addPopupForm.reset(); //*сбросили все поля формы

  closePopup(addPopup);
}

//LISTENERS
//form-popups open/close listeners
profileEditButton.addEventListener('click', () => openPopup(editPopup));
profileAddButton.addEventListener('click', () => openPopup(addPopup));

profile.addEventListener('click', (evt) => {
  const parentPopup = evt.target.closest('.popup'); //*попап-родитель элемента по которому произошел клик

  if (evt.target.classList.contains('popup')) { //*если клик произошел по родителю - закрыть его
    closePopup(evt.target);
  } else if (evt.target.classList.contains('popup__close')) { //*если клик произошел по дочернему кресту - закрыть родителя
    closePopup(parentPopup);
  }
}); //*повешали один лисенер на родителя и за счет делегирования отслеживаем событие на дочерних элементах

//photo-popup close listener
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('photo-popup') || evt.target.classList.contains('photo-popup__close')) {
    closePhotoPopup();
  }
});

//form-popups submit listeners
editPopup.addEventListener('submit', submitEditPopup);
addPopup.addEventListener('submit', addNewCard);
