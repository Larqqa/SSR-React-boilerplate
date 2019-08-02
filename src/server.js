import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

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
	const html = renderToString(
		<StaticRouter location={req.url}>
			<App/>
		</StaticRouter>
	);

	// Send HTML response
	return res.send(
		`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
			</head>
			<body>
				<div id="root">${html}</div>
				<script src="/app/bundle.js"></script>
			</body>
		</html>
		`
	).end();
});

// Run server
const port = 3000;
app.listen(port, err => {
	if (err) return console.error(err);
	console.log(`Server listening to: ${port} 😎`);
});