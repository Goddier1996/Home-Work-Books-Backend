const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require('mongodb')
const cors = require(`cors`)


let infoBooks = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



// connect to server from ab.js file
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(8002, () => {
            console.log('app on port 8000(books info)')
        })
        db = getDb();
    }
    else {
        console.log(err)
    }
})



// Here Get all info books
infoBooks.get('/', (req, res) => {

    // get all books from database and push to array.
    let books = []

    db.collection('books')
        .find()

        // here we can sort data if we need,but in home work don't need!
        // .sort({ title: 1 })
        
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



// Add new book to database
infoBooks.post('/add', (req, res) => {

    // get data book to add new book to database
    const book = req.body;

    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



// Here Get id book info
infoBooks.get('/:id', (req, res) => {

    const id = new ObjectId(req.params.id);

    if (ObjectId.isValid(id)) {

        db.collection('books')
            .findOne({ _id: id })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }
    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})



// Delete id book
infoBooks.delete('/delete/:id', (req, res) => {

    const id = new ObjectId(req.params.id);

    if (ObjectId.isValid(id)) {

        db.collection('books')
            .deleteOne({ _id: id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }
    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})



// Update info book
infoBooks.patch('/:id', (req, res) => {

    // get data what we update in the book
    const updatesDataInfoBook = req.body;

    // here id book, we need id to update data book
    const id = new ObjectId(req.params.id);


    if (ObjectId.isValid(id)) {

        db.collection('books')
            .updateOne({ _id: id }, { $set: updatesDataInfoBook })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }
    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})



module.exports = infoBooks;