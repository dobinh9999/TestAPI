const express = require('express');
const cors = require('cors'); 
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoutes = require('./routes/user'); // Import user routes
/// conect database 

require('dotenv').config();
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Connection error:', err);
    }
}
connectDB();



/// middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(morgan('common'));
/// routers

app.use('/api/users', userRoutes); // Use user routes




app.listen(8000, () => {
    console.log('Server is running on port 8000...');
});
