const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = function (req, resp) {
  resp.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.createTour = function (req, resp) {
  console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  //TODO: never never block the eventloop.
  fs.writeFile(
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
  );

  // resp.send('Done from POST');
};

exports.getTour = function (req, resp) {
  console.log(req.params);
  const id = Number(req.params.id);

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'Error',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find(el => el.id === id);

  resp.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updatedTour = function (req, resp) {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'Error',
      message: 'Invalid ID',
    });
  }

  resp.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour>',
    },
  });
};

exports.deletedTour = (req, resp) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  resp.status(204).json({
    status: 'success',
    data: null,
  });
};
