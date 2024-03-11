// Import required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

// Import routers
const indexRouter = require('./routes/index');
const customersRouter = require('./routes/customers');
const countersRouter = require('./routes/counters');
const authRouter = require('./routes/auth');

// Create Express application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/customer_queue_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Configure CORS
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests only from this origin
  methods: 'GET,POST,DELETE', // Allow only specified HTTP methods
  allowedHeaders: 'Content-Type,Authorization' // Allow only specified headers
}));

// Configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev')); // Logging
app.use(express.json()); // JSON parsing
app.use(express.urlencoded({ extended: false })); // URL encoded data parsing
app.use(cookieParser()); // Cookie parsing
app.use(express.static(path.join(__dirname, 'public'))); // Static files serving

// Routes setup
app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/counters', countersRouter);
app.use('/auth', authRouter);

// Error handling middleware
// app.use(function (err, req, res, next) {
//   // Set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // Render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// Set up HTTP server
const server = http.createServer(app);
const hostname = '127.0.0.1';
const port = 3000;

// Start HTTP server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket server event handling
wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (message) => {
    console.log('Received: %s', message);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

// Export the Express application
module.exports = app;