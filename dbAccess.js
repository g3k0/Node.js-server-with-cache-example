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

/**
 * exports
 */

module.exports.saveData = saveData;
module.exports.findDataByKey = findDataByKey;

