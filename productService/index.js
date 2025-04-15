const PORT = process.env.PORT || 3335;
const express = require("express");
const { initSequelize } = require("./models");
const http = require("http");
const app = express();
const server = http.createServer(app);
const productRoutes = require('./routes/ProductRoute');

app.use(express.json());
app.use('/products', productRoutes);

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