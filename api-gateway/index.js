const express = require("express");

const app = express();
const PORT = process.env.PORT || 8888;


app.get("/", (req, res) => {
  res.send("API Gateway đang hoạt động");
});

// Health check endpoint for debugging
app.get("/health", (req, res) => {
  res.send("API Gateway is up and running!");
});

app.listen(PORT, () => {
  console.log(`API Gateway đang chạy tại cổng ${PORT}`);
});