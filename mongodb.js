// const mongoDB = require("mongodb");
// const MongoClient = mongoDB.MongoClient; // access to functions related to database
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017"; // connects to localhost server
const database = "node-tasks";

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database.");
  } else {
    const db = client.db(database);

    // // CRUD #1: Adding collections
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Complete Node task manager",
    //       completed: true
    //     }, {
    //       description: "Gym workout",
    //       completed: false
    //     },
    //     {
    //       description: "Plan travels",
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to add tasks.");
    //     } else {
    //       console.log(result.ops);
    //     };
    //   }
    // );

    // // CRUD #2: Reading collections
    // db.collection("tasks").find({ completed: false }).toArray((error, tasks) => {
    //   if (error) {
    //     return console.log("Unable to find tasks.");
    //   } else {
    //     console.log(tasks);
    //   };
    // });

    // CRUD #3: Updating collections
    db.collection("tasks").updateMany({
      completed: false
    }, {
      $set: {
        completed: true
      }
    }).then(result => {
      result.modifiedCount === 0 ? console.log("No tasks updated.") : console.log("Updated tasks: " + result.modifiedCount);
    }).catch(error => {
      console.log("Unable to update task.");
    });
  };
});
