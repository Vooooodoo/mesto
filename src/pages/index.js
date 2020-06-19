//FILES FOR WEBPACK
import './index.css'; //добавили импорт главного файла стилей

//MODULES
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//VARIABLES
//form-popus open/close vars
const editPopupForm = document.forms.edit;
const addPopupForm = document.forms.add;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//form-popups validation vars
const enableValidationArgs = {
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  invalidButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_show'
};

//form-popups submit vars
const editPopupNameInput = editPopupForm.elements.name;
const editPopupAboutInput = editPopupForm.elements.about;
const addPopupNameInput = addPopupForm.elements.name;
const addPopupLinkInput = addPopupForm.elements.link;

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

//INSTANCES
//UserInfo
const profileUserInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

//PopupWithForm
const editPopup = new PopupWithForm('#edit-popup', {
  handleSubmit: (evt) => {
    evt.preventDefault();

    profileUserInfo.setUserInfo();
    editPopup.close();
    // removeEscapeListener(editPopup);
  }
});

const addPopup = new PopupWithForm('#add-popup', {
  handleSubmit: (evt) => {
    evt.preventDefault();

    const newCardData = {
      name: addPopupNameInput.value,
      link: addPopupLinkInput.value
    } //*создали новый объект с данными полей ввода формы

    const card = new Card(newCardData, '#card-template', {
      handleCardClick: (evt) => {
        photoPopup.open(evt);
      }
    }); //*cоздали новый экземпляр класса Card с данными из полей ввода
    const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

    prependNewCard(cardElement, cardsList); //*добавили новую карточку, с данными от пользователя, в начало разметки списка

    addPopup.close();
    // removeEscapeListener(addPopup);
  }
});

//PopupWithImage
const photoPopup = new PopupWithImage('#photo-popup');

//FormValidator
const editForm = new FormValidator(enableValidationArgs, '#edit-popup');
const addForm = new FormValidator(enableValidationArgs, '#add-popup');

//Section
const section = new Section({
  data: initialCards, //*массив объектов с данными будущей карточки
  renderer: (cardData) => { //*в качестве аргумента передали объект с данными карточки - из массива initialCards
    const card = new Card(cardData, '#card-template', {
      handleCardClick: (evt) => {
        photoPopup.open(evt);
      }
    }); //*cоздали новый объект-экземпляр класса Card
    const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

    section.addItem(cardElement); //*публичный метод класса Section, который добавляет готовую карточку в DOM
  },
},
'.cards__list' //*передали селектор контейнера для карточек
);

//FUNCTIONS
//form-popups open/close functions
function fillUserInfo() {
  editPopupNameInput.value = profileUserInfo.getUserInfo().name;
  editPopupAboutInput.value = profileUserInfo.getUserInfo().about;
}

//new card add function
function prependNewCard(card, container) {
  container.prepend(card);
}

//METHODS
//default cards render
section.renderItems(); //*используя новый экземпляр класса Section, создали и добавили в DOM карточки мест

//form-popups validation method
editForm.enableValidation();
addForm.enableValidation();

//LISTENERS
//form-popups open/close listeners
profileEditButton.addEventListener('click', () => {
  editPopup.open();
  editPopup.disableSubmitButton(); //*деактивировали кнопку сабимат
  editPopup.resetInputErrors(); //*сбросили залипшие ошибки валидации
  fillUserInfo(); //*заполнили инпуты в соответствии с ТЗ
  // addEscapeListener(editPopup);
});

editPopup.setEventListeners();

profileAddButton.addEventListener('click', () => {
  addPopup.open();
  addPopup.disableSubmitButton();
  addPopup.resetInputErrors();
  // addEscapeListener(addPopup);
});

addPopup.setEventListeners();






// profile.addEventListener('click', (evt) => {
//   const parentPopup = evt.target.closest('.popup'); //*попап-родитель элемента по которому произошел клик

//   if (evt.target.classList.contains('popup')) { //*если клик произошел по родителю - закрыть его
//     resetInputErrors(evt.target); //*сбросили залипшие ошибки валидации
//     closePopup(evt.target);
//     removeEscapeListener(evt.target);
//   } else if (evt.target.classList.contains('popup__close')) { //*если клик произошел по дочернему кресту - закрыть родителя
//     resetInputErrors(parentPopup);
//     closePopup(parentPopup);
//     removeEscapeListener(parentPopup);
//   }
// }); //*повешали один лисенер на родителя и за счет делегирования отслеживаем событие на дочерних элементах

//photo-popup close listener
// photoPopup.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('photo-popup') || evt.target.classList.contains('photo-popup__close')) {
//     closePopup(photoPopup);
//   }
// });
