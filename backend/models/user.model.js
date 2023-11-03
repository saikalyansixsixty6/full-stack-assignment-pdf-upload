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













// const mongoose = require('mongoose')

// const User = new mongoose.Schema(
// 	{
// 		name: { type: String, required: true },
// 		email: { type: String, required: true, unique: true },
// 		password: { type: String, required: true },
// 		quote: { type: String },
// 	},
// 	{ collection: 'user-data' }
// )

// const pdfFileSchema = new mongoose.Schema({
// 	fileName: {
// 	  type: String,
// 	  required: true,
// 	},
// 	fileSize: {
// 	  type: Number,
// 	  required: true,
// 	},
// 	user: {
// 	  type: mongoose.Schema.Types.ObjectId,
// 	  ref: 'User',
// 	},
	
//   });
  
//   const PDFFile = mongoose.model('PDFFile', pdfFileSchema);
  
//   module.exports = PDFFile;
  

// const model = mongoose.model('UserData', User)

// module.exports = model