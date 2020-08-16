const Event = require('../models/event');
var objectId = require('mongodb').ObjectID;

//create
exports.createEvent = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    try{
       const event = new Event({
           title:req.body.title,
           time:req.body.time ,
           description:req.body.description || "no descrition",
           location:req.body.location || "undifined location"
       });
       event.save()
       .then(data => {
           res.send(data);
       }).catch(err => {
           res.status(500).send({
               message: err.message || "Some error occurred while creating the event."
           });
       });

    }catch{
        return res.status(400).send({
            message: "event content can not be empty"
        });
    }
}
//delete
exports.deleteEvent= (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*')
Event.findByIdAndRemove(req.params.eventId)
.then(event => {
    if(!event) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.eventId
        });
    }
    res.send({message: "Note deleted successfully!"});
}).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.eventId
        });                
    }
    return res.status(500).send({
        message: "Could not delete note with id " + req.params.eventId
    });
});
}
//read
exports.findAll = (req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    Event.find()
    .then(event => {
        res.send(event);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving events."
        });
    });
}
//update
exports.updateEvent=(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.params.eventId)
    Event.findByIdAndUpdate(req.params.eventId, {
        title: req.body.title ,
        time: req.body.time,
        description:req.body.description || "no descrition",
        location :req.body.location || "undifined location",
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.eventId
        });
    });
}