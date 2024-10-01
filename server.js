const express = require('express');
const bodyParser = require('body-parser');
const { Contentstack } = require('contentstack');
const fetchFigmaComponents = require('./figmaIntegration'); // Adjust the import as necessary
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public folder

// Contentstack configuration
const Stack = Contentstack.Stack(process.env.CONTENTSTACK_API_KEY, process.env.CONTENTSTACK_DELIVERY_TOKEN, process.env.CONTENTSTACK_ENVIRONMENT);

// Fetch content from Contentstack
app.get('/api/content', async (req, res) => {
    try {
        const Query = Stack.ContentType('home_page').Query(); // Change 'home_page' to your content type
        const result = await Query.find();
        res.json(result);
    } catch (error) {
        console.error('Error fetching Contentstack content:', error);
        res.status(500).json({ error: 'Error fetching content' });
    }
});

// Fetch Figma components
app.get('/api/figma-components', async (req, res) => {
    try {
        const components = await fetchFigmaComponents('YOUR_FIGMA_FILE_ID'); // Replace with your Figma file ID
        res.json(components);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Figma components' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
