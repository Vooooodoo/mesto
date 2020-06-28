export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, options) {
    if (options.body) {
      options.body = JSON.stringify(options.body)
    }

    options.headers = this._headers;

    return fetch(this._baseUrl + url, options) //*метод fetch создаёт запрос на сервер и возвращает его ответ, вторым аргументом передали объект опций
      .then((res) => {
        if (res.ok) { //*если запрос прошёл успешно
          return res.json() //*асинхронный метод json читает ответ от сервера в формате json и возвращает промис, из которого можно достать нужные данные через обработчик then
        }

        return Promise.reject(`${res.status}`); //*отклонили промис, чтобы перейти в блок catch, если сервер вернул ошибку
      })

      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен:', err);
      }); //*если что-то пошло не так, — например, отвалился интернет — сработает catch
  }

  get(url) {
    return this._fetch(url, {
      method: 'GET',
    });
  }


  getInitialCards() {
    const initialCards = [];

    this._fetch('/cards', {
      method: 'GET',
    })
    .then((result) => {
      result.forEach((item) => { //*result - это массив, полученный с сервера, в котором хранятся объекты с данными карточек
        const cards = {
          name: item.name,
          link: item.link
        }

        initialCards.push(cards);
      });
    }) //*eсли запрос выполнен успешно, сработает обработчик then

    return initialCards;
  }

  // другие методы работы с API
}
