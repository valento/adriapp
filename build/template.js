'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var params = _ref.params,
      body = _ref.body,
      initialState = _ref.initialState;

  '<!doctype html>\n  <html>\n    <head>\n      <meta charset="utf-8" />\n      <meta name="viewport" content="width=device-width,initial-scale=1" />\n      <title>...from Adri with Love...</title>\n      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Patua+One|Playfair+Display|Oswald:400,700|Roboto|Cinzel|" />\n      <link rel="stylesheet" crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M">\n      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />\n      <link rel="stylesheet" href="client/public/css/main.css" />\n    </head>\n    <body>\n\n      <div id="app" class="shadow">\n        <h1>' + body + '</h1>\n      </div>\n\n<!-- PROD/DEV: \'../dist/index.html\' vs \'../client/index.html\' -->\n      <script>\n        window.PRELOADED_INIT_STATE = ' + (0, _serializeJavascript2.default)(initialState) + '\n      </script>\n\n      <script type=\'module\' src=' + params.entry + '></script>\n    </body>\n  </html>\n  ';
};
//# sourceMappingURL=template.js.map