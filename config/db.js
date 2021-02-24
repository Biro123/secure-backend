const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  console.log('DEBUG:' + db.substring(1,15));
  console.log('DEBUG2:' + process.env.mongoURI.substring(1,15));
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}
module.exports = connectDB;