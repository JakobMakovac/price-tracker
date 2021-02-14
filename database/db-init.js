var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/priceTrackerDb';

var collectionNames = ['Users', 'Products'];

console.log('Creating database.')

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('priceTrackerDb');

    for (i = 0; i < collectionNames.length; i++) {
        var col = collectionNames[i];
        dbo.createCollection(col.slice(0), function (err, res) {
            if (err) throw err;
            console.log(`${col} collection created!`);
        });
    }

    db.close();
});