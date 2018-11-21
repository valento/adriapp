'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmp_present = exports.template = undefined;

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = exports.template = function template(params) {
  //{ params, body, initialState }
  var env = params.env === 'production' ? '' : 'DEV';
  var ENTRY = params.env === 'production' ? '../dist/bundle.app.js' : 'main.js';
  var CSS = params.env === 'production' ? '../dist/main.css' : 'client/css/main.css';
  var lan = params.ln;
  var agent = params.agent;
  if (agent === null || agent.length == 0) {
    ENTRY = '', CSS = CSS.replace('main', 'station');
  }
  return '<!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <title>... from Adri with Love</title>\n      <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400i|Alex+Brush|Roboto:300,400,500|Dancing+Script|Poiret+One|Merriweather|Tangerine" rel="stylesheet">\n      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">\n      <link rel="stylesheet" href=' + CSS + '>\n      <script>\n        window.PRELOADED_INIT_STATE = \'' + lan + '\'\n      </script>\n    </head>\n\n  <!-- ==================================================================== -->\n\n    <body>\n\n      <div id="app" class="shadow">\n        <h1>' + env + '</h1>\n      </div>\n\n      <script type="module" src=' + ENTRY + '></script>\n\n    </body>\n\n  </html>\n';
};

// -- CATALISTA PRESENTATION Template Creator

var tmp_present = exports.tmp_present = function tmp_present(params) {
  //{ params, body, initialState }
  var env = params.env === 'production' ? 'PRO' : 'DEV';
  var ENTRY = params.env === 'production' ? '../dist/bundle.present.js' : 'present.js';
  var CSS = '/dist/mob_present.css';
  var lan = params.ln;
  var agent = params.agent;
  if (agent === null || agent.length == 0) {
    CSS = CSS.replace('mob', 'station');
  }
  return '<!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <title>... from Adri with Love</title>\n      <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400i|Alex+Brush|Roboto:300,400,500|Dancing+Script|Poiret+One|Merriweather|Tangerine" rel="stylesheet">\n      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">\n      <link rel="stylesheet" href=' + CSS + '>\n      <script>\n        window.PRELOADED_INIT_STATE = \'' + lan + '\'\n      </script>\n    </head>\n\n  <!-- ==================================================================== -->\n\n    <body>\n\n      <div id="app" class="shadow">\n        <h1>' + env + '</h1>\n      </div>\n\n      <script type="module" src=' + ENTRY + '></script>\n\n    </body>\n\n  </html>\n';
};

// END == END == END == END == END == END == END == END == END == END ==

/*
  `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>...from Adri with Love...</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Patua+One|Playfair+Display|Oswald:400,700|Roboto|Cinzel|" />
      <link rel="stylesheet" crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M">
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
      <link rel="stylesheet" href="client/public/css/main.css" />
    </head>
    <body>

      <div id="app" class="shadow">
        <h1>${body}</h1>
      </div>

<!-- PROD/DEV: '../dist/index.html' vs '../client/index.html' -->
      <script>
        window.PRELOADED_INIT_STATE = ${serialize(initialState)}
      </script>

      <script type='module' src=${params.entry}></script>
    </body>
  </html>
  `
*/
//# sourceMappingURL=template.js.map