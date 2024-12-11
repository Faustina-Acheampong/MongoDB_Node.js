import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/countrydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  // Define schema for user model
const countrySchema = new mongoose.Schema({
    name: String,
    continent: String,
    capital: String,
    population: Number,
    currency: String   
  });

const Country = mongoose.model('Country', countrySchema);

  app.listen(3000, () => console.log('Server running on port 3000'));