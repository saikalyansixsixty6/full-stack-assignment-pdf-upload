const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { User, PDFFile } = require('./models/user.model'); // Import the user and PDFFile models from your models directory
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');

// Set up file upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets'); // Store uploaded files in the 'assets' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname); // Create a unique filename for each uploaded file
  },
});

const upload = multer({ storage: storage });

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/fileupload-database')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

// Register a new user
app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

// Login a user
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid login' });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'secret123'
    );

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

// Handle file uploads
app.post('/upload-files', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PDFFile.create({ title: title, pdf: fileName });
    res.send({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

// Get a list of uploaded PDF files
app.get('/get-files', async (req, res) => {
  try {
    PDFFile.find({}).then((data) => {
      res.send({ status: 'ok', data: data });
    });
  } catch (error) {
    // Handle any errors
	console.error("Error",error.message)
  }
});

// Root endpoint
app.get('/', async (req, res) => {
  res.send('Success!!');
});

// Start the server
app.listen(9000, () => {
  console.log('Server started on 9000');
});
