//FILES FOR WEBPACK
import './index.css'; //*добавили импорт главного файла стилей

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
  handleSubmit: () => {
    profileUserInfo.setUserInfo();
    editPopup.close();
  }
});

const addPopup = new PopupWithForm('#add-popup', {
  handleSubmit: (formData) => {
    const card = new Card(formData, '#card-template', {
      handleCardClick: (evt) => {
        photoPopup.open(evt);
      }
    }); //*cоздали новый объект-экземпляр класса Card с данными из полей ввода, которые получены с помощью приватного метода _getInputValues() класса PopupWithForm
    const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

    prependNewCard(cardElement, cardsList); //*добавили новую карточку, с данными от пользователя, в начало разметки списка

    addPopup.close();
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
  renderer: (cardData) => { //*объект, который мы передали при вызове функции this._renderer в классе Section, оказался на месте параметра cardData
    const card = new Card(cardData, '#card-template', {
      handleCardClick: (evt) => {
        photoPopup.open(evt);
      }
    });
    const cardElement = card.createCard();

    section.addItem(cardElement); //*публичный метод класса Section, который добавляет готовую карточку в DOM
  },
},
'.cards__list' //*передали селектор контейнера для карточек в качестве аргумента
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
section.renderItems(); //*используя новый экземпляр класса Section, создали и добавили в DOM карточки всех мест

//form-popups validation method
editForm.enableValidation();
addForm.enableValidation();

//LISTENERS
//edit-popup open/close listeners
profileEditButton.addEventListener('click', () => {
  editPopup.open();
  editPopup.disableSubmitButton(); //*деактивировали кнопку сабмита
  fillUserInfo(); //*при открытии заполнили инпуты в соответствии с ТЗ
});

editPopup.setEventListeners();

//add-popup open/close listeners
profileAddButton.addEventListener('click', () => {
  addPopup.open();
  addPopup.disableSubmitButton();
});

addPopup.setEventListeners();

//photo-popup close listeners
photoPopup.setEventListeners();
