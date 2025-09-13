// server.js
const http = require('http');
const port = process.env.PORT || 5000; // ✅ Fix bitwise OR to logical OR
const app = require('./app');

const server = http.createServer(app);

server.listen(port, () => {
  console.log('App is running on port', port);
});



