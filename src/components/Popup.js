//*класс Popup отвечает за открытие и закрытие попапа

//CLASS
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // document.removeEventListener('keydown', escapeAddPopup); //*если именованная функция как в этом примере, то снесет лисенер, придумаеть как это сделать
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      // resetInputErrors(editPopup); //*сбросили залипшие ошибки валидации
      // removeEscapeListener(editPopup);
    }
  }

  setEventListeners() {
    const popupCloseButton = this._popup.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }); //todo изначально в ТЗ надо было этот лисенер добавлять при открытии попапа и сносить при закрытии
    //todo надо как то создасть именованную функцию-обработчик, чтобы была возможность снести лисенер (через функциональное выражение его снести не получится)
  }
}
