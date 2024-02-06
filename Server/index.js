const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const morgan = require('morgan');

dotenv.config()

const app = express();


app.use(express.json())
app.use(morgan('dev'))
app.use("/", require("./routes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {
    console.log(`Server running: localhost:${PORT}`. green);
})