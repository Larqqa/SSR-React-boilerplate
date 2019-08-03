import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import htmlFile from './views/index.html';
import App from './app/App';
const getR = require('./controllers/get');


// Create app and set serve folder
const app = express();
app.use(cors());
app.use(express.static('build'));

app.use(bodyParser.json());
app.use('/api/get', getR);

app.get('*', (req, res) => {

  // Create the app with routes
  const app = renderToString(
    <StaticRouter location={req.url}>
      <App/>
    </StaticRouter>
  );

  // Set app and script to index.html 
  let html = htmlFile
    .replace('<!-- root -->', app)
    .replace('<!-- script -->', 'app/bundle.js');

  // Send HTML response
  return res.send(html).end();
});

// Run server
const port = 3000;
app.listen(port, err => {
  if (err) return console.error(err);
  console.log(`Server listening to: ${port} 😎`);
});