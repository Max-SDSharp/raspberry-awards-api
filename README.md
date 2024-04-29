# Movie Awards Intervals API

## Description
This API provides endpoints to retrieve information about movie producers with the longest and shortest intervals between consecutive awards.

## Installation

Before proceeding with the installation, make sure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone the repository:

```
git clone https://github.com/msalvatti/raspberry-awards-api.git
```

2. Navigate to the project directory:

```
cd raspberry-awards-api
```

3. Install dependencies:

```
npm install
```

The project utilizes environment variables for sensitive data and configuration. Create a `.env` file in the root directory of the project with the following variables. Use the file .env.example for reference:

```dotenv
# The backend PORT
PORT=3001
```

## Usage
To start the server, run the following command:

```
npm start
```

This will start the Express server at `http://localhost:3001`.

## Endpoints

### Get the longest and shortest intervals between consecutive awards

- **URL:** `/awards/intervals`
- **Method:** GET
- **Description:** Returns information about movie producers with the longest and shortest intervals between consecutive awards.

## Testing
Integration tests are implemented using Jest and Supertest. To run the tests, use the following command:

```
npm test
```

## Contributing

Contributions are welcome! If you find any issues or want to suggest enhancements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

