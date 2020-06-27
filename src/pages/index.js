//!вернуть флаг --watch в тело скрипта в файле package.json

//FILES FOR WEBPACK
import './index.css'; //*добавили импорт главного файла стилей

//MODULES
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
  enableValidationArgs,
  initialCards
} from '../utils/constants.js';

//DOM-ELEMENTS
//form-popus open/close elements
const editPopupForm = document.forms.edit;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//form-popups submit elements
const editPopupNameInput = editPopupForm.elements.name;
const editPopupAboutInput = editPopupForm.elements.about;

//render cards element
const cardsList = document.querySelector('.cards__list');

//INSTANCES
//UserInfo
const profileUserInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

//PopupWithForm
const editPopup = new PopupWithForm('#edit-popup', {
  handleSubmit: (formData) => {
    profileUserInfo.setUserInfo(formData);
    editPopup.close();
  }
});

const addPopup = new PopupWithForm('#add-popup', {
  handleSubmit: (formData) => {
    const card = new Card(formData, '#card-template', {
      handleCardClick: (name, link) => {
        photoPopup.open(name, link);
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
      handleCardClick: (name, link) => {
        photoPopup.open(name, link);
      } //*параметры name и link описали в классе Card, при вызове функции this._handleCardClick, эти значения и окажутся на месте текущих параметров
    });
    const cardElement = card.createCard();

    section.addItem(cardElement); //*публичный метод класса Section, который добавляет готовую карточку в DOM
  },
},
'.cards__list' //*передали селектор контейнера для карточек в качестве аргумента
);

//FUNCTIONS
//form-popups open/close function
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
  editForm.resetInputErrors(); //*сбросили залипшие ошибки валидации
  editForm.disableSubmitButton(); //*деактивировали кнопку сабмита
  fillUserInfo(); //*при открытии заполнили инпуты в соответствии с ТЗ
});

editPopup.setEventListeners();

//add-popup open/close listeners
profileAddButton.addEventListener('click', () => {
  addPopup.open();
  addForm.resetInputErrors();
  addForm.disableSubmitButton();
});

addPopup.setEventListeners();

//photo-popup close listeners
photoPopup.setEventListeners();




const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'da3ea697-f11c-42f5-89fc-193a981f7278',
    'Content-Type': 'application/json'
  }
});

api.get();
