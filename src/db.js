const { MongoClient } = require('mongodb');

// Here I Use MongoDB database To Save Data !
let dbConnection;
let uri = "mongodb+srv://artem:a54b25c46zx@cluster0.4o5vrid.mongodb.net/BooksStoreWithNExtJS";


// connect to server
module.exports = {

    connectToDb: (cb) => {

        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}