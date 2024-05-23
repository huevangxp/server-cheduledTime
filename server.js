const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const connectDB = require('./src/configs/db');
const router = require('./src/routers/routes');

const app = express()

dotenv.config();

connectDB();

  

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({limit: '500000', extended: true, parameterLimit: 500000000}))

app.use('/api/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
