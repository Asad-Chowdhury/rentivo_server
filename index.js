const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //Create database:
    const db = client.db("rentivodb");
    const usersCollection = db.collection("users");

    //register API
    app.post("/destination", async (req, res) => {
      const data = req.body;
      const result = await usersCollection.insertOne(data);

      res.json(result);
    });

    // Send a ping to confirm a successful connection - this part is optional can be remved before deployment
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Application server started");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
