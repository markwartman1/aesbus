const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const publicPath = path.normalize(__dirname + '/public');

const server = app.listen(port, () => {
	console.log('-'.repeat(40));
	console.log(`Server running on http://localhost:${port}.`);
	console.log('-'.repeat(40));

	app.use(express.static(publicPath));
});
