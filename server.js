/**
 * module dependencies
 */
let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let app = express();
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json','utf8'));
let dbAccess = require('./dbAccess.js');

/*--------------------------------------------------------------------------------------------*/

MongoClient.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, (err, db) => {
    if (err) throw `Error connecting to database - ${err}`;

    /**
     * server routing
     */
    app.post('/data', (req, res) => {

        if (!req.body.key || !req.body.value) {
        	res.status(400).send('Please send a key and a value');
        }

        dbAaccess.saveData(db, req.body.key, req.body.value, err => {
            if (err) {
            	return res.status(500).send('Server error');
            }

            return res.status(201).send('Saved');
        });
    });

    app.get('/data/:key', (req, res) => {
        if (!req.param('key')) {
        	return res.status(400).send('Please send a proper key');
        }
        
        dbAccess.findBookByTitle(db, req.param('key'), (value) => {
            if (!text) {
            	return res.status(500).send('Server error');
            }
            
            return res.status(200).send(book);
        });
        
    });

    /**
     * server listening
     */

    app.listen(config.server.port, function () {
        console.log(`Listening on port ${config.server.port}`);
    });
});