import express from 'express';

import './db/Mongo';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(port, () => console.log(`Server up on port: ${port}`));
