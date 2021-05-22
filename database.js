
const mongoose = require("mongoose")
const connectDB = () => {
  mongoose
        .connect("mongodb://localhost:27017/automation", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((conn) => {
      console.log(`db connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};


module.exports = connectDB
