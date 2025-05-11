const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.BD_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(con => {
    // console.log(con.connections);
    // console.log('DB connection succefully.');
  });

//TODO: schema to describe out data, to set dafault values, to validate the data and all kind of stuff like that.

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'A tour mus have a price'],
  },
});

//TODO:MODEL: BLUE PRINT THAT WE USE TO CREATE MODELS "TABLES" LIKE A CLASSES IN JS AND OLSO TO QUERY, UPDATE AND DELETE THESE DOCUEMTNS.
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
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
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`APP running on port ${PORT}`);
});
