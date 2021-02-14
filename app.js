var express = require('express');
var routes = require('./routes');
var cors = require('cors');
var db = require('./database');

const app = express();

var url = 'mongodb://localhost:27017/priceTrackerDb';
db.mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection to mongo DB established');
    })
    .catch((err) => {
        console.log(err);
    });

app.options('*', cors());
app.use(cors());

app.use('/', routes);

app.listen(process.env.PORT || 4242);