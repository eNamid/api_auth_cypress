const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

const app = express();

app.use([  
    json({ limit: '50mb'}), 
    urlencoded({ extended: true }),
    cors()
]);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, origin, content-type, Authorization, x-preferences-currency, x-preferences-reference, accept');
    next();
});

app.post('/register', require('./routes/SignUp'));
app.get('/login', require('./routes/SignIn'));
app.listen(process.env.PORT, async () => {
    console.log('Server is running on port:', process.env.PORT);
})