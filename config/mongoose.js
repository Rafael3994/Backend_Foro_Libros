const mongoose = require("mongoose");

// Mongodb Atlas
console.log('MONGO_URI', process.env.MONGO_URI)
mongoose.Promise = global.Promise;
const connection = async () => {
  try {
    return await mongoose.connect(
      process.env.MONGO_URI,
      {
          useNewUrlParser: true,
        },
      );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = connection();
