const User = require('../models/user');

exports.getSignUp = (req, res) => {
    res.render('signup');
}

exports.createUser = async (req, res) => {
    if (!req.body.userName || !req.body.email || !req.body.password){
        res.render('signup', {err: "Please provide all credentials"})
        return;
    }
    
    // console.log(req.body.email);
    // console.log(req.body.userName);
    // console.log(req.body.password);

    const user = new UserModel ({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    })

    let isDuplicate = false;

    await user.save().catch((reason) =>{
        res.render('signup', {err: "A user with this User Name or password already exists"});
        isDuplicate = true;

        console.log(reason); 

        return;
    });

    if (isDuplicate) {
        return
    }

    // console.log("1");

    res.redirect(`/profile/?userName=${req.body.userName}`); // redirects to the profile page (uses '/')
    // console.log("2");
};

exports.getLogIn = (req, res) =>{
    
    // const user = await User.findOne({userName: req.query.userName});

    res.render('/login');
};

exports.postLogIn = async(req, res)=> {
	/*
		localhost:3000/login
		localhost:3000/profile/?userName=AAA
		get userName and password from the form
		check if userName and password have values
		search DB for the given userName
		with result from DB, check if passwords match
		if match go to profile page
		else go back to login page with err
	*/
	if (!req.body.userName || !req.body.password) {
		res.render('login', {err: "Please provide all credentials"});
		return;
	}

    let user = UserModel.fondUser(req.body);

    if (user) { // if user is returned
        // success, render profile page
        res.render('profile', {user: user.toObject()});
		// res.render('login', {err: "that user doesn't exist"});
		return;
	}
	// if (user.password == req.body.password) {
	// 	res.render('profile', {user: user.toObject()});
	// 	return;
	// }
	res.render('login', {err: "the entered password is incorrect"});
};

exports.getProfile = async(req, res) =>{
    console.log(req);
    console.log('-----------')
    console.log(req.body.userName);
    let user = await User.findOne({userName: req.query.userName});

    if (user == null){
        res.render('profile', {err: "That user doesn't exist"});
        return;
    }

    res.render('profile', {user: user.toObject()});
};