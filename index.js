const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const { query } = require('express');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ebaxxgs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {


        const projectCollection = client.db("job").collection("projectsCategories");
        const detailsCollection = client.db("job").collection("details");





        app.get('/categories', async (req, res) => {


            const query = {}
            const cursor = projectCollection.find(query)
            const data = await cursor.limit(3).toArray();
            res.send(data)




        })









        app.get('/details', async (req, res) => {


            let query = {}

            if (req.query.category) {

                query = {


                    category: req.query.cid



                }
            }




            const cursor = detailsCollection.find(query)    
            const review = await cursor.sort({ date: -1 }).toArray();
            res.send(review)




        })





    }

    finally {





    }



}
run().catch(err => {

    console.log(err)


})


app.get('/', (req, res) => {

    res.send('server is running')


})

app.listen(port, () => {

    console.log(`port is running on${port}`)


})