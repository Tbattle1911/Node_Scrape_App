//mongoose
let mongoose = require("mongoose");

//schema
let schema = mongoose.Schema;

// new schema
let newSchema = new schema({
    name: {
        type: String
    },
    body: {
      type: String,
      required: true  
    }
});

//comments
let comments = mongoose.model("Comment", newSchema);
module.exports = comments;
