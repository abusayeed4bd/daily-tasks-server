const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

// middleware
var cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());


// mongodb code

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.2kuxk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('todo').collection('totoList')

        app.post('/todo', async (req, res) => {
            const todo = req.body;
            const result = await todoCollection.insertOne(todo)
            res.send(result)
        })

        app.get('/todo', async (req, res) => {
            const q = {};
            const todo = await todoCollection.find(q).toArray();
            res.send(todo)
        })
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Hello from port ${port}`)
})