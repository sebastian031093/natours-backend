const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.BD_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'natorus',
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection succefully.');
  });

// console.log('dirname', __dirname);

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//IMPORT DATA INTO DB
const importData = async function () {
  try {
    await Tour.create(tours);
    console.log('Data successfully created!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//DELETED ALL DATA DROM DB

const deleteData = async function () {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log('prosses', process.argv);
