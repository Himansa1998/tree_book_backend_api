const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sshimansa:fNGKbw46iXjyS1iA@cluster0.om8c6et.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Routes
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Nalanda Forest API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
