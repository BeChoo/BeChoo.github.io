const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://miguieaquino:miguieaquino@gotel.pkl54mr.mongodb.net/';

// Database Name
const dbName = 'Gotel';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the server
client.connect(function(err) {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
        return;
    }
    console.log('Connected successfully to MongoDB server');

    const db = client.db(dbName);

    // Perform operations using `db` object
});
