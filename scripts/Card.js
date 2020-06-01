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
class Card {
  constructor(data, cardSelector) { //*передали данные в виде объекта и селектор шаблона(на случай, если надо будест создать карточку по другому шаблону)
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; //*записали селектор в приватное поле
  }

  _getTemplateClone() {
    const cardTemplate = document.querySelector(this._cardSelector).content; //*нашли шаблон карточки
    const cardElement = cardTemplate.cloneNode(true); //*создали пустого клона шаблона

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplateClone(); //*записали пустого клона в приватное поле _element, так у других элементов появится к нему доступ

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__photo').alt = `${this._name}.`;
    this._element.querySelector('.card__title').textContent = this._name;
    //*вставили клону ссылку на фото и заголовок-альтернативный текст

    return this._element; //*вернули готовую карточку
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template'); //*cоздали новый экземпляр класса Card с данными из объекта в массиве initialCards
  const cardElement = card.createCard(); //*cоздали готовую карточку и возвратили наружу

  cardsList.append(cardElement); //*добавили готовую карточку в DOM
});
