'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/static', express.static(__dirname + '/images'));

app.post('/upload',  async (req, res, next) => {
  try {
      const path = './images/'++ new Date() ++'.png'
      const imgdata = req.body.base64image;
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
      return res.send("Картинка збережена");
  } catch (e) {
      next(e);
  }
});

app.get('/images/:file', (req, res, next) => {
  var file = req.params.file;

  res.sendFile('/images/' + file)
});

module.exports = app;
module.exports.handler = serverless(app);
