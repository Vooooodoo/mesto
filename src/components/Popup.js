//*класс Popup отвечает за открытие и закрытие попапа

//CLASS
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }); //*todo надо этот лисенер добавлять при открытии попапа и сносить при закрытии
        //todo надо как то создасть именованную функцию-обработчик, чтобы была возможность снести лисенер (через функциональное выражение его снести не получится)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // document.removeEventListener('keydown', escapeAddPopup); //todo если именованная функция как в этом примере, то снесет лисенер, придумаеть как это сделать
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) { //*если клик произошел по оверлею или иконке закрытия - закрыть попап
        this.close();
      }
    }); //*повешали один лисенер на родителя и за счет делегирования отслеживаем событие на дочерних элементах
  }
}
