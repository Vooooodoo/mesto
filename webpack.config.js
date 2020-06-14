const path = require('path'); //подключили метод path к конфигу webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); //подключили плагин для работы с HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //подключили плагин для объединения БЭМ css-файлов в один

module.exports = {
  entry: { main: './src/scripts/index.js' }, //указали точку входа - первое место куда заглянет webpack при сборке
  output: {
    path: path.resolve(__dirname, 'dist'), //переписали точку выхода - итоговый файл, куда webpack сложит весь js-код (использовали утилиту path)
    filename: 'main.js'
  },
  module: {
    rules: [ //rules — это массив правил
      {
        test: /\.js$/, //регулярное выражение, которое ищет все js файлы
        loader: 'babel-loader', //при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' //исключает папку node_modules, файлы в ней обрабатывать не нужно
      }, //добавили объект правил для бабеля
      {
        test: /\.(png|svg|jpg|gif|woff|woff2)$/, //регулярное выражение, которое ищет все файлы с такими расширениями
        loader: 'file-loader'
      }, //добавили правило для добавления файлов в сборку
      {
        test: /\.html$/,
        loader: 'html-loader'
      }, //добавили правило, чтобы подставить правильные пути файлов в HTML
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader']
      } //добавили правило для обработки css-файлов
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' //прописали путь к файлу index.html
    }),
    new MiniCssExtractPlugin() //подключили плагин для объединения css-файлов
  ]
};
