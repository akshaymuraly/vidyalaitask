# PROJECT DESCRIPTION

Checkout hosted version of the project : https://vidyalaitask.netlify.app/

A project where you can select a pdf and upload it to the server to filter out desired pages and to create new pdf using it by signing up to the website and loggining using the credentials.

## TO RUN

Install the dependencies and make sure to include .env file at the backend having mongodb connection string stored as MONGODB_CONNECTION_URL and json web token key as JWT_TOKEN_KEY. 
To avoid any potential issue to set HTTP only cookie to the request header made the front end as the proxy of backend server.

## Hosted version

Front end and backend are being hosted in different platforms and in different servers. Origin of the comming request from the backend being set to frontend server url.

## Backend

Backend created using node js along with express. Backend would be responsible for storing the original pdf as well creating new pdf filtering from original one. 
Mongodb used to store user details. User vulnerable details like password being encrypted using bcrypt and stored in database.

_SPECIFICATIONS_

- [x] File validations & all basic input validations
- [x] HTTP only cookie considering security
- [x] Encrypted password

## FRONT-END

Frontend created using react js. User has to sign up to access the actual functionality of the project. Use the credentials to log in to the site. Click and upload the file or drag and drop file to save the pdf file in backend. Once
the pdf saved in backend server successfully you can select the pages to create new pdf.

_SPECIFICATIONS_

- [x] File validations & all basic input validations
- [x] User signup and sign in included
- [x] Multiple copying using the same link included

_LIBRARIES AND PACKAGES USED_

- React js., react-redux, Axios, pdf-lib, react-icons, react-router-dom

## TASKS COMPLETED

- Frontend

* [x] Implement a simple form to upload a PDF file. The form should include validation to ensure that only PDF files are uploaded.
* [x] Once the file is uploaded, display a visual representation of all pages in the PDF.
* [x] Allow users to select which pages they want to extract from the original PDF. This can be achieved through checkboxes or a similar UI element associated with each page.
* [x] Include a button or functionality to create the new PDF based on the selected pages. Once completed, offer a download link to the user for the newly created PDF.
* [x] All pages should be responsive and should work from mobile devices.

- Backend

* [x] Create a REST API to handle the upload of the PDF file and store it on the server.
* [x] Create a REST API to retrieve the stored PDF file for display.
* [x] Implement a REST API to extract the selected pages from the original PDF and create a new PDF. You can use any PDF library to achieve this in the Node.js framework you use.
* [x] Ensure all APIs work correctly and handle potential errors.

- Bonus

* [ ] Add frontend and backend tests.
* [x] Add a live hosted version of the app
* [x] Implement user authentication so that each user can have their own set of PDF files.
* [x] Allow the user to rearrange the order of selected pages in the new PDF.
  > New pdf will/can be created as the _selected_ order of pages.
