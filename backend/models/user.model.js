const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection: 'user-data' });

// Define the PDF file schema
const pdfFileSchema = new mongoose.Schema({
		pdf: String,
		title: String,
    
},{collection:"pdfDetails"});

// Create the models
const User = mongoose.model('UserData', userSchema);
const PDFFile = mongoose.model('PDFFile', pdfFileSchema);

// Export both models
module.exports = { User, PDFFile };













