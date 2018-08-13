var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * =============
 */

var User = new keystone.List('User');
User.add({
	name: { type: Types.Name, required: true, index: true },
	role: { type: Types.Select, options: 'Customer, Administrator, Trainer, Vendor', required: true, initial: true, index: true, default: 'Customer' },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'CheckIn', path: 'checkins', refPath: 'user' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, role';
User.register();
