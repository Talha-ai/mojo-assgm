const mongoose = require('mongoose'); 
const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('MONGO CONNECTION OPEN');
    })
    .catch(err => {
      console.log('ERROR!!');
      console.log(err);
    })
}

module.exports = connectDB;
