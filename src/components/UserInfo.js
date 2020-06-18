//*класс UserInfo отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent
    }

    return userInfo;
  }

  setUserInfo() {
    const nameInput = document.forms.edit.elements.name;
    const aboutInput = document.forms.edit.elements.about;

    this.getUserInfo().name = nameInput.value;
    this.getUserInfo().about = aboutInput.value;

    console.log(nameInput.value);
  }
}
