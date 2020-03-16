 const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password} = req.body;
  if ( !(email || name || password) ){
    return res.status(400).json('incorrect form submission');
  }
 const hash = bcrypt.hashSync(password);
 db.transaction(trx => {
 	trx.insert({
 		hash: hash,
 		email: email
 	})
 	.into('login')
 	.returning('email')
 	.then(loginEmail => {
 	  return trx('users')
  	   .returning('*')	//.returning returns all columns of what we're inserting, which we give as a response called user
  	   .insert({
		 name: name,
		 email: loginEmail[0],
		 joined: new Date(),
 	    })
  .then(user =>{
  	    res.json(user[0]); //respond with user info of user that just registerd
       })
   })
   .then(trx.commit)
   .catch(trx.rollback)
 })
 .catch(err => res.status(400).json('Sorry! Unable to register.')) 
};

 module.exports = {
  handleRegister: handleRegister
 };
