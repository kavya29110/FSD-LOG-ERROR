const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Route to read and display log file
app.get('/logs/:filename', (req, res) => {
    const filename = req.params.filename;
    const logPath = path.join(__dirname, 'logs', filename);

    fs.readFile(logPath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({
                    error: 'Log file not found'
                });
            }
            return res.status(500).json({
                error: 'Error reading log file'
            });
        }

        // If request accepts HTML, send HTML response
        if (req.accepts('html')) {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Log Viewer - ${filename}</title>
                    <style>
                        body {
                            font-family: monospace;
                            padding: 20px;
                            background-color: #f5f5f5;
                        }
                        .log-container {
                            background-color: white;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                            white-space: pre-wrap;
                        }
                        .error-message {
                            color: red;
                            padding: 10px;
                            border: 1px solid red;
                            border-radius: 5px;
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Log File: ${filename}</h1>
                    <div class="log-container">${data}</div>
                </body>
                </html>
            `);
        } else {
            // If request accepts JSON or other formats, send plain text
            res.send(data);
        }
    });
});

// Homepage route
app.get('/', (req, res) => {
    const logsDir = path.join(__dirname, 'logs');
    
    fs.readdir(logsDir, (err, files) => {
        if (err) {
            return res.status(500).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Log Viewer</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        .error-message {
                            color: red;
                            padding: 10px;
                            border: 1px solid red;
                            border-radius: 5px;
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Log Viewer</h1>
                    <div class="error-message">Error accessing logs directory</div>
                </body>
                </html>
            `);
        }

        const logFiles = files.filter(file => file.endsWith('.txt'));
        const fileLinks = logFiles.map(file => `<li><a href="/logs/${file}">${file}</a></li>`).join('');

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Log Viewer</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .file-list {
                        background-color: white;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    .file-list li {
                        margin: 10px 0;
                    }
                    .file-list a {
                        color: #0066cc;
                        text-decoration: none;
                    }
                    .file-list a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>Log Viewer</h1>
                <div class="file-list">
                    <h2>Available Log Files:</h2>
                    <ul>${fileLinks}</ul>
                    ${logFiles.length === 0 ? '<p>No log files found</p>' : ''}
                </div>
            </body>
            </html>
        `);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});