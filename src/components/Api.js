//*класс Api необходим для работы с API и запросов к серверу

//CLASS
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, options) {
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    options.headers = this._headers;

    return fetch(this._baseUrl + url, options) //*метод fetch создаёт запрос на сервер и возвращает его ответ, вторым аргументом передали объект опций
      .then((res) => {
        if (res.ok) { //*если запрос прошёл успешно
          return res.json() //*асинхронный метод json читает ответ от сервера в формате json и возвращает промис, из которого можно достать нужные данные через обработчик then
        }

        return Promise.reject(`${res.status}`); //*если сервер вернул ошибку, отклонили промис, чтобы перейти в блок catch
      })

      .catch((err) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', err);
      }); //*если что-то пошло не так, — например, отвалился интернет — сработает catch
  }

  get(url) {
    return this._fetch(url, {
      method: 'GET',
    });
  } //*метод для получения данных с сервера

  patch(url, body) {
    return this._fetch(url, {
      method: 'PATCH',
      body
    });
  } //*метод для обновления сущностей, уже существующих на сервере, например информации о пользователе

  post(url, body) {
    return this._fetch(url, {
      method: 'POST',
      body
    });
  } //*метод для для отправки данных на сервер

  delete(url) {
    return this._fetch(url, {
      method: 'DELETE',
    });
  } //*метод для для отправки данных на сервер
}
