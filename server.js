// required express & mongoose
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(require('./routes'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// for connecting to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
    useNewURLParser: true,
    useUnifiedTopology: true
});

// listener-queries and use this log to execute queries
mongoose.set('debug', true);

app.listen(PORT, () => {

        console.log(`API server running on port ${PORT}!`);
      });


    