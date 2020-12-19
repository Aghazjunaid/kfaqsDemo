var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/demo";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//collection created
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("aj");
  dbo.createCollection("personal_info", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

// insert 1 data into  document
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("aj");
  var myobj = { name: "aghaz junaid", address: "muzaffarpur" };
  dbo.collection("personal_info").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

// use it to insert many data into document
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("aj");
  var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  dbo.collection("personal_info").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

// first create the node server using below code. 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("aj");
  var mysort = { name: 1 };
  dbo.collection("personal_info").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});