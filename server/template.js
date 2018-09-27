import serialize from 'serialize-javascript'

export const template = function(params) {//{ params, body, initialState }
const env = (params.env === 'production')? '' : 'DEV'
const ENTRY = (params.env === 'production')? '../dist/bundle.app.js' : 'main.js'
const CSS = (params.env === 'production')? '../dist/main.css' : 'client/css/main.css'
console.log(ENTRY)
const lan = params.ln
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
return (`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>... from Adri with Love</title>
      <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400i|Alex+Brush|Roboto:300,400,500|Dancing+Script|Poiret+One|Merriweather|Tangerine" rel="stylesheet">
      <link rel="stylesheet" crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M">
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">
      <link rel="stylesheet" href=${CSS}>
      <script>
        window.PRELOADED_INIT_STATE = '${lan}'
      </script>
    </head>

  <!-- ==================================================================== -->

    <body>

      <div id="app" class="shadow">
        <h1>${env}</h1>
      </div>

      <script type="module" src=${ENTRY}></script>

    </body>

  </html>
`)
}
