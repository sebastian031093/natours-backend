const morgan = require('morgan');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

console.log('Hello from my backend server app.');

const app = express();

//TODO: Middlewere: is a basically a function that can modify the incoming request data. "middle into request and response"
app.use(express.json());

if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

//Serving statics files
app.use(express.static(`${__dirname}/public`));

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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updatedTour);
// app.delete('/api/v1/tours/:id', deletedTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
