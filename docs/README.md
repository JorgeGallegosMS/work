# Picture Gallery

This API allows you to upload your favorite pictures.

- Sign up with a username and password
- Upload your favorite images with a name and the url for the picture
- Check out others' favorite pictures

# Usage

> Clone this repo

```bash
git clone git@github.com:<username>/<repoName>.git
```

> Navigate to the folder

```bash
cd <repoName>
```

> Run the server

```bash
npm start
```

> Running the tests

```bash
npm test
```

# Routes

## Users

### [POST] /users/signup

Signs a user up and sets a cookie for authentication using jwt tokens and bcrypt

### [POST] /users/login

Logs a user in and verifies credentials using jwt tokens and bcrypt

### [GET] /users/logout

Logs out a user and removes the cookie

## Pictures

### [GET] /pictures

Gets a list of all pictures in the database

### [GET] /pictures/:id

Gets information about a single picture

> The following routes require you to be logged in

### [POST] /pictures/new

Submits a new image to the database

### [PUT] /pictures/:id

Allows you to edit an image with the passed in id

### [DELETE] /pictures/:id

Deletes an image with the passed in id
