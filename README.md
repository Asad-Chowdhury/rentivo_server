# Rentivo

Rentivo is a car rental website that lets users list cars, browse available rental vehicles, view car details, and manage booking records. This repository contains the Express and MongoDB backend server for the Rentivo application.

## Website Features

- Users can add new cars for rental with complete listing information.
- Users can view only the cars they have listed through a user-specific car listing API.
- Visitors can browse all available car listings from the database.
- Users can open an individual car details page using a car ID.
- Users can create bookings for rental cars.
- Users can view their own booking history using their user ID.
- Users can cancel booking records from MongoDB.
- Car owners can edit existing car listing information.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- CORS
- dotenv

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Checks that the server is running. |
| `POST` | `/add-new-car` | Adds a new rental car listing. |
| `GET` | `/car-listing` | Returns all car listings. |
| `GET` | `/car-listing/:userId` | Returns car listings for a specific user. |
| `GET` | `/car-listing/details/:id` | Returns details for a single car. |
| `PATCH` | `/car-listing/:id` | Updates a car listing by ID. |
| `DELETE` | `/car-listing/:id` | Deletes a car listing by ID. |
| `POST` | `/booking/:userId` | Creates a booking for a specific user. |
| `GET` | `/booking/:userId` | Returns bookings for a specific user. |
| `DELETE` | `/booking/:userId` | Cancels a booking using the booking `_id`. |
| `PATCH` | `/booking/:userId` | Deletes a booking record using the booking `_id`. |

## Environment Variables

Create a `.env` file in the project root and add:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

## Installation

```bash
npm install
```

## Run Locally

```bash
node index.js
```

The server runs on:

```text
http://localhost:5001
```

## Database

The server uses a MongoDB database named `rentivodb` with these collections:

- `users`
- `cars`
- `bookings`

## Project Structure

```text
rentivo_server/
├── index.js
├── package.json
├── package-lock.json
└── README.md
```
