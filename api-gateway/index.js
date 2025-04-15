const express = require("express");
const rateLimit = require('./middleware/rateLimit');
const app = express();
const PORT = 8888;

// Import và sử dụng proxy middleware
require("./middleware/proxy")(app);
app.use(rateLimit);

// Kiểm tra API Gateway
app.get("/", (req, res) => {
  res.send("API Gateway đang hoạt động");
});

// Health check endpoint cho việc debug
app.get("/health", (req, res) => {
  res.send("API Gateway is up and running!");
});

// Khởi động server gateway
app.listen(PORT, () => {
  console.log(`API Gateway đang chạy tại cổng ${PORT}`);
});
