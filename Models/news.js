//mongoose
let mongoose = require("mongoose");

//schema
let Schema = mongoose.Schema;

//establish new schema
let newsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//render data
let news = mongoose.model("News", newsSchema);
module.exports = news;