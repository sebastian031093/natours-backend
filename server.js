const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
// console.log(app.get('env'));
// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.BD_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: 'natorus',
  })
  .then(con => {
    // console.log(con.connections);
    // console.log('DB connection succefully.');
  });

/* const testTour = new Tour({
  name: 'The Forrest Hiker',
  rating: 4.7,
  price: 654,
});

testTour
  .save()
  .then(doc => {
    console.log('doc', doc);
  })
  .catch(error => {
    console.log('error from', error);
  }); */

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`APP running on port ${PORT}`);
});
