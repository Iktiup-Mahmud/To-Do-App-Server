const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.post('/add-tasks', async (req, res) => {
            const data = req.body
            const result = await tasksCollections.insertOne(data)
            res.send(result)
        })

        app.get('/my-tasks', async(req, res) => {
            const email = req.query.email
            const query = { email: email, isCompleted: 'false' }
            const options = { isCompleted : 'false'}
            const result = await tasksCollections.find(query).toArray()
            // console.log(result)
            res.send(result)
        })

        app.get('/my-tasks-completed', async(req, res) => {
            const email = req.query.email
            const query = { email: email, isCompleted: 'true' }
            const options = { isCompleted : 'true'}
            const result = await tasksCollections.find(query).toArray()
            // console.log(result)
            res.send(result)
        })

        app.put('/complete-task/:id', async(req, res)=> {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true }
            const updatedDoc = {
                $set: {
                    isCompleted: 'true'
                }
            }
            console.log(id)
            const result = await tasksCollections.updateOne(filter, updatedDoc, option)
            // console.log(result)
            res.send(result)
        })

        app.put('/incomplete-task/:id', async(req, res)=> {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true }
            const updatedDoc = {
                $set: {
                    isCompleted: 'false'
                }
            }
            console.log(id)
            const result = await tasksCollections.updateOne(filter, updatedDoc, option)
            // console.log(result)
            res.send(result)
        })

        app.delete('/deleteTask/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const result = await tasksCollections.deleteOne(filter)
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
