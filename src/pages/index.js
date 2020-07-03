//FILES FOR WEBPACK
import './index.css'; //*добавили импорт главного файла стилей

//MODULES
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import { enableValidationArgs } from '../utils/constants.js';

//DOM-ELEMENTS
//form-popus open/close elements
const editPopupForm = document.forms.edit;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarContainer = document.querySelector('.profile__container');

//form-popups submit elements
const editPopupNameInput = editPopupForm.elements.name;
const editPopupAboutInput = editPopupForm.elements.about;

const profileAvatar = document.querySelector('.profile__avatar');

//render cards element
const cardsList = document.querySelector('.cards__list');

//INSTANCES
//UserInfo instance
const profileUserInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

//Popup instance
const cardDeletePopup = new PopupWithConfirm('#card-delete-popup', {
  handleSubmit: ({ cardId, cardElement }) => {
    cardDeletePopup.close();
    api.delete(`/cards/${cardId}`);
    cardElement.remove();
  } //*cardId и cardElement передали из хэндлера handleCardTrashClick класса Card
});

//PopupWithForm instances
const editPopup = new PopupWithForm('#edit-popup', {
  handleSubmit: (formData) => { //*formData - объект с данными формы, которые получены с помощью приватного метода _getInputValues класса PopupWithForm
    dataLoadingFunc(editPopup); //*сообщили пользователю, что идёт загрузка данных с сервера, поменяв текст кнопки сабмита

    api.patch('/users/me', {
      name: formData.name,
      about: formData.about
    }) //*обновили на сервере информацию о пользователе, полученную из формы
      .then((result) => { //*eсли запрос выполнен успешно, сработает обработчик then с описанием последующих действий
        profileUserInfo.setUserInfo(result); //*result - это объект на сервере с информацией о пользователе
      }) //*получили обратно информацию с сервера и добавили её на страницу

      .finally(() => {
        dataLoaded(editPopup); //*после успешной загрузки данных с сервера, вернули текст кнопки сабмита к исходному значению
      });
  }
});

const addPopup = new PopupWithForm('#add-popup', {
  handleSubmit: (formData) => {
    dataLoadingFunc(addPopup);

    api.post('/cards', {
      name: formData.name,
      link: formData.link
    })
      .then((result) => {
        const card = new Card(result, '#card-template', {
          handleCardPhotoClick: (name, link) => {
            photoPopup.open(name, link);
          },

          handleCardTrashClick: (options) => {
            cardDeletePopup.open(options);
          },

          handleCardLikeClick: () => {
            if (cardLike.classList.contains('card__like_active')) {
              api.delete(`/cards/likes/${result._id}`)
                .then((result) => {
                  cardLikeQuantity.textContent = result.likes.length;
                });
            } else {
              api.put(`/cards/likes/${result._id}`)
                .then((result) => {
                  cardLikeQuantity.textContent = result.likes.length;
                });
            }
          }
        }); //*cоздали новый объект-экземпляр класса Card с данными из соответствующего объекта на сервере

        const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

        const cardTrash = cardElement.querySelector('.card__trash');
        const cardLike = cardElement.querySelector('.card__like');
        const cardLikeQuantity = cardElement.querySelector('.card__like-quantity');

        cardTrash.classList.add('card__trash_show'); //*сделали так, чтобы иконка удаления была только на созданных нами карточках
        prependNewCard(cardElement, cardsList); //*добавили новую карточку, в начало разметки списка
      })

      .finally(() => {
        dataLoaded(addPopup);
      });
  }
});

const avatarPopup = new PopupWithForm('#avatar-popup', {
  handleSubmit: (formData) => {
    dataLoadingFunc(avatarPopup);

    api.patch('/users/me/avatar', {
      avatar: formData.link
    })
      .then((result) => {
        profileAvatar.src = result.avatar;
      })

      .finally(() => {
        dataLoaded(avatarPopup);
      });
  }
});

//PopupWithImage instance
const photoPopup = new PopupWithImage('#photo-popup');

//FormValidator instances
const editForm = new FormValidator(enableValidationArgs, '#edit-popup');
const addForm = new FormValidator(enableValidationArgs, '#add-popup');
const avatarForm = new FormValidator(enableValidationArgs, '#avatar-popup');

