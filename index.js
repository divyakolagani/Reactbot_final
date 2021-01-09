const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/keys');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./model/Registration');
require('./model/Demand');
require('./model/coupons');

const app = express();
app.use(bodyParser.json());
require('./routes/dialogflowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
