const presets = [
  ['@babel/env', { //указали какой пресет использовать
    targets: { //указали какие версии браузеров поддерживать
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    useBuiltIns: "entry"
    //использовать полифиллы для браузеров, указанных в свойстве targets
    //по умолчанию babel использует поллифиллы библиотеки core-js
  }]
];

module.exports = { presets };
