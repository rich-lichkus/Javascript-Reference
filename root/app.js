//app.js

var databaseUrl = "wordsdb"; // "username:password@example.com/mydb"
var collections = ["wordsdb"];
var db = require("mongojs").connect(databaseUrl, collections);