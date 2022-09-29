// ============================================
// Import
// ============================================

const express = require('express');
const cors = require('cors');

require('./models/databases/db-config');
require('dotenv').config();




// ============================================
// Variables and Constants
// ============================================

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || 3000;




// ===========================================
// Express configuration
// ===========================================

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// ===========================================
// Cors configuration
// ===========================================

app.use(cors());




// ===========================================
// Server listening
// ===========================================

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});