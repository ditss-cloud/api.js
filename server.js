const express = require('express');
const path = require('path');
const uploadRoute = require('./api/upload');

const app = express();
app.use(express.static('public'));
app.use('/api/upload', uploadRoute);
app.use('/img', express.static(path.join(__dirname, 'img')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
