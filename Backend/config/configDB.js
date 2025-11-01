const mongoose = require('mongoose');
async function configDB() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB successfully Connected');

    } catch (err) {
        console.log('DB Connection failed', err.message);
    }
}
module.exports=configDB