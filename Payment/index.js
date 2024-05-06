const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {

    return res.status(200).json({"msg": "Hello from Payment Service"})
})

const port = process.env.PORT || 8004;

app.listen(port, () => {
    console.log('Payment is Listening to Port '+port);
})