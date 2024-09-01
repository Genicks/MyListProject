// Add document Save method
const newContent = new Content({
    title: "Example Anime",
    rating: 8.5,
    genres: ["Action", "Adventure"],
    episodes: 24,
    release_year: 2023,
    synopsis: "An epic adventure of a young hero."
});

newContent.save()
    .then(() => console.log('Document saved!'))
    .catch((error) => console.error('Error saving document:', error));


// Add document Create method
Content.create({
    title: "Example Anime",
    rating: 8.5,
    genres: ["Action", "Adventure"],
    episodes: 24,
    release_year: 2023,
    synopsis: "An epic adventure of a young hero."
})
.then(() => console.log('Document created and saved!'))
.catch((error) => console.error('Error creating document:', error));


// Add document Routing method
app.post('/anime', async (req, res) => {
    const { title, rating, genres, episodes, release_year, synopsis } = req.body;

    try {
        const newContent = new Content({
            title,
            rating,
            genres,
            episodes,
            release_year,
            synopsis
        });

        await newContent.save();
        res.status(201).json({ message: 'Document created and saved!' });
    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

