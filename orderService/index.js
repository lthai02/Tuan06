const PORT = process.env.PORT || 3334;
const express = require("express");
const { initSequelize } = require("./models");
const http = require("http");
const app = express();
const server = http.createServer(app);
const orderRoutes = require('./routes/OrderRoute');
const orderItemRoutes = require('./routes/OrderItemRoute');

app.use(express.json());
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);

async function main() {
    try {
    //   await initSequelize.sync({ force: true }); // Nếu cần đồng bộ lại cơ sở dữ liệu
    //   console.log("Database and tables synchronized!");
  
      server.listen(PORT, () => {
        console.log("Server is running on port", PORT);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  main();