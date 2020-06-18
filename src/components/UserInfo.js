//*класс UserInfo отвечает за управление отображением информации о пользователе на странице

//CLASS
export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector); //*элемент с именем пользователя
    this._aboutSelector = document.querySelector(aboutSelector); //*элемент с информацией о себе
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent
    }

    return userInfo; //*вернули объект с данными пользователя
  }

  setUserInfo() {
    const nameInput = document.forms.edit.elements.name;
    const aboutInput = document.forms.edit.elements.about;

    this._nameSelector.textContent = nameInput.value;
    this._aboutSelector.textContent = aboutInput.value;
  } //*публичный метод, который принимает из формы новые данные пользователя и добавляет их на страницу
}
