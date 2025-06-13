const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require('./function.js');

const app = express();
const PORT = process.env.PORT || 8000;

app.enable('trust proxy');
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// === Load settings.json ===
const settingsPath = path.join(__dirname, './settings.json');
let settings = {};
try {
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
} catch (err) {
  console.error(chalk.red(`Error loading settings.json: ${err.message}`));
  process.exit(1);
}
global.apikey = settings.apiSettings.apikey || null;
global.totalreq = 0;
global.totalError404 = 0;
global.totalError500 = 0;
// === Middleware log + JSON formatter ===
app.use((req, res, next) => {
  console.log(chalk.bgHex('#FFFF99').hex('#333').bold(` Request: ${req.method} ${req.path} `));
  global.totalreq++;

  const originalJson = res.json;
  res.json = function (data) {
    if (data && typeof data === 'object') {
      return originalJson.call(this, {
        status: data.status,
        creator: settings.apiSettings.creator || 'Created Using Skyzo',
        ...data,
      });
    }
    return originalJson.call(this, data);
  };

  next();
});

// === Serve static directories ===
app.use('/', express.static(__dirname));
app.use('/', express.static(path.join(__dirname, 'api-page')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// === Auto serve folders with index.html ===
const foldersToServe = fs.readdirSync(__dirname).filter(f => {
  const full = path.join(__dirname, f);
  return fs.statSync(full).isDirectory()
    && !['node_modules', 'api-page', 'src'].includes(f)
    && fs.existsSync(path.join(full, 'index.html'));
});
foldersToServe.forEach(folder => {
  app.use(`/${folder}`, express.static(path.join(__dirname, folder), { index: 'index.html' }));
  console.log(chalk.green(`Mounted: /${folder}`));
});

// === Clean URL handler: /folder/page → api-page/folder/page.html ===
app.get('/:folder/:page', (req, res, next) => {
  const filePath = path.join(__dirname, 'api-page', req.params.folder, `${req.params.page}.html`);
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  next();
});

// === Clean URL handler: /page → api-page/page.html ===
app.get('/:page', (req, res, next) => {
  const filePath = path.join(__dirname, 'api-page', `${req.params.page}.html`);
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  next();
});

// === Catch-all: /a/b/c → api-page/a/b/c.html ===
app.get('*', (req, res, next) => {
  const tryPath = path.join(__dirname, 'api-page', req.path + '.html');
  if (fs.existsSync(tryPath)) return res.sendFile(tryPath);
  next();
});

// === Homepage ===
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'api-page', 'index.html'));
});

// === Load dynamic API routes ===
let totalRoutes = 0;
const apiFolder = path.join(__dirname, 'src');
fs.readdirSync(apiFolder).forEach(sub => {
  const subPath = path.join(apiFolder, sub);
  if (fs.statSync(subPath).isDirectory()) {
    fs.readdirSync(subPath).forEach(file => {
      if (file.endsWith('.js')) {
        require(path.join(subPath, file))(app);
        totalRoutes++;
        console.log(chalk.cyan(`Loaded API: ${sub}/${file}`));
      }
    });
  }
});

// === Error handlers ===
app.use((req, res) => {
  global.totalError404++;
  res.status(404).sendFile(path.join(__dirname, 'api-page', '404.html'));
});
/*app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'api-page', '404.html'));
});
*/
app.use((err, req, res, next) => {
  global.totalError500++;
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'api-page', '500.html'));
});
/*
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'api-page', '500.html'));
});*/

// === Start server ===
app.listen(PORT, () => {
  console.log(chalk.bgHex('#90EE90').hex('#333').bold(` Server running on port ${PORT} `));
  console.log(chalk.bgHex('#90EE90').hex('#333').bold(` Total API Routes: ${totalRoutes} `));
});

module.exports = app;
