const { createBundleRenderer } = require('vue-server-renderer')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8'), // (optional) page template
});
const bundle =  require('./dist/server.bundle.js');

// inside a server handler...
server.get('*', (req, res) => {
  bundle.default({ url: req.url }).then((app) => {
    let context = {
      title: 'Test-title',
    };
    renderer.renderToString(app, context, (err, html) => {
      // handle error...
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  }).catch(err => console.log('jopu sosi', err));
  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
})

server.listen(8080)