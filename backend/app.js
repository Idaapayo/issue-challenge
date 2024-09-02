const express = require('express');
const cors = require('cors');

const app = express();

const PORT =  5000;

// Middleware

app.use(express.json());
app.use(cors());

// In-memory data store for issues
let issues = [];
let issueIdCounter = 1;

// Routes

// Create an issue
app.post('/issues', (req, res) => {
    const { title, description } = req.body;

    const newIssue = {
        id: issueIdCounter++,
        title,
        description,
    };

    issues.push(newIssue);
    res.status(201).json(newIssue);
});

// Update an issue
app.put('/issues/:id', (req, res) => {
    const issueId = parseInt(req.params.id, 10);
    const { title, description } = req.body;

    const issueIndex = issues.findIndex((issue) => issue.id === issueId);

    if (issueIndex === -1) {
        return res.status(404).json({ message: 'Issue not found' });
    }

    const updatedIssue = {
        ...issues[issueIndex],
        title: title || issues[issueIndex].title,
        description: description || issues[issueIndex].description,
    };

    issues[issueIndex] = updatedIssue;
    res.status(201).json(updatedIssue);
});

// Delete an issue
app.delete('/issues/:id', (req, res) => {
    const issueId = parseInt(req.params.id, 10);

    const issueIndex = issues.findIndex((issue) => issue.id === issueId);

    if (issueIndex === -1) {
        return res.status(404).json({ message: 'Issue not found' });
    }

    issues.splice(issueIndex, 1);
    res.status(204).send();
});

// Get all issues
app.get('/issues', (req, res) => {
    res.json(issues);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});