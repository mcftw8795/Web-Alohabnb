var express = require('express');
var router = express.Router();

var monk = require('monk');

var db = monk('127.0.0.1:27017/alohabnb');
//add
router.get('/', function(req, res) {
    var collection = db.get('properties');
    if (req.query.pid === undefined){
        collection.find({}, function(err, properties){
            if (err) throw err;
              res.json(properties);
        });
    }
    else{
        collection.findOne({ pid: Number(req.query.pid) }, function(err, property){
            if (err) throw err;
              res.json(property);
        });
    }
});

router.delete('/delete', function(req, res) {
    var collection = db.get('properties');
    if (req.query.pid !== undefined){
        collection.remove({ pid: Number(req.query.pid) });
		res.send({ message:'Reservation is deleted' });
    }
});

//create
router.post('/', function(req, res) {
	var collection = db.get('properties');
	//amenity
	var amenityStr = req.query.amenities;
	var amenityArr = amenityStr.split(',');
	var imageStr = req.query.image;
	var imageArr = imageStr.split(',');

	collection.insert({ 
		title: req.query.title,
		location: req.query.location,
		description:req.query.description,
		nightly_fee: Number(req.query.nightly_fee),
		cleaning_fee: Number(req.query.cleaning_fee),
		service_fee: Number(req.query.service_fee),
		amenities: amenityArr,
		image: imageArr,
		id: Number(req.query.id),
		bedroom: Number(req.query.bedroom)
	}, function(err, property){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(property);
	});
});

//update
router.put('/update', function(req, res) {
    var collection = db.get('properties');
	var is_available=(req.query.is_available==='true' || req.query.is_available==='1' || req.query.is_available==='True');
    if (req.query.pid !== undefined){
        if (req.query.title !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"title" : req.query.title}}, {upsert : false}, {multi : false});
	    if (req.query.location !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"location" : req.query.location}}, {upsert : false}, {multi : false});
		if (req.query.description !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"description" : req.query.description}}, {upsert : false}, {multi : false});
		if (req.query.nightly_fee !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"nightly_fee" : Number(req.query.nightly_fee)}}, {upsert : false}, {multi : false});
		if (req.query.cleaning_fee !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"cleaning_fee" : Number(req.query.cleaning_fee)}}, {upsert : false}, {multi : false});
		if (req.query.service_fee !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"service_fee" : Number(req.query.service_fee)}}, {upsert : false}, {multi : false});
		if (req.query.bedrooms !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"bedrooms" : Number(req.query.bedrooms)}}, {upsert : false}, {multi : false});
		if (req.query.owner !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"owner" : Number(req.query.owner)}}, {upsert : false}, {multi : false});
	    if (req.query.type !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"type" : req.query.type}}, {upsert : false}, {multi : false});
	    if (req.query.is_available !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$set : {"is_available" : is_available}}, {upsert : false}, {multi : false});
		if (req.query.amenities_insert !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$addToSet : {"amenities" : req.query.amenities_insert}}, {upsert : false}, {multi : false});
		if (req.query.amenities_delete !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$pull : {"amenities" : req.query.amenities_delete}}, {upsert : false}, {multi : false});
		if (req.query.image_insert !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$addToSet : {"images" : req.query.image_insert}}, {upsert : false}, {multi : false});
		if (req.query.image_delete !== undefined)
			collection.update({pid:Number(req.query.pid)}, {$pull : {"images" : req.query.image_delete}}, {upsert : false}, {multi : false});
		res.send({ message:'Properties is updated' });
    }
});

module.exports = router;