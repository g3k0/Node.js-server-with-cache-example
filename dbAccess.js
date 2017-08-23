let saveData = (db, key, value, cb) => {
    db.collection('text').save({
        key: key,
        data: data,
    }, cb);
};

let findDataByKey = (db, key, cb) => {
    db.collection('text').findOne({
        key: key
    }, (err, doc) => {
        if (err || !doc) {
        	return cb(null);
        }
        
        return cb(doc.value);
    });
};

let findDataByKeyCached = (redis, key, cb) => {
    redis.get(key, (err, reply) => {
        if (err) {
        	console.log(err);
        	return cb(null);
        }
        if (!reply) {
        	return cb(null)
        };
       
        return cb(reply);
    });
};

let updateDbWithRandomValue = (db, key, value, cb) => {
	db.collection('text').save({
        key: key,
        value: value,
    }, cb(value));
};

let getData = (db,cb) => {
	db.collection('text').find({}).toArray((err, docs) => {
		if (err) {
			return cb(err);
		}

		return cb(null,docs);
	});
}

let deleteDataByKey = (db, key, cb) => {
	db.collection('text').deleteOne({ key : key }, (err, result) => {
		if (err) {
			return cb(err);
		}
		return cb(null, key);
	});
}

let deleteAllData = (db, cb) => {
	db.collection('text').remove((err, result) => {
		if (err) {
			return cb(err);
		}
		return cb(null, 'deleted');
	});
}

/**
 * exports
 */

module.exports.saveData = saveData;
module.exports.findDataByKey = findDataByKey;
module.exports.findDataByKeyCached = findDataByKeyCached;
module.exports.updateDbWithRandomValue = updateDbWithRandomValue;
module.exports.getData = getData;
module.exports.deleteDataByKey = deleteDataByKey;
module.exports.deleteAllData = deleteAllData;

