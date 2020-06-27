export class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me', {
      headers: {
        authorization: 'da3ea697-f11c-42f5-89fc-193a981f7278'
      }
    })

      .then(res => res.json())

      .then((result) => {
        console.log(result);
      });
  }

  // другие методы работы с API
}
