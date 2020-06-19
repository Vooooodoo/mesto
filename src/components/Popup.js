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
    }); //todo придумать как снести этот лисенер при закрытии попапа
  } //todo надо как то создасть именованную функцию-обработчик, чтобы была возможность снять лисенер (через функциональное выражение его снять не получится)

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
  }
}
