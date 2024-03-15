const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/ProjectRoutes');
const userRoutes=require('./routes/UserRoutes');
const authenticateUser=require("./middleware/AuthMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/projectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(authenticateUser);  //to authenticate the user on every request
// Routes
app.use('/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
