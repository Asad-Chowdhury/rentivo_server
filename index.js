const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const bookingsCollection = db.collection("bookings");

    //Add Car API

    const carsCollection = db.collection("cars");

    app.post("/add-new-car", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await carsCollection.insertOne(data);

      res.json(result);
    });

    //My Car Listing API
    app.get("/car-listing/:userId", async (req, res) => {
      const { userId } = req.params;
      console.log("userId:", userId);

      const result = await carsCollection.find({ userId: userId }).toArray();

      res.send(result);
    });

    //Delete Car listing API
    app.delete("/car-listing/:id", async (req, res) => {
      const id = req.params.id;
      const _id = new ObjectId(id);

      const result = await carsCollection.deleteOne({ _id });

      res.json(result);
    });

    //Edit Car listing API

    app.patch("/car-listing/:id", async (req, res) => {
      const id = req.params.id;
      console.log("PATCH id:", id);
      console.log("is valid ObjectId:", ObjectId.isValid(id));
      console.log("body:", req.body);

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car id", id });
      }

      const _id = new ObjectId(id);

      const foundCar = await carsCollection.findOne({ _id });
      console.log("foundCar:", foundCar);

      const result = await carsCollection.updateOne(
        { _id },
        { $set: req.body },
      );

      res.json(result);
    });

    //All Car Listing API
    app.get("/car-listing", async (req, res) => {
      const { userId } = req.params;
      console.log("userId:", userId);

      const result = await carsCollection.find().toArray();

      res.send(result);
    });
    //Individual car details API
    app.get("/car-listing/details/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car id", id });
      }

      const _id = new ObjectId(id);
      console.log("Id:", _id);

      const result = await carsCollection.findOne({ _id });

      if (!result) {
        return res.status(404).json({ message: "Car not found", id });
      }

      res.send(result);
    });
    //Booking API - Collecting booking data
    app.post("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const booking = { ...req.body, userId };

      const result = await bookingsCollection.insertOne(booking);

      res.json(result);
    });
    //Booking API - extracting data for My booking page
    app.get("/booking/:userId", async (req, res) => {
      const { userId } = req.params;

      const result = await bookingsCollection.find({ userId }).toArray();

      res.send(result);
    });

    //Booking API - Cancel Booking
    app.delete("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const { _id } = req.body;

      const result = await bookingsCollection.deleteOne({
        _id: new ObjectId(_id),
        userId,
      });

      res.json(result);
    });

    //Booking API - Update Status
    app.patch("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const { _id } = req.body;

      const result = await bookingsCollection.deleteOne({
        _id: new ObjectId(_id),
        userId,
      });

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
