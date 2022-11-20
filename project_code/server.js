const database = require('./database.js');
const express = require('express'); // server software
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const LocalStrategy = require('passport-local');
const db = database.connectToCluster();
const minicrypt = require('./miniCrypt');
const { MongoDBNamespace } = require('mongodb');
const mc = new minicrypt.MiniCrypt();

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('project_code'))
app.use(session({
	secret : process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	// cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// App configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	async (username, password, done) => {
		console.log('LocalStrategy is called: username = ' + username + ', pass = ' + password);
		try {
			const cursor = (await db).collection('User').findOne({ username: username });
			const user = await cursor;
			console.log(user);
			if (user) {
				if (mc.check(password, user.salt, user.hash)) {
					return done(null, username);
				} else {
					done(null, false);
				}
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err);
		}
	}
));

passport.serializeUser((user, done) => {
	console.log('serializeUser is called');
	console.log(user);
	return done(null, user);
});

passport.deserializeUser((uid, done) => {
	console.log('DeserializeUser is called: ' + uid);
	done(null, uid);
});

checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) { return next() }
	res.status(401).redirect('../login.html');
}

app.post("/login",
	passport.authenticate('local', { failureMessage: true, failureRedirect: "/login.html" }),
	(req, res) => {
		res.send(database.login(req));
	}
)

app.get("/logout", (req, res) => {
	req.logout(req.user, err => {
		if (err) return next(err);
		res.send(database.logout(req, res));
	})
});

app.get('/', function (req, res) {
	console.log(req.params);
	res.sendFile(__dirname + '/index.html');
});

app.get('/test', checkAuthenticated, (req, res) => {
	console.log(req.params);
	database.testData(req, res);
})

app.get('/user/view/:id', checkAuthenticated, (req, res) => {
	console.log(req.params);
	database.getUser(req.params);
})

app.post('/user/update', checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.updateUser(req, res);
})

app.post('/user/create', checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.createUser(req, res);
})

app.post('/user/delete', checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.deleteUser(req, res);
})

app.get('/user/view/getall', checkAuthenticated, (req, res) => {
	console.log(req.params);
	database.getUser(req, res);
})

app.post('/item/create',checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.createItem(req, res);
})

app.post('/item/delete', checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.deleteItem(req, res);
})

app.post('/item/update', checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.updateItem(req, res);
})

app.post('/item/upload', checkAuthenticated, (req, res) => {
	console.log(req.body);
	database.uploadItemImage(req, res);
})

app.get('/item/view/:id', (req, res) => {
	console.log(req.params);
	database.getItem(req, res);
})

app.get('/item/view/getall', (req, res) => {
	console.log(req.params);
	database.getItem(req, res);
})

// Listen at Bottom
app.listen(port, () => {
	console.log('App listening on port ' + port);
})