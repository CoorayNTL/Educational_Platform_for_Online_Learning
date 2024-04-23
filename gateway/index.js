const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', proxy('http://localhost:8005'));
//app.use('/course', proxy('http://localhost:8002'));
//app.use('/enrollment', proxy('http://localhost:8002'));

app.listen(8009, () => {
  console.log('Server running on port 8009');
});


