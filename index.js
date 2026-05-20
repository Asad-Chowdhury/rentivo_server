const express = require("express");
const app = express();
const port = process.env.PORT || 5001;


//MONGO DB Setup


//MONGO Setup Completed


app.get("/", (req, res) => {
  res.send("Application server started");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
