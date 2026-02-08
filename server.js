require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


const app = express();

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("HI"))

app.use("/api/products", require("./routes/products"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);
