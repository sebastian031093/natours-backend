const express = require('express');
const fs = require('fs');

console.log('Hello from my backend server app.');

const app = express();

//TODO: Middlewere: is a basically a function that can modify the incoming request data. "middle into request and response"
app.use(express.json());

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

app.get('/api/v1/tours', function (req, resp) {
  resp.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', function (req, resp) {
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
});

app.get('/api/v1/tours/:id', function (req, resp) {
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
});

app.patch('/api/v1/tours/:id', function (req, resp) {
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
});

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`APP running on port ${PORT}`);
});
