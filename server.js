var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require ('body-parser');
var app = express();

var db = mongojs('contactlist', ['contactlist']);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var update = function(req,res){
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(req.body._id)},
            update: {$set: {name:req.body.name, email: req.body.email, mobile: req.body.mobile}},
            new: true}, function(err, docs){
            //console.log(docs);
            return docs;
    });
}

app.get('/contactList', function(req, res){
    console.log(' Receive GetRequest')
    db.contactlist.find(function(err, docs){
        //console.log(docs);
        res.json(docs);
    });
    
});

app.post('/searchContactList', function(req, res){
    console.log("search log");
    console.log(req.body.name);
    db.contactlist.find({query: {name: req.body.name}},function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactList', function(req, res){
    //console.log(req.body);
    if(req.body._id){
        console.log(req.body);
        res.json(update(req,res));
        return;
    }
     db.contactlist.insert(req.body, function(err, docs){
        res.json(docs);
    }); 
});

app.delete('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
        res.json(docs);
    });
});

app.get('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(' Receive Edit GetRequest')
    db.contactlist.findOne({ _id: mongojs.ObjectId(id)},function(err, docs){
        //console.log(docs);
        res.json(docs);
    });
    
});

app.put('/contactList/:id', function(req, res){
    var id = req.params.id;
    console.log(' Receive Update GetRequest')
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name:req.body.name, email: req.body.email, mobile: req.body.mobile}},
            new: true}, function(err, docs){
                //console.log(docs);
                res.json(docs);
    });
    
});

app.listen(3000);
console.log('server in port 3000');
