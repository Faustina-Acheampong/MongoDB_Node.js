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

// Routes
app.get('/countries', async (req, res) => {
    try {
      const countries = await Country.find();
      res.json(countries);
    } catch (err) {
      res.status(500).json({ error: "Failed to get countries." });
    }
  });

  app.post('/countries', async (req, res) => {
    try {
        const newCountry = new Country(req.body);
        await newCountry.save();
        res.json(newCountry);
    } catch (error) {
        res.status(400).json({ error: "Failed to create new country." });
    }
  });

  app.put('/countries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedCountry) 
            return res.status(404).json({ error: "Country not found." });
        res.json({ message: "Country updated successfully!",  updatedCountry });
    } catch (error) {
        res.status(400).json({ error: "Failed to update country." });
    }
  });

app.delete('/countries/:id', async (req, res) => {
    try {

    } catch {
        
    }
});

  app.listen(3000, () => console.log('Server running on port 3000'));