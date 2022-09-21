const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB GOT CONNECTED`))
    .catch((err) => {
      console.log(`DB CONNECTION ISSUE: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDB;