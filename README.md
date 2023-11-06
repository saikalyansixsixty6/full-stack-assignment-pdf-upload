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

6. Access the application in your web browser at https://frontend-part-pdf.vercel.app/


## Usage

- Register a user account or log in using existing credentials.
- Upload PDF files with titles.
- View uploaded PDF files and select pages for extraction.
- Extract selected pages into new PDF files.
- Download extracted PDF files.

## Acknowledgments

- This project uses open-source libraries and tools.
- It's a basic implementation and can be extended for more advanced features and security enhancements.

## Preview of this app
- Signup with name,email and password
- ![Screenshot (578)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/f3155425-0bbd-49db-bb7d-11ebc563efb4)
- Then login into account
- ![Screenshot (570)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/316ebd21-c74e-4ee3-9d83-bc7547a6b98d)
- Give name of the file name and select the want to upload
- ![Screenshot (572)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/687eacc1-fdc7-43b9-b0f5-30d091ccb5c3)
- Now we can see visual representation of pdf and click on to upload which stores pdf file on server
- ![Screenshot (573)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/52baf70b-7030-443b-aea5-a5e8b7af6020)
- here on scroll down we can see the page number with checkbox to toggle and untoggle,select what pages you want to select and extract from this pdf file.
- ![Screenshot (575)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/d5973e42-c530-4679-a44a-9f0662949e8b)
- After selecting the pages click on to button Extract & Download which downloads the new pdf file you have selected.
- ![Screenshot (576)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/3363317e-7daf-4e2c-a60a-0fffee8ad328)
- Then we have uploaded files page where you can see what you have uploaded and see the preview of each pdf file
- ![Screenshot (577)](https://github.com/saikalyansixsixty6/full-stack-assignment-pdf-upload/assets/91243096/fb17b3fd-a874-4747-9901-76c8af33a341)









