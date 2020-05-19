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

const editPopupCloseButton = editPopup.querySelector('.popup__close');
const addPopupCloseButton = addPopup.querySelector('.popup__close');

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

const editPopupSubmitButton = editPopup.querySelector('.popup__submit');
const addPopupSubmitButton = addPopup.querySelector('.popup__submit');

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
//form-popups open/close functions
function resetInputErrors(popupType) {
  const inputList = Array.from(popupType.querySelectorAll('.popup__input-text')); //*сделали массив из всех инпутов внутри формы

  inputList.forEach(item => {
    hideInputError(popupType, item);
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

function openPopup(popupType) {
  const inputList = Array.from(popupType.querySelectorAll('.popup__input-text'));
  const submitButtonElement = popupType.querySelector('.popup__submit');

  popupType.classList.add('popup_opened');

  if (popupType === editPopup) {
    editPopupNameInput.value = profileTitle.textContent;
    editPopupAboutInput.value = profileSubtitle.textContent;
  } else if (popupType === addPopup) {
    addPopupNameInput.value = '';
    addPopupLinkInput.value = '';
  }

  if (popupType === editPopup) {
    profile.addEventListener('keydown', escapeEditPopup);
  } else if (popupType === addPopup) {
    profile.addEventListener('keydown', escapeAddPopup);
  }

  toggleButtonState(inputList, submitButtonElement); //*поменяли состояние кнопки сабмит, в зависимости от валидности инпутов
}

function closePopup(popupType) {
  resetInputErrors(popupType);

  popupType.classList.remove('popup_opened');

  if (popupType === editPopup) {
    profile.removeEventListener('keydown', escapeEditPopup);
  } else if (popupType === addPopup) {
    profile.removeEventListener('keydown', escapeAddPopup);
  }
}

//photo-popup open/close functions
function openPhotoPopup(evt) {
  const parentCard = evt.target.closest('.card'); //*карточка-родитель фотографии по которой произошел клик

  if (evt.target.classList.contains('card__photo')) {
    photoPopupPhoto.src = evt.target.src;
    photoPopupPhoto.alt = `${parentCard.querySelector('.card__title').textContent}.`;
    photoPopupTitle.textContent = parentCard.querySelector('.card__title').textContent;

    photoPopup.classList.add('photo-popup_opened');
  }
}

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
      name: addPopupNameInput.value,
      link: addPopupLinkInput.value
    }
  ); //*добавили новый объект с информацией поля ввода в начало массива initialCards

  const newCard = createCard(initialCards[0]); //*создали нового клона, указав в качестве аргумента функции createCard, объект с информацией поля ввода

  cardsList.prepend(newCard); //*добавили нового клона, с данными от пользователя, в начало разметки списка

  addPopupForm.reset(); //*сбросили все поля формы

  closePopup(addPopup);
}

//card like function
function toggleCardLike(evt) {
  if (evt.target.classList.contains('card__like')) {
    evt.target.classList.toggle('card__like_active');
  }
}

//card delete function
function deleteCard(evt) {
  const cardsListItem = evt.target.closest('.card');

  if (evt.target.classList.contains('card__trash')) {
    cardsListItem.remove();
  }
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
});

//photo-popup close listener
photoPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('photo-popup') || evt.target.classList.contains('photo-popup__close')) {
    closePhotoPopup();
  }
});

//form-popups submit listeners
editPopup.addEventListener('submit', submitEditPopup);
addPopup.addEventListener('submit', addNewCard);

//add cards listeners
cardsList.addEventListener('click', toggleCardLike);
cardsList.addEventListener('click', deleteCard);
cardsList.addEventListener('click', openPhotoPopup);
//*прикрепили лисенеры на родительский элемент списка и за счёт делегирования отслеживаем все дочерние по условию в функции-обработчике
