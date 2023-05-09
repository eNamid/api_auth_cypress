const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');

const db = {};

(async () => {
    const DB_URL = `mongodb+srv://dima:pass@api.aofsge9.mongodb.net/api-auth`;
    
    const mongo_db = mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('MongoDB is connected'))
    .catch(e=>console.log(e));

    const dirname = path.join(__dirname, 'models');
    const dir = await fs.readdir(dirname);

    const files = dir.filter(file => { 
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
    });
    for (const file of files) {
        const model = require(path.join(dirname, file));
        db[model.name] = model;
    }

    const models = Object.keys(db);
    for (const model of models) {
        if (db[model].associate) db[model].associate(db);
    }

    db.mongo_db = mongo_db;
    db.mongoose = mongoose;
})();

module.exports = db;
