export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _fetch(url, options) {
    if (options.body) {
      options.headers = {
        'Content-Type': 'application/json'
      },
      options.body = JSON.stringify(options.body)
    }

    return fetch(this._baseUrl + url, options) //*метод fetch создаёт запрос на сервер и возвращает его ответ, вторым аргументом передали объект опций
      .then((res) => {
        if (res.ok) { //*если запрос прошёл успешно
          return res.json() //*асинхронный метод json читает ответ от сервера в формате json и возвращает промис, из которого можно достать нужные данные
        }

        return Promise.reject(`${res.status}`); //*отклонили промис, чтобы перейти в блок catch, если сервер вернул ошибку
      })

      .then((result) => {
        console.log(result); //*result - это объект с данными
      }) //*eсли запрос выполнен успешно, сработает обработчик then

      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен:', err);
      }); //*если что-то пошло не так, — например, отвалился интернет — сработает catch
  }

  test() {
    this._fetch('/users/me', {
      method: 'GET',
      headers: {
        authorization: 'da3ea697-f11c-42f5-89fc-193a981f7278' //*личный авторизационный токен
      }
    });
  }


  // getInitialCards() {

  // }

  // другие методы работы с API
}
