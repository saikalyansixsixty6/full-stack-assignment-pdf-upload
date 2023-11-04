# full-stack-assignment-pdf-upload
# PDF File Management App

This is a simple web application for managing PDF files. Users can upload, view, and extract pages from PDF files. The application consists of a React frontend and a Node.js backend.

## Features

- **User Registration and Login**: Users can register with their name, email, and password. Registered users can log in to access the file management features.

- **File Upload**: Users can upload PDF files with a title. Uploaded files are stored on the server.

- **PDF Viewing**: Users can view PDF files on the web page.

- **PDF Page Extraction**: Users can select specific pages from a PDF file and extract them into a new PDF.

- **PDF File Listing**: The application lists all the uploaded PDF files, displaying their titles and providing an option to view them.

## Technologies Used

- **Frontend**: React.js is used for the user interface.
- **Backend**: Node.js and Express are used for the server.
- **Database**: MongoDB is used for storing user data and file information.
- **PDF Manipulation**: pdf-lib library is used for loading, viewing, and extracting pages from PDF files.
- **File Upload**: Multer middleware is used for handling file uploads.

## Setup

1. Clone the repository.

2. Install the required dependencies for the frontend and backend using `npm install` in the respective directories.

3. Create a MongoDB database and update the connection string in the backend code.

4. Start the backend server using `npm start` in the backend directory.

5. Start the frontend development server using `npm start` in the frontend directory.

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Register a user account or log in using existing credentials.
- Upload PDF files with titles.
- View uploaded PDF files and select pages for extraction.
- Extract selected pages into new PDF files.
- Download extracted PDF files.

## Acknowledgments

- This project uses open-source libraries and tools.
- It's a basic implementation and can be extended for more advanced features and security enhancements.



