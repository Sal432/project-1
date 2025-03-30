const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'part 1.HTML'));
});

// Prediction endpoint
app.post('/predict', (req, res) => {
  try {
    const emailText = req.body.email_text || '';
    
    // Mock detection - replace with real model later
    const isSpam = emailText.toLowerCase().includes('win') || 
                   emailText.toLowerCase().includes('free') || 
                   emailText.toLowerCase().includes('prize');
    
    res.json({ prediction: isSpam ? 'spam' : 'ham' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});