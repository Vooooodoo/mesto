//VARIABLES
//photo-popup open vars
export const photoPopup = document.querySelector('.photo-popup');
const photoPopupPhoto = document.querySelector('.photo-popup__photo');
const photoPopupTitle = document.querySelector('.photo-popup__title');

//CLASS
export class Card {
  constructor(data, cardSelector) { //*передали данные в виде объекта и селектор шаблона(на случай, если надо будест создать карточку по другому шаблону)
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; //*записали селектор в приватное поле
  }

  _getTemplateClone() {
    const cardTemplate = document.querySelector(this._cardSelector).content; //*нашли шаблон карточки
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //*создали пустого клона элемента card внутри шаблона карточки

    this._element = cardElement; //*записали пустого клона в приватное поле _element, так у других элементов появится к нему доступ
  }

  _toggleCardLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPhotoPopup() {
    photoPopupPhoto.src = this._element.querySelector('.card__photo').src;
    photoPopupPhoto.alt = `${this._element.querySelector('.card__title').textContent}.`;
    photoPopupTitle.textContent = this._element.querySelector('.card__title').textContent;

    photoPopup.classList.add('photo-popup_opened');
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._toggleCardLike();
    });

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._openPhotoPopup();
    });
  }

  createCard() {
    this._getTemplateClone(); //*создали пустого клона
    this._setEventListeners(); //*добавили лисенеры на элементы клона

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__photo').alt = `${this._name}.`;
    this._element.querySelector('.card__title').textContent = this._name;
    //*вставили клону ссылку на фото и заголовок-альтернативный текст


    return this._element; //*вернули готовую карточку
  } //*публичный метод создания карточки, который можно вызвать во внешнем коде
}
