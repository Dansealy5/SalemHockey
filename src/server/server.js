require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

const distPath = path.resolve(__dirname, "../client/dist"); 

app.use(express.static(distPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
  