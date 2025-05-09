const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.BD_PASSWORD);
// console.log('db', DB);

mongoose.connect();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(con => {
    console.log(con.connections);
    console.log('DB connection succefully.');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`APP running on port ${PORT}`);
});
