const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * CheckIn Model
 * =============
 */

const CheckIn = new keystone.List('CheckIn');

CheckIn.add({
	checkInDate: { type: Date, default: Date.now, noedit: true, initial: true },
  checkOutDate: { type: Date },
  checkedIn :{type: Boolean, default: true },
  user : { type: Types.Relationship, ref: 'User', initial: true, index: true },
  purpose : { type: Types.Select, required: true, options: 'Use Gun Range, Viewing Gun Range, Works at Gun Range', default: 'Use Gun Range', initial: true },
});

CheckIn.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

CheckIn.schema.pre('save', function (next) {
  let checkin = this;
  checkin.wasNew = checkin.isNew;
  next();
});

CheckIn.defaultColumns = 'user, checkedIn, purpose';
CheckIn.register();