//FILES FOR WEBPACK
import './index.css'; //добавили импорт главного файла стилей

//MODULES
import { Card, photoPopup } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';

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

//form-popups validation vars
const enableValidationArgs = {
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  invalidButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_show'
};

const editForm = new FormValidator(enableValidationArgs, '#edit-popup');
const addForm = new FormValidator(enableValidationArgs, '#add-popup');

//FUNCTIONS
//form-popups open/close functions
function resetInputErrors(popupType) {
  const inputList = Array.from(popupType.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

  inputList.forEach(item => {
    const inputErrorElement = document.querySelector(`#${item.id}-error`);

    item.classList.remove('popup__input-text_type_error');
    inputErrorElement.classList.remove('popup__input-error_show');

    inputErrorElement.textContent = '';
  }); //*прошлись по массиву и для каждого инпута скрыли ошибки
}

// function escapeEditPopup(evt) {
//   if (evt.key === 'Escape') {
//     resetInputErrors(editPopup); //*сбросили залипшие ошибки валидации
//     closePopup(editPopup);
//     removeEscapeListener(editPopup);
//   }
// }

// function escapeAddPopup(evt) {
//   if (evt.key === 'Escape') {
//     resetInputErrors(addPopup);
//     closePopup(addPopup);
//     removeEscapeListener(addPopup);
//   }
// }
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

function disableSubmitButton(popupType) {
  const submitButtonElement = popupType.querySelector('.popup__submit');

  submitButtonElement.classList.add('popup__submit_invalid');
}

// function openPopup(popupType) {
//   popupType.classList.add('popup_opened');
// }

function removeEscapeListener(popupType) {
  if (popupType === editPopup) {
    profile.removeEventListener('keydown', escapeEditPopup);
  } else if (popupType === addPopup) {
    profile.removeEventListener('keydown', escapeAddPopup);
  }
}

// function closePopup(popupType) {
//   if (popupType === photoPopup) {
//     popupType.classList.remove('photo-popup_opened');
//   } else {
//     popupType.classList.remove('popup_opened');
//   }
// }

//edit-popup submit function
function submitEditPopup(evt) {
  evt.preventDefault();

  profileTitle.textContent = editPopupNameInput.value;
  profileSubtitle.textContent = editPopupAboutInput.value;

  resetInputErrors(editPopup);
  closePopup(editPopup);
  removeEscapeListener(editPopup);
}

//new card add functions
function prependNewCard(card, container) {
  container.prepend(card);
}

function addNewCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: addPopupNameInput.value,
    link: addPopupLinkInput.value
  } //*создали новый объект с данными полей ввода формы

  const card = new Card(newCardData, '#card-template'); //*cоздали новый экземпляр класса Card с данными из полей ввода
  const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

  prependNewCard(cardElement, cardsList); //*добавили новую карточку, с данными от пользователя, в начало разметки списка

  addPopupForm.reset(); //*сбросили все поля формы

  resetInputErrors(addPopup);
  closePopup(addPopup);
  removeEscapeListener(addPopup);
}

//form-popups validation method
editForm.enableValidation();
addForm.enableValidation();

//LISTENERS
//form-popups open/close listeners
profileEditButton.addEventListener('click', () => {
  openPopup(editPopup);
  disableSubmitButton(editPopup);
  fillInputValues(editPopup); //*при открытии заполнили инпуты в соответствии с ТЗ
  addEscapeListener(editPopup);
});
profileAddButton.addEventListener('click', () => {
  openPopup(addPopup);
  disableSubmitButton(addPopup);
  fillInputValues(addPopup);
  addEscapeListener(addPopup);
});

profile.addEventListener('click', (evt) => {
  const parentPopup = evt.target.closest('.popup'); //*попап-родитель элемента по которому произошел клик

  if (evt.target.classList.contains('popup')) { //*если клик произошел по родителю - закрыть его
    resetInputErrors(evt.target); //*сбросили залипшие ошибки валидации
    closePopup(evt.target);
    removeEscapeListener(evt.target);
  } else if (evt.target.classList.contains('popup__close')) { //*если клик произошел по дочернему кресту - закрыть родителя
    resetInputErrors(parentPopup);
    closePopup(parentPopup);
    removeEscapeListener(parentPopup);
  }
}); //*повешали один лисенер на родителя и за счет делегирования отслеживаем событие на дочерних элементах

//photo-popup close listener
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('photo-popup') || evt.target.classList.contains('photo-popup__close')) {
    closePopup(photoPopup);
  }
});

//form-popups submit listeners
editPopup.addEventListener('submit', submitEditPopup);
addPopup.addEventListener('submit', addNewCard);

//RENDER
//default cards render
const section = new Section({
    data: initialCards, //*массив объектов с данными будущей карточки
    renderer: (cardData) => { //*в качестве аргумента передали объект с данными карточки - из массива initialCards
      const card = new Card(cardData, '#card-template'); //*cоздали новый объект-экземпляр класса Card
      const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

      section.setItem(cardElement); //*публичный метод класса Section, который добавляет готовую карточку в DOM
    },
  },
  '.cards__list'
);

section.renderItems(); //*используя новый экземпляр класса Section, создали и добавили в DOM карточки мест