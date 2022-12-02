import fsp from 'fs/promises'
import express from 'express';
const app = express();
app.use(express.json());

app.post('/trip', async (request, response) => {
    const trip = request.body
    const database = await fsp.readFile("database.json", "utf-8")
    const databaseParsed = JSON.parse(database)
    const id = databaseParsed.length + 1
    trip.id = id
    databaseParsed.push(trip)
    await fsp.writeFile("database.json", JSON.stringify(databaseParsed, null, 4))
    response.status(200)
    response.json(trip)
});

app.get('/trip/:id', async (request, response) => {
    const id = Number(request.params.id)
    const database = await fsp.readFile("database.json", "utf-8")
    const databaseParsed = JSON.parse(database)
    const trip = databaseParsed.find((trip) => {
        return trip.id === id
    })
    if (trip) {
        response.status(200)
        response.json(trip)
    } else {
        response.status(404)
        response.json(`Trip with the selected id: ${id} , does not exist`)
    }

});

app.get('/trip', async (request, response) => {
    const database = await fsp.readFile("database.json", "utf-8")
    const databaseParsed = JSON.parse(database)
    response.status(200)
    response.json(databaseParsed)
});

app.put('/trip/:id/:destination', async (request, response) => {
    const id = Number(request.params.id)
    const newDestination = request.params.destination
    const database = await fsp.readFile("database.json", "utf-8")
    const databaseParsed = JSON.parse(database)
    const trip = databaseParsed.find((trip) => {
        return trip.id === id
    })
    trip.destination = newDestination
    console.log(trip);
    const index = databaseParsed.indexOf(trip);
    if (index > -1) {
        databaseParsed.splice(index, 1);
    }
    databaseParsed.push(trip)
    await fsp.writeFile("database.json", JSON.stringify(databaseParsed, null, 4))
    response.status(200)
    response.json(trip)
});

app.delete('/trip/:id', async (request, response) => {
    const id = Number(request.params.id)
    const database = await fsp.readFile("database.json", "utf-8")
    const databaseParsed = JSON.parse(database)
    const trip = databaseParsed.find((trip) => {
        return trip.id === id
    })
    const index = databaseParsed.indexOf(trip);
    if (index > -1) {
        databaseParsed.splice(index, 1);
    }
    await fsp.writeFile("database.json", JSON.stringify(databaseParsed, null, 4))
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