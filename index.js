const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

app.use(cors())
app.use(express.json())




const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const tasksCollections = client.db('to-do-app').collection('tasks')

        app.get('/bla', (req, res) => {
            res.send('Amina ovir bouin')
        })

        app.post('/add-tasks',async (req, res) => {
            const data = req.body
            const result = await tasksCollections.insertOne(data)
            res.send(result)
        })
    } 
    finally{
    }
}

run().catch(console.log)

app.get('/', (req, res) => {
    res.send('server is up and runnning')
})

app.listen(port, () => console.log(`server is running on port ${port}`))
