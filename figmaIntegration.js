const Figma = require('figma-js');

// Initialize Figma client with your personal access token
const figmaClient = Figma.Client({
    personalAccessToken: 'YOUR_FIGMA_TOKEN' // Replace with your Figma personal access token
});

// Function to fetch components from a Figma file
async function fetchFigmaComponents(fileId) {
    try {
        const response = await figmaClient.file(fileId);
        const components = extractComponents(response.data.document);
        console.log('Extracted Components:', components);
        return components; // Return the extracted components for further processing
    } catch (error) {
        console.error('Error fetching Figma components:', error);
    }
}

// Function to extract components from the Figma document
function extractComponents(node) {
    let components = [];
    if (node.children) {
        node.children.forEach(child => {
            if (child.type === 'COMPONENT' || child.type === 'INSTANCE') {
                components.push({
                    name: child.name,
                    id: child.id,
                    type: child.type,
                    properties: child.absoluteBoundingBox // Get the properties you need
                });
            }
            // Recursively extract from children
            components = components.concat(extractComponents(child));
        });
    }
    return components;
}

// Example usage
const fileId = 'YOUR_FIGMA_FILE_ID'; // Replace with your Figma file ID

fetchFigmaComponents(fileId)
    .then(components => {
        // Process components, e.g., convert to HTML
        components.forEach(component => {
            console.log(`Component: ${component.name}, ID: ${component.id}, Type: ${component.type}`);
            // Here, you can create HTML elements based on the component properties
        });
    });
