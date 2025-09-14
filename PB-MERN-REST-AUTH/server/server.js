const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   const cors = require('cors');

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(bodyParser.json());
   app.use(cors());

   // MongoDB connection
   require('dotenv').config();
   const mongoURI = process.env.MONGO_DB_URI;

   // Connect to MongoDB
   mongoose.connect(mongoURI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

   // Routes
   // app.use('/api/auth', require('./routes/auth'));

   // Start the server
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });