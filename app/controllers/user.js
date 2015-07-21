var mongoose = require('mongoose'),
    User = mongoose.model("User")
ObjectId = mongoose.Types.ObjectId

exports.create = function(req, res, next) {
    var UserModel = new User(req.body);
    UserModel.save(function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: User
            })
        }
    })
}

exports.view = function(req, res) {
    User.findById(new ObjectId(req.params.id), function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (User) {
                res.json({
                    type: true,
                    data: User
                })
            } else {
                res.json({
                    type: false,
                    data: "User: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.update = function(req, res, next) {
    var updatedUserModel = new User(req.body);
    User.findByIdAndUpdate(new ObjectId(req.params.id), updatedUserModel, function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (User) {
                res.json({
                    type: true,
                    data: User
                })
            } else {
                res.json({
                    type: false,
                    data: "User: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.delete = function(req, res, next) {
    User.findByIdAndRemove(new Object(req.params.id), function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "User: " + req.params.id + " deleted successfully"
            })
        }
    })
}

