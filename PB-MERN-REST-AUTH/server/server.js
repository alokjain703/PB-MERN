   import express from 'express';
    import mongoose from 'mongoose';
    import bodyParser from 'body-parser';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import userRoutes from './routes/userRoutes.js';
    dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 5002;
   

   // Middleware
   app.use(bodyParser.json());
   app.use(cors());

   // MongoDB connection
   const mongoURI = process.env.MONGO_DB_URI;

   // Connect to MongoDB
   mongoose.connect(mongoURI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

   // Routes
   // app.use('/api/auth', require('./routes/auth'));
   app.use('/api/users', userRoutes);

   // test api health check
    app.get('/api/health', (req, res) => {
      res.send('API is running...');
    });


   // Start the server
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });