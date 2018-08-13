const keystone = require('keystone');

exports = module.exports = function (req, res) {
  let view = new keystone.View(req,res);
  let locals = res.locals;

  //Set locals
  locals.section = 'checkin';

  // Load the checkins by sortOrder
	view.query('checkins', keystone.list('CheckIn').model.find().sort('sortOrder'));

	// Render the view
	view.render('checkin');
};