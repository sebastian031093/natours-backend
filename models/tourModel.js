const mongoose = require('mongoose');

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

module.exports = Tour;
