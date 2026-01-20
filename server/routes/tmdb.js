const router = require('express').Router();
const axios = require('axios');

// Generic Proxy Route for TMDB
// Matches /api/tmdb/any/path/here
router.get(/(.*)/, async (req, res) => {
    try {
        const tmdbBaseUrl = 'https://api.themoviedb.org/3';
        const endpoint = req.params[0]; // Captures the wildcard path
        const apiKey = process.env.TMDB_API_KEY;

        // Construct the final URL
        // We blindly forward query parameters from the client, adding the API key
        const response = await axios.get(`${tmdbBaseUrl}/${endpoint}`, {
            params: {
                api_key: apiKey,
                ...req.query
            }
        });

        res.status(200).json(response.data);
    } catch (err) {
        console.error("TMDB Proxy Error:", err.message);
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).json({ message: "Internal Server Error during TMDB Fetch" });
        }
    }
});

module.exports = router;
