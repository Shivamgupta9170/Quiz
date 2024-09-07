const express = require('express');
const app = express();
require("dotenv").config();
require("./conn/conn"); // Ensure that this connects to your MongoDB
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

// Unprotected routes (register, login, etc.)
const userRoutes = require("./router/userRoute");
app.use("/api", userRoutes);
const quizRoutes = require("./router/quizRoutes");
app.use("/api",quizRoutes);
const questionRoutes = require("./router/questionRoutes");
app.use("/api",questionRoutes);

// Protected routes using authenticateToken middleware
const authenticateToken = require("./middleware/authenticateToken");
app.use('/api/protected', authenticateToken);

// Example protected route
app.get('/api/protected-data', (req, res) => {
    res.json({ success: true, data: 'Protected data accessible only with a valid token' });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
