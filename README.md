# Log Viewer

A web-based tool for viewing error logs stored on a server. This Express.js application allows developers to view log files through a browser interface without direct server access.

## Features

- Browse available log files
- View logs with formatted HTML display
- Error handling for missing/inaccessible files
- Responsive design
- Support for both HTML and plain text responses

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd log-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

- Access the homepage to see a list of available log files
- Click on any log file to view its contents
- Files are displayed with proper formatting and syntax highlighting
- The application handles missing files and other errors gracefully

## Directory Structure

```
log-viewer/
├── logs/           # Directory containing log files
├── server.js       # Main Express application
├── package.json    # Project configuration
└── .gitignore     # Git ignore rules
```

## Error Handling

The application includes comprehensive error handling for:
- Missing files (404 error)
- Inaccessible files (500 error)
- Missing logs directory
- Empty logs directory

## License

MIT