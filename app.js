const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

console.log('Hello from my backend server app.');

const app = express();

//TODO: Middlewere: is a basically a function that can modify the incoming request data. "middle into request and response"
app.use(express.json());
app.use(morgan('dev'));

app.use((req, resp, next) => {
  console.log('Hello from the middlewere.');
  next();
});

app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// app.get('/', function (req, resp) {
//   // resp.status(200).send('Hello from expresss server active.');
//   resp.status(200).json({
//     message: 'Hello from expresss server active.',
//     app: 'Natours',
//   });
// });

// app.post('/', function (req, resp) {
//   resp.status(200).send('Hello from expresss server active from POST');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = function (req, resp) {
  resp.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const createTour = function (req, resp) {
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

const getTour = function (req, resp) {
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

const updatedTour = function (req, resp) {
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

const deletedTour = (req, resp) => {
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

const getAllUsers = (req, resp) => {
  resp.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const createdUser = (req, resp) => {
  resp.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, resp) => {
  resp.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const updateddUser = (req, resp) => {
  resp.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const deletedUser = (req, resp) => {
  resp.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updatedTour);
// app.delete('/api/v1/tours/:id', deletedTour);

//3) ROUTE
const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updatedTour).delete(deletedTour);

userRouter.route('/').get(getAllUsers).post(createdUser);
userRouter.route('/:id').get(getUser).patch(updateddUser).delete(deletedUser);

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`APP running on port ${PORT}`);
});
