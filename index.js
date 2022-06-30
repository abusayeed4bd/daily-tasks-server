const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

// middleware
var cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());


// mongodb code

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { application } = require('express');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.2kuxk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const todoCollecttion = client.db("todo").collection('todoList');
        console.log('db connected');
        app.post('/todos', async (req, res) => {
            const todo = req.body;
            const result = await todoCollecttion.insertOne(todo)
            res.send(result)
        })
        app.get('/todos', async (req, res) => {
            const q = {};
            const todos = await todoCollecttion.find(q).toArray();
            res.send(todos)
        })
        app.delete('/todos/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = { _id: ObjectId(id) }
            const result = await todoCollecttion.deleteOne(cursor);
            res.send(result)
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