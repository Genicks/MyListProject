import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const cors = require('cors');
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("MONGO_URL is not defined in environment variables.");
    process.exit(1);
}


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database: ✅");
    })
    .catch((error) => {
        console.error("Database: ❌");
        console.error('Database connection error:', error);
        process.exit(1); 
    });

const contentSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    genres: [String],
    episodes: Number,
    release_year: Number,
    synopsis: String
});

const Content = mongoose.model("animations", contentSchema);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({"response": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5a31556ec0447ef5b3acfba75f2030b4.jpg"});
});

app.get('/anime', async (req, res) => {
    try {
        const animeData = await Content.find();
        res.json(animeData);
    } catch (error) {
        console.error('Error fetching anime data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/anime/:search', async (req, res) => {
    try {
        const searchTerm = req.params.search;
        const animeData = await Content.find({ 
            title: { 
                $regex: new RegExp(searchTerm, 'i')  
            } 
        });
        res.json(animeData);
    } catch (error) {
        console.error('Error fetching anime data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Port ${PORT}: ❌`);
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log(`Port ${PORT}: ✅`);
});

