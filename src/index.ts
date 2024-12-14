const express = require(`express`);// get,post we use now
const cors = require(`cors`);
const http = require(`http`); // url


let app = express();
app.use(cors());
app.use(express.json());


// get api data books (routes)
app.use('/api/books', require('./routes/books.js'));

const PORT = 8000;

const server = http.createServer(app);
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) });