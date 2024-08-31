require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({"response": "Hello World"});
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log(`App listening on port: ${PORT}`);
});

