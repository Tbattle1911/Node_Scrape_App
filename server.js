//mongoose
let mongoose = require("mongoose");

//bodyparser
let bodyParser = require("body-parser");

//logger
let logger = require("morgan");

//Express
let express = require("express");

let app = express();

//Mongo
const mongoDB = 
process.env.mongoDB || "mongo://localhost/scraped_news";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


//Body parser and Express
app.use(logger("data"));
app.use( bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(process.cwd() + "/public"));

//Express
let expressHandlebars = require("express.handlebars");
app.engine(
    "handlebars",
    expressHandlebars({ defaultLayout: "main" })
);
app.set("engine", handlebars);

//Routes
const routes = require("./controller/controller");
app.use("/", routes);

//Local host PORT
let localPort = process.env.PORT || 3030;
app.listen(port, function() {
    console.log("listening on" + port);
});


