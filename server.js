/**
 * module dependencies
 */
let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let app = express();
let fs = require('fs');

let config = fs.readFileSync('config/json');

/*--------------------------------------------------------------------------------------------*/

MongoClient.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, (err, db) => {
    if (err) throw `Error connecting to database - ${err}`;

    app.listen(3000, function () {
        console.log('Listening on port 3000');
    });
});