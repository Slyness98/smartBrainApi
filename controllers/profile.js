	const handleProfile = (req, res, db) => {
	const {id} = req.params;
	db.select('*').from('users').where({id})//property and value id are the same. Property id is checking against user's id value.
	  .then(user => {
	  	if (user.length) {
	  	  res.json(user[0])
	  	 } else {
	  	   res.status(400).json('not found')
	  	 }
	})
	.catch(err => res.status(400).json('error getting user'))
};

module.exports = {
	handleProfile: handleProfile
};