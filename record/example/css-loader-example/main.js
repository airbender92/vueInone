var SystemJS = require('systemjs');

SystemJS.config({
  map: {
    "traceur": './../../node_modules/traceur/bin/traceur.js',
    "moment": "./../../node_modules/moment/src"
  },
  packages: {
    'moment': {
      main: "moment.js"
    }
  }
});

SystemJS.import('./test.js')
.then(function (test) {
  var t = test.test();
  console.log(t);
})
.catch(function (e) {
    console.error(e)
  })