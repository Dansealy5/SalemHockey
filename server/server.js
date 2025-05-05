require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const app = require("./app");
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  httpServer.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
  