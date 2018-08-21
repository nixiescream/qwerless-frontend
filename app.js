// https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352

const express = require('express');
const path = require('path');

const pkg = require('./package.json');
const app = express();

const forceSSL = () => {
  return (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      const path = 'https://' + req.get('Host') + req.url;
      return res.redirect(path);
    }
    next();
  };
};

app.use(forceSSL());

app.use(express.static(path.join(__dirname, '/dist/project-frontend')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, '/dist/project-frontend/index.html')));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(pkg.name + ' ' + pkg.version + ' listening on ' + port));