//Api instance
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'da3ea697-f11c-42f5-89fc-193a981f7278',
    'Content-Type': 'application/json'
  }
});

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

//data loading submit button state functions
function dataLoadingFunc(popupInstance) {
  popupInstance.dataLoading(true);
}

function dataLoaded(popupInstance) {
  popupInstance.dataLoading(false);
  popupInstance.close();
}

//popup open function
function openPopup(popupInstance, formInstance) {
  popupInstance.open();
  formInstance.resetInputErrors(); //*сбросили залипшие ошибки валидации
  formInstance.disableSubmitButton(); //*деактивировали кнопку сабмита
}

//METHODS
//form-popups validation method
editForm.enableValidation();
addForm.enableValidation();
avatarForm.enableValidation();

//api methods
api.get('/users/me')
  .then((result) => { //*eсли запрос выполнен успешно, сработает обработчик then с описанием последующих действий
    profileUserInfo.setUserInfo(result); //*result - это объект на сервере с информацией о пользователе
    profileAvatar.src = result.avatar;
  }); //*получили с сервера информацию и добавили её на страницу

api.get('/cards')
  .then((result) => {
    const section = new Section({
        data: result, //*result - это массив, полученный с сервера, в котором хранятся объекты с данными карточек
        renderer: (cardData) => { //*объект, который мы передали при вызове функции this._renderer в классе Section, оказался на месте параметра cardData
          const card = new Card(cardData, '#card-template', {
            handleCardPhotoClick: (name, link) => {
              photoPopup.open(name, link);
            }, //*параметры name и link описали в классе Card, при вызове функции this._handleCardClick, эти значения и окажутся на месте текущих параметров

            handleCardTrashClick: (options) => {
              cardDeletePopup.open(options);
            },

            handleCardLikeClick: () => {
              if (cardLike.classList.contains('card__like_active')) { //*если сердечко активировано, то удалить лайк с сервера, в ином случае добавить
                api.delete(`/cards/likes/${cardData._id}`)
                  .then((result) => {
                    cardLikeQuantity.textContent = result.likes.length; //*поменяли количество лайков в разметке на данные с сервера
                  });
              } else {
                api.put(`/cards/likes/${cardData._id}`)
                  .then((result) => {
                    cardLikeQuantity.textContent = result.likes.length;
                  });
              }
            }
          });

          const cardElement = card.createCard();
          const cardTrash = cardElement.querySelector('.card__trash');
          const cardLike = cardElement.querySelector('.card__like');
          const cardLikeQuantity = cardElement.querySelector('.card__like-quantity');

          api.get('/users/me')
            .then((result) => {
              if (cardData.owner._id === result._id) { //*наш уникальный идентификатор
                cardTrash.classList.add('card__trash_show');
              } //*при рэндере карточек с сервера, сделали так, чтобы иконка удаления была только на созданных нами карточках, так как удалять чужие карточки нельзя

              cardData.likes.forEach(item => {
                if (item._id === result._id) {
                  cardLike.classList.add('card__like_active');
                }
              }); //*прошлись по массиву пользователей, которые поставили лайки и активировали сердечко, если в массиве есть наш лайк
            });

          section.addItem(cardElement); //*публичный метод класса Section, который добавляет готовую карточку в DOM
        },
      },
      '.cards__list' //*передали селектор контейнера для карточек в качестве аргумента
    );

    section.renderItems(); //*используя новый экземпляр класса Section, создали и добавили в DOM карточки всех мест
  });

//LISTENERS
//edit-popup open/close listeners
profileEditButton.addEventListener('click', () => {
  openPopup(editPopup, editForm)
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

//avatar-popup open/close listeners
profileAvatarContainer.addEventListener('click', () => {
  avatarPopup.open();
  avatarForm.resetInputErrors();
  avatarForm.disableSubmitButton();
});

avatarPopup.setEventListeners();

//photo-popup close listeners
photoPopup.setEventListeners();

//card-delete-popup close listeners
cardDeletePopup.setEventListeners();
