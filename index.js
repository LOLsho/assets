const express = require('express');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const path = require('path');

// ----- Routes -----
const indexRoute = require('./routes/index');
const assetsRoute = require('./routes/assets');


const app = express();

app.set('views', path.join(__dirname, './public/pug'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use('/', indexRoute);
app.use('/api/assets', assetsRoute);


app.use((req, res) => {
    res.status(404).send('Page Not Found');
});


app.listen(config.PORT, () => {
    console.log(`Server is running on PORT - ${config.PORT}`);
});

