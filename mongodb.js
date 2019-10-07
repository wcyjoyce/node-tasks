const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient; // access to functions related to database
const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017"; // connects to localhost server
const database = "node-tasks";

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database.");
  } else {
    const db = client.db(database);
    db.collection("tasks").insertMany([
      {
        description: "Complete Node task manager",
        completed: true
      }, {
        description: "Gym workout",
        completed: false
      },
      {
        description: "Plan travels",
        completed: true
      }
    ], (error, result) => {
      if (error) {
        return console.log("Unable to add tasks.");
      } else {
        console.log(result.ops);
      };
    });
  };
});
