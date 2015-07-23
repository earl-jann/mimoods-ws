var restify = require('restify')
    , fs = require('fs')


var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

var server = restify.createServer();

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())

// Article Start
server.post("/articles", controllers.article.create)
server.put("/articles/:id", controllers.article.update)
server.del("/articles/:id", controllers.article.destroy)
server.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.show)
server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.show_v2)

// mood operations for article
server.put("/articles/:id/moods", controllers.article.createMood)
server.get("/articles/:id/moods/:moodId", controllers.articlemood.show);
server.get("/articles/:id/moods", controllers.articlemood.all)
//server.post("/articles/:id/moods", controllers.article.createMood);

// comment operations referenced in article
server.put("/articles/:id/comments", controllers.article.createComment)
// Article End

// Comment Start
// Operate on commands in Comment resource. Some of the URI below, refers to above URIs for article
server.put("/comments/:id", controllers.comment.update)
server.del("/comments/:id", controllers.comment.destroy)
server.get("/comments/:id", controllers.comment.show)
// Comment End

var port = process.env.PORT || 3001;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })