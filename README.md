# xxykx-api

This project creates a backend REST APIs and a UI using Node.js with Express as a framework, React.js and Redux for state management and PostgreSQL with sequelize for data persistence.

## Backend:
- A simple comments API that exposes endpoints for CRUD operations.
- Comments should be able to have replies and all endpoints should be protected
(require authentication) except the read comments endpoint.
- Host app on Heroku.

## Frontend:
- A simple UI to consume the endpoints.
- Host app on Netlify.

## Features
### API
<li> POST /login</li>
<li> POST /register</li>
<li> POST /comments</li>
<li> GET /comments - (Should return with all replies)</li>
<li> PATCH /comments/comment_id</li>
<li> DELETE /comments/comment_id</li>
<li>POST /comments/:comment_id/replies - (should reply to a comment)</li>

### UI
<li> Sign up page.</li>
<li> Sign in page.</li>
<li> Comments page with replies. It shouldn’t require authentication to view the comments, but creating, updating and deleting should require authentication.</li>

## Getting Started
### Installation
- Clone the repository
- run `npm install`
- run `npm run start` to run the app in development mode
- run migrations `npm run migrate`
- run seed `npm run seed`
- Navigate to localhost:xxxx on POSTMAN
- install POSTMAN app to test API Endpoints (https://www.getpostman.com/apps)

### Author
- Martins Obayomi