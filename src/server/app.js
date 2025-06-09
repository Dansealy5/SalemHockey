const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));

app.use('/api', require('./api'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;