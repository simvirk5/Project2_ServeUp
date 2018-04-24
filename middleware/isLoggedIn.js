module.exports = function(req, res, next) {
	if(!req.user) {
		req.flash('error', 'you are not authorized to view this page. Please login.');
		res.redirect('/auth/login');
	}
	else {
		next();
	}
}