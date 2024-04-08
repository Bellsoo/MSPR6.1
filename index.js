const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://belkiscoskun:Marc1975@cluster0.d91owf6.mongodb.net/";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let database;
let collection;

async function connectToDatabase() {
    await client.connect();
    database = client.db('WildLens');
    collection = database.collection('Animaux_info');
    console.log('Connected to database');
}

app.get('/animals/species/:species', async (req, res) => {
    try {
        const animal = await collection.findOne({ Espèce: req.params.species });
        if (animal) {
            res.status(200).json(animal);
        } else {
            res.status(404).send('Animal not found');
        }
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

connectToDatabase().then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(console.error);