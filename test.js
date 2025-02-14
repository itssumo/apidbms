import express from 'express';

const app = express();

app.use(express.json());

// Route to get the Authorization header
app.get('/get-token', (req, res) => {
    const authHeader = req.headers['token'];
   console.log(authHeader);// Log the Authorization header to the console
    res.send('Header logged'); // Respond to confirm request was received
});

app.listen(3000, () => console.log("Server running on port 3000"));
