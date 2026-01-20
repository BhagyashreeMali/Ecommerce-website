const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const tmdbRoute = require("./routes/tmdb");

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tmdb", tmdbRoute);
app.get('/', (req, res) => {
    res.send('Netflix Clone API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
