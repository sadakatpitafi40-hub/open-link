// server.js
import express from "express";
import mongoose from "mongoose";
import shortid from "shortid";

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://localhost:27017/urlshortener");

// Schema
const urlSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  originalUrl: String,
  createdAt: { type: Date, default: Date.now }
});
const Url = mongoose.model("Url", urlSchema);

// Create short URL
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = shortid.generate();

  const newUrl = new Url({ shortId, originalUrl });
  await newUrl.save();

  res.json({ shortUrl: `http://localhost:5000/${shortId}` });
});

// Redirect
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
