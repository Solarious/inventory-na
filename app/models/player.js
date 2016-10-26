var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true,
		default: 1
	},
	weight: {
		type: Number,
		required: true,
		default: 0
	}
});
ItemSchema.virtual('totalWeight').get(function() {
	return this.quantity * this.weight;
});

var ContainerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	items: [ItemSchema]
});

var PlayerSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	containers: [ContainerSchema]

});

module.exports = mongoose.model('Player', PlayerSchema);
