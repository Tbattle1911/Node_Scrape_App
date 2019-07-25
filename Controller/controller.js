//Path
let path = require("path");

//Express
let express = require("express");

//REQUEST
let request = require("request");

//ROUTES
let routes = express.Router();

//Cheerio
let cheerio = require("cheerio");

//Comment
let comments = require("../models/comments");

//Article
let article = require("../models/articles");

router.get("/", function(req, res) {
  res.redirect("/articles");
});

router.get("/scrape", function(req, res) {
  request("https://www.cnn.com/", function(error, response, html) {
    let $ = cheerio.load(html);
    let array = [];

    $(".c-entry-box--compact_title").each(function(i, element) {
      let results = {};

      results.title = $(this)
        .children("a")
        .text();
      results.link = $(this)
        .children("a")
        .attr("href");

      if (results.title !== "" && results.link !== "") {
        if (titlesArray.indexOf(results.title) == -1) {
          titlesArray.push(results.title);

          article.count({ title: results.title }, function(err, test) {
            if (test === 0) {
              let articles = new Article(result);

              article.save(function(err, doc) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(doc);
                }
              });
            }
          });
        } else {
          console.log("Error, missing data");
        }
      }
      res.redirect("/");
    });
  });
  router.get("/articles", function(req, res) {
    article
      .find()
      .sort({ _id: -1 })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          let doc = { article: doc };
          res.render("index", doc);
        }
      });
  });

  router.get("/articles-json", function(req, res) {
    article.find({}, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json(doc);
      }
    });
  });

  router.get("/clearAll", function(req, res) {
    article.remove({}, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log("Articles removed");
      }
    });
    res.redirect("/articles-json");
  });

  router.get("/readArticle/:id", function(req, res) {
    var idArticle = req.params.id;
    var handlebarsObj = {
      article: [],
      body: []
    };

    article.findOne({ _id: idArticle })
      .populate("comments")
      .exec(function(err, doc) {
        if (err) {
          console.log("Error: " + err);
        } else {
          handlebarsObj.article = doc;
          let links = doc.link;
          request(links, function(error, response, html) {
            const $ = cheerio.load(html);

            $(".l-col__main").each(function(i, element) {
              handlebarsObj.body = $(this)
                .children(".c-entry-content")
                .children("p")
                .text();

              res.render("article", handlebarsObj);
              return false;
            });
          });
        }
      });
  });
  router.post("/comment/:id", function(req, res) {
    let name = req.body.name;
    let contents = req.body.comment;

    let commentObj = {
      name: user,
      body: content
    };

    let newCommentObj = new Comment(commentObj);

    newCommentObj.save(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc._id);
        console.log(articleId);

        article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comment: doc._id } },
          { new: true }
        );
      }
    });
  });
});

module.exports = router;
