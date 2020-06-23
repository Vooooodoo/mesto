const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
//*подключили плагины в файл

module.exports = {
  plugins: [
    autoprefixer, //*подключили autoprefixer
    cssnano({ preset: 'default' })
    //*cssnano при подключении передали объект опций
    //*{ preset: default } говорит о том, что нужно использовать стандартные настройки минификации
  ] //*подключили плагины к PostCSS
};
