const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
console.log(process.env);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`APP running on port ${PORT}`);
});
