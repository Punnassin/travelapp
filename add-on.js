const fs = require('fs');
const { JSDOM } = require('jsdom');

// File paths
const inputFilePath = './public/thailand.svg'; // Path to your original SVG
const outputFilePath = './public/thailand.svg'; // Path to save the modified SVG

// Read and parse the SVG file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the SVG file:', err);
    return;
  }

  // Parse the SVG content
  const dom = new JSDOM(data, { contentType: 'image/svg+xml' });
  const document = dom.window.document;

  // Find all <path> elements and add the `onClick` attribute
  const paths = document.querySelectorAll('path');
  paths.forEach((path, index) => {
    const provinceName = path.getAttribute('name') || `Province-${index + 1}`;
    path.setAttribute(
      'fill-opacity',
      `0.8`
    );
  });

  // Serialize the modified SVG content
  const modifiedSVG = dom.serialize();

  // Write the modified SVG to a new file
  fs.writeFile(outputFilePath, modifiedSVG, (err) => {
    if (err) {
      console.error('Error writing the modified SVG file:', err);
      return;
    }
    console.log('Modified SVG saved to:', outputFilePath);
  });
});