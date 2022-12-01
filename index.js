import fsp from 'fs/promises'
import fs from 'fs'
import express from 'express';
import createAppendFile from './functions.js';
const app = express();
app.use(express.json());

app.post('/set', async (request, response) => {
    const body = request.body
    const bodyv2 = JSON.stringify(body)
    createAppendFile(`data.json`, `${bodyv2}`)
    const result = { body };
    response.status(200);
    response.json(result);
});


app.get('/get', async (request, response) => {
    const theContent = await fsp.readFile('data.json', 'utf-8')
    console.log(theContent);
    response.status(200);
    response.json(theContent);
});


app.delete('/remove', async (request, response) => {
    await fsp.unlink('data.json')
    response.status(200);
    response.json(true);
});

app.all('/*', async (request, response) => {
    response.status(404);
    response.json({ error: 'I can only give you authors, this route does not exist' });
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});