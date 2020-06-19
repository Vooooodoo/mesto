//*класс Section отвечает за отрисовку элементов на странице

//СLASS
export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data; //*массив объектов с данными будущего элемента
    this._renderer = renderer; //*колбэк-функция, обеспечивающая слабое связывание классов, тело функции описывается при создании экземпляра класса
    this._container = document.querySelector(containerSelector); //*контейнер куда будут вставляться готовые элементы
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  } //*метод рэндера элементов

  addItem(element) {
    this._container.append(element);
  } //*метод добавления элементов в DOM
}
