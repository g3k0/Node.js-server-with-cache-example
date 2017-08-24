/**
 * RESTful web server with cache - app entry point
 * @author: Christian Palazzo
 * @date: 23, Aug 2017
 */


/**
 * module dependencies
 */
let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let app = express();
let fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json','utf8'));
let dbAccess = require('./dbAccess.js');
let utils = require('./utils.js');
let bodyParser = require('body-parser');

let redisClient = require('redis').createClient;
let redis = redisClient(config.redis.port, config.redis.host);

/*--------------------------------------------------------------------------------------------*/

MongoClient.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, (err, db) => {
    if (err) throw `Error connecting to database - ${err}`;

    /**
     * Middlewares
     */
    app.use(bodyParser.json());

    /**
     * server routing
     */
    app.post('/data', (req, res) => {

        if (!req.body.key || !req.body.value) {
        	res.status(400).send('Please send a key and a value');
        }

        dbAccess.saveData(db, req.body.key, req.body.value, err => {
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
        
        dbAccess.findDataByKeyCached(redis, req.param('key'), value => {
            if (!value) {
            	console.log('Cache miss');
            	let string = utils.createRandomString();
            	
            	dbAccess.updateDbWithRandomValue(db,req.param('key'),string, value =>{
            		if (!value) {
            			return res.status(500).send('Server error');
            		}
            		return res.status(201).send(value);
            	});
            } else {
            	console.log('Cache hit');
            	return res.status(200).send(value);
            }

        });
        
    });

    app.get('/data', (req, res) => {
    	dbAccess.getData(db, (err, docs) => {
    		if (err) {
    			return res.status(500).send('Server error');
    		}

    		return res.status(201).send(docs);
    	});
    });

    app.delete('/remove', (req, res) => {
    	dbAccess.deleteAllData(db, (err, docs) => {
    		if (err) {
    			return res.status(500).send('Server error');
    		}

    		return res.status(201).send('All data removed');
    	});
    });

    app.delete('/remove/:key', (req, res) => {
    	if (!req.param('key')) {
        	return res.status(400).send('Please send a proper key');
        }

    	dbAccess.deleteDataByKey(db, req.param('key'), (err, key) => {
    		if (err) {
    			return res.status(500).send('Server error');
    		}

    		return res.status(201).send(`data with key ${key} removed`);
    	});
    });

    /**
     * server listening
     */

    app.listen(config.server.port, () => {
        console.log(`Listening on port ${config.server.port}`);
    });
});