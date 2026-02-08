require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors");

const app = express();

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("HI"))

app.use("/api/products", require("./routes/products"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);
