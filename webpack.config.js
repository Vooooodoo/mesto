const path = require('path'); //подключили метод path к конфигу webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); //подключили плагин для работы с HTML

module.exports = {
  entry: { main: './src/scripts/index.js' }, //указали точку входа - первое место куда заглянет webpack при сборке
  output: {
    path: path.resolve(__dirname, 'dist'), //переписали точку выхода - итоговый файл, куда webpack сложит весь js-код (использовали утилиту path)
    filename: 'main.js'
  },
  module: {
    rules: [ //rules — это массив правил,
      {
        test: /\.js$/, //регулярное выражение, которое ищет все js файлы
        loader: 'babel-loader', //при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' //исключает папку node_modules, файлы в ней обрабатывать не нужно
      }, //добавили объект правил для бабеля

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' //прописали путь к файлу index.html
    })
  ]
};
