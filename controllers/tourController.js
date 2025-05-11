// const fs = require('fs');
const Tour = require('../models/tourModel');

/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
); */

/* exports.checkId = function (req, resp, next, val) {
  console.log('Toour id is', val);

  const id = Number(req.params?.id);

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'Error',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = function (req, resp, next, val) {
  console.log('Toour body is', val);

  const jsonBody = req.body();

  if (!jsonBody.name || !jsonBody.price) {
    return resp.status(400).json({
      status: 'Error',
      message: 'Bad request. Missing name or price',
    });
  }

  next();
}; */

exports.getAllTours = function (req, resp) {
  resp.status(200).json({
    status: 'success',
    /*  requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    }, */
  });
};

exports.createTour = async function (req, resp) {
  /* console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour); */

  //TODO: never never block the eventloop.
  /* fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    function (err) {
      resp.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  ); */

  //TODO: just to make sure that everything is clear for you.
  //1)We can use the Tour model directly and call the create method on it
  //2)In to that function we pass the data that we want store in the data base as a new tour and that data comes from the post body.
  try {
    const newTour = await Tour.create(req.body);

    resp.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: 'fail request',
      message: error.message,
    });
  }

  // resp.send('Done from POST');
};

exports.getTour = function (req, resp) {
  // console.log(req.params);

  // const tour = tours.find(el => el.id === id);

  resp.status(200).json({
    status: 'success',
    /*  data: {
      tour,
    }, */
  });
};

exports.updatedTour = function (req, resp) {
  /*  const id = Number(req.params.id);

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'Error',
      message: 'Invalid ID',
    });
  } */

  resp.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour>',
    },
  });
};

exports.deletedTour = (req, resp) => {
  /* const id = Number(req.params.id);

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  } */

  resp.status(204).json({
    status: 'success',
    data: null,
  });
};
