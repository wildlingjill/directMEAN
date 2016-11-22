var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// build your friend schema and add it to the mongoose.models

// this should be whatever the name of the collection will be 
var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true,
		validate: {
			validator: function(value) {
				// return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test( value );
			},
			message: "Invalid email. Email format should be: email@mailserver.com."
		}
	},
	city: {type: String, required: true},
	password: {type: String, required: true,
		validate: {
			validator: function(value) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(value);
			},
			message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number."
		}
	},
}, { timestamps: true });

UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password'))
		return next();

	bcrypt.genSalt(10, function(err, salt){
		if(err)
			return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err)
				return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err)
			return callback(err);
		callback(null, isMatch)
	});
}

mongoose.model('User', UserSchema);