const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importing CORS middleware

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public'));

// Function to read JSON files safely
const readJSONFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return []; // Return an empty array if the file does not exist
};

// Function to write to JSON files safely
const writeJSONFile = (filePath, data) => {
    // Check if the directory exists; if not, create it
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write data to JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Route to serve the contact form submission
app.post('/submitContact', (req, res) => {
    console.log('Contact form submission received:', req.body); // Log incoming data
    const newContact = req.body;
    const contactsFile = path.join(__dirname, 'contacts.json');

    try {
        // Load existing contacts
        const contacts = readJSONFile(contactsFile);

        // Add the new contact to the array
        contacts.push(newContact);

        // Save updated contacts to JSON file
        writeJSONFile(contactsFile, contacts);

        res.status(200).send({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).send({ message: 'Error saving contact' });
    }
});

// Route to serve the contacts to the admin panel
app.get('/getContacts', (req, res) => {
    const contactsFile = path.join(__dirname, 'contacts.json');

    // Return existing contacts
    const contacts = readJSONFile(contactsFile);
    res.status(200).json(contacts);
});

// Route to add a new tip
app.post('/tips', (req, res) => {
    const newTip = req.body;
    const tipsFile = path.join(__dirname, 'tips.json');

    // Load existing tips
    const tips = readJSONFile(tipsFile);

    // Add the new tip to the array
    tips.push(newTip);

    // Save updated tips to JSON file
    writeJSONFile(tipsFile, tips);

    res.status(200).send({ message: 'Tip added successfully' });
});

// Route to serve tips to the client
app.get('/tips', (req, res) => {
    const tipsFile = path.join(__dirname, 'tips.json');

    // Return existing tips
    const tips = readJSONFile(tipsFile);
    res.status(200).json(tips);
});

// Serve the admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
