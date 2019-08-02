import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import App from './app/App'
import routes from './app/Routes'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./build'))

app.get('*', (req, res) => {
	const branch = matchRoutes(routes, req.url)
	const promises = []

	branch.forEach( ({route, match}) => {
		if (route.loadData)
			promises.push(route.loadData(match))
	})

	Promise.all(promises).then(data => {
		const context = data.reduce( (context, data) => {
			return Object.assign(context, data)
		}, {})

		const html = renderToString(
			<StaticRouter location={req.url} context={context} >
				<App/>
			</StaticRouter>
		)

		if(context.url) {
			res.writeHead(301, {Location: context.url})
			res.end()
		}
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
				<script src="/app/main.js"></script>
			</body>
			</html>
			`
		)
	}).catch(er => console.log(er))
})

// Run server
const port = process.env.PORT || 3000
app.listen(port, err => {
	if (err) return console.error(err)
	console.log(`Server listening at http://localhost:${port}`)
})