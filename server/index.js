const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
require('dotenv').config()
const corsOptions = {
  origin: ["http://localhost:4200", "https://gif-fer.netlify.app"]
}
app.use(cors(corsOptions));
app.use(express.json({extended: false}))

connectDB();

app.get('/', (req, res) => [
  res.send("API Running")
])

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/gif', require('./routes/api/gif'));
const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))