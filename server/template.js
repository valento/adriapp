import serialize from 'serialize-javascript'

export default ({ params, body, initialState }) => {
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
}
