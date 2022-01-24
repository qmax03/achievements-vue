const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const usersRouter = require('./routes/users.js')
const swaggerOptions = {
    swaggerOptions: {
        validatorUrl: null
    }
};
const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', usersRouter);

app.listen(3000, () => console.log('server started'));
