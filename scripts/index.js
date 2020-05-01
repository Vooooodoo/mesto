//todo допилить, чтобы пустые карточки не добавлялись

//VARIABLES
//popups open/close vars
const elementPopup = document.querySelectorAll('.popup');
const elementEditPopup = elementPopup[0];
const elementAddPopup = elementPopup[1];

const editPopupIndex = 0; //*индекс объекта в массиве
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

//add cards vars
const initialCards = [
  {
    name: 'Архыз',
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
  for (let i = 0; i < initialCards.length; i++) {
    cardElementArray.push(cardTemplate.cloneNode(true));
  } //*запушили в массив cardElementArray шесть клонов шаблона

  cardElementArray.forEach(cardElement => {
    cardElement.querySelector('.card__photo').src = initialCards[cardElementArray.indexOf(cardElement)].link;
    cardElement.querySelector('.card__photo').alt = initialCards[cardElementArray.indexOf(cardElement)].name + '.';
    cardElement.querySelector('.card__title').textContent = initialCards[cardElementArray.indexOf(cardElement)].name;
    cardElement.querySelector('.card__like').addEventListener('click', cardLikeToggle);
  }); //*каждому клону вставили соответствующую ссылку на фото, заголовок - альтернативный текст из массива initialCards и лисенер

  cardsList.append(...cardElementArray); //*добавили готовые клоны в HTML разметку
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

  cardElementArray[0].querySelector('.card__photo').src = initialCards[0].link; //*вставили клону ссылку из поля ввода
  cardElementArray[0].querySelector('.card__photo').alt = initialCards[0].name + '.'; //*вставили клону альтернативный текст - заголовок из поля ввода
  cardElementArray[0].querySelector('.card__title').textContent = initialCards[0].name; //*вставили клону заголовок из поля ввода
  cardElementArray[0].querySelector('.card__like').addEventListener('click', cardLikeToggle); //*добавили клону лисенер

  cardsList.prepend(cardElementArray[0]); //*добавили нового клона, с данными от пользователя, в начало списка

  elementAddPopupInputLink.value = '';
  elementAddPopupInputName.value = '';
}

//cards like function
function cardLikeToggle(evt) {
  const eventTarget = evt.target;

  eventTarget.classList.toggle('card__like_active');
}

//LISTENERS
//popups open/close listeners
elementProfileEditButton.addEventListener('click', () => popupOpen(editPopupIndex));
elementEditPopupClose.addEventListener('click', () => popupClose(editPopupIndex));

elementProfileAddButton.addEventListener('click', () => popupOpen(addPopupIndex));
elementAddPopupClose.addEventListener('click', () => popupClose(addPopupIndex));

//popups submit listeners
elementEditPopup.addEventListener('submit', editPopupSubmit);
elementEditPopupSubmit.addEventListener('click', () => popupClose(editPopupIndex));

elementAddPopup.addEventListener('submit', addNewCard);
elementAddPopupSubmit.addEventListener('click', () => popupClose(addPopupIndex));
