const express = require("express");
const app = express();
const cors = require("cors");

// environment configuration
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// routes
const referRoutes = require("./routes/refer");

// middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1", referRoutes);

// default route
app.get("/", (req, res) => {
  res.send("<h2>Accredian</h2>");
});

// server activation
app.listen(PORT, () => {
  console.log(`Server Initiated at port ${PORT}`);
});
