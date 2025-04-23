const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS user_locations (
    id SERIAL PRIMARY KEY,
    manual_location TEXT,
    additional_details TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    timestamp TIMESTAMPTZ DEFAULT NOW()
  )
`, (err) => {
  if (err) console.error('Error creating table:', err);
  else console.log('Table checked/created.');
});

// Save location API
app.post('/api/location', async (req, res) => {
  const { manualLocation, additionalDetails, latitude, longitude } = req.body;

  try {
    await pool.query(
      'INSERT INTO user_locations (manual_location, additional_details, latitude, longitude) VALUES ($1, $2, $3, $4)',
      [manualLocation, additionalDetails, latitude, longitude]
    );
    res.status(200).send({ message: 'Location saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to save location' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
