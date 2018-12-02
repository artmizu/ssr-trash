const express = require('express');
const path = require('path');
const server = express();
const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer')

let renderer = createBundleRenderer(bundle, {
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8'), // (optional) page template
  clientManifest: clientManifest,
  // runInNewContext: false
});

server.use('/dist', express.static(path.resolve(__dirname, './dist')));

server.get('*', (req, res) => {
  res.setHeader("Content-Type", "text/html");

	const context = {
		url: req.url,
		title: "Headline News"
  };
  
  renderer.renderToString(context, (err, html) => {
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
})

server.listen(8080)