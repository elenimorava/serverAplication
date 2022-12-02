import express from 'express';
const app = express();
app.use(express.json());
import database from "./functions.js";

app.get('/trips', async (request, response) => {
    const result = await database.raw('select * from trips')
    response.status(200)
    response.json(result)
});


app.post('/trips', async (request, response) => {  //not yet finished
    const trip = request.body
    const insertResult = await database.raw(`insert into trips (date, destination) values ('${trip.date}','${trip.destination}')`)
    const newTrip = await database.raw(`SELECT * FROM trips ORDER BY id DESC LIMIT 1;`)
    response.status(200)
    response.json(newTrip)
});


app.get('/trips/:id', async (request, response) => {
    const id = Number(request.params.id)
    const result = await database.raw(`select * from trips where id = ${id}`)
    response.status(200)
    response.json(result)
});

app.put('/trips/:id/:destination', async (request, response) => {
    const id = Number(request.params.id)
    const newDestination = request.params.destination
    const update = await database.raw(`update trips set destination = '${newDestination}' where id = ${id};`)
    const result = await database.raw('select * from trips')
    response.status(200)
    response.json(result)
});

app.delete('/trips/:id', async (request, response) => {
    const id = Number(request.params.id)
    const result = await database.raw(`delete from trips where id=${id}`)
    response.status(200)
    response.json(true)
});


app.all('/*', async (request, response) => {
    response.status(404);
    response.json({ error: 'This route does not exist' });
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});