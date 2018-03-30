'use strict';

const path = require('path');
const url = require('url');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const debug = require('debug');
const uuid = require('uuid/v4');

const logger = debug('mylogger');
logger('Starting app');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const NEW_BASE = '/new';
const MODES = {
	MULTIPLAYER: 'multiplayer',
	SINGLEPLAYER: 'singleplayer'
};
class Urls {
	constructor(base = '') {
		this._get = {
			ME: `${base}/user/me`,
			USER: `${base}/user/:id`,
			SCOREBOARD: `${base}/scoreboard/:mode/:page`,
			HISTORY: `${base}/history/:mode/:page`,
			//TODO: AVATAR,
			//TODO: ABOUT,
			//TODO: RULES,
		};
		this._post = {
			LOGIN: `${base}/login`,
			REGISTRATION: `${base}/signup`,
			//TODO: AVATAR UPLOAD
			USER_EDIT: `${base}/user/edit`,
			LOGOUT: `${base}/logout`
		};
	}

	get get() {
		return this._get;
	}

	get post() {
		return this._post;
	}
}

const URLS = new Urls(NEW_BASE);
class ResponceData {
	constructor () {
		this._successful = true;
		this._message = {
			global: [],
			fields: {}
		};
	}

	get data() {
		return {
			successful: this._successful,
			message: this._message
		};
	}

	addFieldError(fieldName, error) {
		this._successful = false;

		if (!this._message.fields[fieldName]) {
			this._message.fields[fieldName] = [];
		}

		this._message.fields[fieldName].push(error);
	}

	addGlobalError(error) {
		this._successful = false;

		this._message.global.push(error);
	}

	setSuccessData(data = {}) {
		this._successful = true;
		this._message = data;
	}
}


const allowedOrigins = [
	'localhost:3000',
	'localhost',
	'teckokek-front.herokuapp.com',
	'technokek2018.herokuapp.com'
];

const CORS_HEADERS = {
	requestedHeaders: 'Access-Control-Request-Headers'.toLowerCase(),
	requestedMethod: 'Access-Control-Request-Method'.toLowerCase(),

	allowOrigin: 'Access-Control-Allow-Origin'.toLowerCase(),
	allowMethods: 'Access-Control-Allow-Methods'.toLowerCase(),
	allowHeaders: 'Access-Control-Allow-Headers'.toLowerCase(),
	allowCredentials: 'Access-Control-Allow-Credentials'.toLowerCase()
};

app.use(function (req, res, next) {
	const requestOrigin = req.headers['origin'];

	console.log('AAAAAA', requestOrigin, req.headers);

	if (typeof requestOrigin !== 'undefined') {
		
		const requestOriginHostname = url.parse(requestOrigin).hostname;


		const requestedHeaders = req.headers[CORS_HEADERS.requestedHeaders];
		const requestedMethod = req.headers[CORS_HEADERS.requestedMethod];
		logger(`Requested ${req.method} ${req.path} with origin ${requestOrigin} (${requestOriginHostname})`, {
			requestedHeaders,
			requestedMethod
		});

		const headers = [];
		if (requestedHeaders) {
			headers.push([CORS_HEADERS.allowHeaders, requestedHeaders]);
		}
		if (requestedMethod) {
			headers.push([CORS_HEADERS.allowMethods, 'GET, POST, OPTIONS']);
		}

		res.setHeader(CORS_HEADERS.allowOrigin, allowedOrigins[3]);


		console.log('requestOriginHostname: ', requestOriginHostname);
		if (allowedOrigins.includes(requestOriginHostname)) {
			headers.push([CORS_HEADERS.allowOrigin, requestOrigin]);
			headers.push([CORS_HEADERS.allowCredentials, 'true']);
		}

		const result = headers.map(pair => '\t' + pair.join(': ')).join('\n');
		logger(`Response with headers:\n` + result);

		headers.forEach(([name, value]) => res.setHeader(name, value));
	}
	next();
});


const users = {
	'vv-ch@bk.ru': {
		id: 1,
		nickname: 'Vitaly Cherkov',
		email: 'vv-ch@bk.ru',
		password: 'password',
		games: 20,
		score: 72,
		avatar: null
	},
	'vv-ch1@bk.ru': {
		id: 2,
		nickname: 'Vitaly Cherkovv',
		email: 'vv-ch1@bk.ru',
		password: 'password',
		games: 21,
		score: 172,
		avatar: null
	},
	'vv-ch2@bk.ru': {
		id: 3,
		nickname: 'Vitaly Cherkovvv',
		email: 'vv-ch2@bk.ru',
		password: 'password',
		games: 22,
		score: 272,
		avatar: null
	},
};

const ids = {};

const sbSingleplayer = [
	{
		index: 1,
		nickname: 'TheKeker',
		score: '3000'
	},
	{
		index: 2,
		nickname: 'TheLoler',
		score: '2984'
	},
	{
		index: 3,
		nickname: 'Vitaly Cherkov',
		score: '2876'
	},
	{
		index: 4,
		nickname: 'Martin K',
		score: '2465'
	},
	{
		index: 5,
		nickname: 'Shporter',
		score: '2311'
	},{
		index: 6,
		nickname: 'Vladislav',
		score: '2163'
	},
	{
		index: 7,
		nickname: 'TheKeker',
		score: '2085'
	},
	{
		index: 8,
		nickname: 'TheKeker',
		score: '1984'
	},
	{
		index: 9,
		nickname: 'TheLoler',
		score: '1854'
	},
	{
		index: 10,
		nickname: 'Vitaly Cherkov',
		score: '1765'
	},
	{
		index: 11,
		nickname: 'Martin K',
		score: '1754'
	},
	{
		index: 12,
		nickname: 'Shporter',
		score: '1654'
	},{
		index: 13,
		nickname: 'Vladislav',
		score: '1642'
	},
	{
		index: 14,
		nickname: 'TheKeker',
		score: '1598'
	},
	{
		index: 15,
		nickname: 'TheKeker',
		score: '1576'
	},
	{
		index: 16,
		nickname: 'TheLoler',
		score: '1547'
	},
	{
		index: 17,
		nickname: 'Vitaly Cherkov',
		score: '1467'
	},
	{
		index: 18,
		nickname: 'Martin K',
		score: '1454'
	},
	{
		index: 19,
		nickname: 'Shporter',
		score: '1420'
	},{
		index: 20,
		nickname: 'Vladislav',
		score: '1403'
	},
	{
		index: 21,
		nickname: 'TheKeker',
		score: '1367'
	},
	{
		index: 22,
		nickname: 'TheKeker',
		score: '1359'
	},
	{
		index: 23,
		nickname: 'TheLoler',
		score: '1345'
	},
	{
		index: 24,
		nickname: 'Vitaly Cherkov',
		score: '1154'
	},
	{
		index: 25,
		nickname: 'Martin K',
		score: '1021'
	},
	{
		index: 26,
		nickname: 'Shporter',
		score: '1002'
	},{
		index: 27,
		nickname: 'Vladislav',
		score: '1000'
	},
	{
		index: 28,
		nickname: 'TheKeker',
		score: '988'
	}
];

const sbMultiplayer = [
	{
		index: 1,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '3000'
	},
	{
		index: 2,
		nickname1: 'TheLoler',
		nickname2: 'Vladimir putin',
		score: '2984'
	},
	{
		index: 3,
		nickname1: 'Vitaly Cherkov',
		nickname2: 'Vladimir putin',
		score: '2876'
	},
	{
		index: 4,
		nickname1: 'Martin K',
		nickname2: 'Vladimir putin',
		score: '2465'
	},
	{
		index: 5,
		nickname1: 'Shporter',
		nickname2: 'Vladimir putin',
		score: '2311'
	},{
		index: 6,
		nickname1: 'Vladislav',
		nickname2: 'Vladimir putin',
		score: '2163'
	},
	{
		index: 7,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '2085'
	},
	{
		index: 8,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '1984'
	},
	{
		index: 9,
		nickname1: 'TheLoler',
		nickname2: 'Vladimir putin',
		score: '1854'
	},
	{
		index: 10,
		nickname1: 'Vitaly Cherkov',
		nickname2: 'Vladimir putin',
		score: '1765'
	},
	{
		index: 11,
		nickname1: 'Martin K',
		nickname2: 'Vladimir putin',
		score: '1754'
	},
	{
		index: 12,
		nickname1: 'Shporter',
		nickname2: 'Vladimir putin',
		score: '1654'
	},{
		index: 13,
		nickname1: 'Vladislav',
		nickname2: 'Vladimir putin',
		score: '1642'
	},
	{
		index: 14,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '1598'
	},
	{
		index: 15,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '1576'
	},
	{
		index: 16,
		nickname1: 'TheLoler',
		nickname2: 'Vladimir putin',
		score: '1547'
	},
	{
		index: 17,
		nickname1: 'Vitaly Cherkov',
		nickname2: 'Vladimir putin',
		score: '1467'
	},
	{
		index: 18,
		nickname1: 'Martin K',
		nickname2: 'Vladimir putin',
		score: '1454'
	},
	{
		index: 19,
		nickname1: 'Shporter',
		nickname2: 'Vladimir putin',
		score: '1420'
	},{
		index: 20,
		nickname1: 'Vladislav',
		nickname2: 'Vladimir putin',
		score: '1403'
	},
	{
		index: 21,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '1367'
	},
	{
		index: 22,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '1359'
	},
	{
		index: 23,
		nickname1: 'TheLoler',
		nickname2: 'Vladimir putin',
		score: '1345'
	},
	{
		index: 24,
		nickname1: 'Vitaly Cherkov',
		nickname2: 'Vladimir putin',
		score: '1154'
	},
	{
		index: 25,
		nickname1: 'Martin K',
		nickname2: 'Vladimir putin',
		score: '1021'
	},
	{
		index: 26,
		nickname1: 'Shporter',
		nickname2: 'Vladimir putin',
		score: '1002'
	},{
		index: 27,
		nickname1: 'Vladislav',
		nickname2: 'Vladimir putin',
		score: '1000'
	},
	{
		index: 28,
		nickname1: 'TheKeker',
		nickname2: 'Vladimir putin',
		score: '988'
	}
];

const scoreboardModes = {
	SINGLEPLAYER: 'singleplayer',
	MULTIPLAYER: 'multiplayer'
};

const PERPAGE = 10;

const hsSingleplayer = [
	{
		index: 1,
		date: '13:02:2017',
		score: '3000'
	},
	{
		index: 2,
		date: '13:02:2017',
		score: '2984'
	},
	{
		index: 3,
		date: '13:02:2017',
		score: '2876'
	},
	{
		index: 4,
		date: '13:02:2017',
		score: '2465'
	},
	{
		index: 5,
		date: '13:02:2017',
		score: '2311'
	},{
		index: 6,
		date: '13:02:2017',
		score: '2163'
	},
	{
		index: 7,
		date: '13:02:2017',
		score: '2085'
	},
	{
		index: 8,
		date: '13:02:2017',
		score: '1984'
	},
	{
		index: 9,
		date: '13:02:2017',
		score: '1854'
	},
	{
		index: 10,
		date: '13:02:2017',
		score: '1765'
	},
	{
		index: 11,
		date: '13:02:2017',
		score: '1754'
	},
	{
		index: 12,
		date: '13:02:2017',
		score: '1654'
	}
];

const hsMultiplayer = [
	{
		index: 1,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '3000'
	},
	{
		index: 2,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '2984'
	},
	{
		index: 3,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '2876'
	},
	{
		index: 4,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '2465'
	},
	{
		index: 5,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '2311'
	},{
		index: 6,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '2163'
	},
	{
		index: 7,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '2085'
	},
	{
		index: 8,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '1984'
	},
	{
		index: 9,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '1854'
	},
	{
		index: 10,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '1765'
	},
	{
		index: 11,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '1754'
	},
	{
		index: 12,
		date: '13:02:2017',
		partner: 'Vladimir putin',
		score: '1654'
	}
];


// TODO: API refactor
app.post('/signup', function (req, res) {
	const password = req.body.password;
	const passwordRepeat = req.body['repeat-password'];
	const email = req.body.email;
	const nickname = req.body.nickname;

	const responceData = new ResponceData();

	if (
		!password || !email ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/)
	) {
		//TODO:
		responceData.addGlobalError('Invalid data');

		return res.status(400).json({
			error: {
				global: 'Не валидные данные пользователя',
				fields: []
			}
		});
	}
	if (users[email]) {
		//TODO:
		responceData.addFieldError('email', 'Email already used');

		return res.status(400).json({
			error: {
				global: '',
				fields: [
					{
						name: 'email',
						value: 'Пользователь уже существует'
					}
				]
			}
		});
	}
	if (password !== passwordRepeat) {
		//TODO:
		responceData.addFieldError('password', 'Passwords do not match');

		return res.status(400).json({
			error: {
				global: '',
				feidls:[{
					name: 'repeat-password',
					value: 'Введеные пароли не совпадают'
				}]
			}
		});
	}
	for (let user of Object.values(users)) {
		//TODO:
		responceData.addFieldError('nickname', 'This nickname already used');

		if (user.nickname === nickname) {
			return res.status(400).json({
				error: {
					global: '',
					fields: [{
						name: 'nickname',
						value: 'Такой никнейм уже занят'
					}]
				}
			});
		}
	}

	const id = uuid();
	const user = {password, nickname, email, score: 0, games: 0};
	ids[id] = email;
	users[email] = user;

	res.cookie('frontend', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

// TODO: API refactor
app.post('/login', function (req, res) {

	const responceData = new ResponceData();

	const password = req.body.password;
	const email = req.body.email;

	if (!password || !email) {
		responceData.addGlobalError('not ');

		return res.status(400).json({error: {
			global: 'Не указан E-Mail или пароль',
			fields: []
		}});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: {
			global: 'Не верный E-Mail и/или пароль',
			fields: []
		}});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie('frontend', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

// TODO: API refactor
app.post('/logout', function (req, res) {
	const id = req.cookies['frontend'];
	delete ids[id];

	res.status(200).end();
});

// TODO: API refactor
app.post('/edit', function(req, res) {
	const id = req.cookies['frontend'];
	const email = ids[id];
	const field = req.body.field;
	const value = req.body.value;

	if (!email || !users[email] || !users[email][field]) {
		return res.status(401).end();
	}

	if (field !== 'password') {
		if (users[email][field] === value) {
			res.status(201).json({id});
		}
		for (let user of Object.values(users)) {
			if (user[field] === value) {
				return res.status(400).json({
					error: {
						global: '',
						fields:[{
							name: field,
							value: `Такой ${field} уже занят`
						}]
					}
				});
			}
		}
		users[email][field] = value;
		res.status(201).json({id});
	}
	else {
		const newPassword = req.body['new-password'];
		const repeatPassword = req.body['new-password-repeat'];

		if (users[email].password !== value) {
			return res.status(400).json({
				error: {
					global: '',
					fields: [{
						name: 'old-password',
						value: 'Старый парль введен неверно'
					}]
				}
			});
		}
		if (newPassword !== repeatPassword) {
			return res.status(400).json({
				error: {
					global: '',
					fields: [{
						name: 'new-password-repeat',
						value: 'Введенные пароли не совпадают'
					}]
				}
			});
		}

		users[email].password = newPassword;
		res.status(201).json({id});
	}
});

// TODO: API refactor
app.get('/me', function (req, res) {
	// TODO: responceData
	const responceData = new ResponceData();

	const id = req.cookies['frontend'];
	const email = ids[id];
	if (!email || !users[email]) {
		responceData.addGlobalError('You are unauthorized');
		return res.status(401).end();
	}

	users[email].score += 1;
	responceData.setSuccessData({
		id: users[email].id,
		nickname: users[email].nickname,
		email: users[email].email,
		score: users[email].score,
		games_number: users[email].games,
		avatar: users[email].avatar
	});
	res.json(users[email]);
});

// TODO: API refactor
app.get('/users', function (req, res) {
	const scorelist = Object.values(users)
		.sort((l, r) => r.rating - l.rating)
		.map(user => {
			return {
				email: user.email,
				age: user.age,
				rating: user.rating
			};
		});

	res.json(scorelist);
});

// -------------------------------------------------------------------------------------
// SCOREBOARD
// -------------------------------------------------------------------------------------


// TODO: API refactor
app.get('/scoreboard/:mode/page/:pageNumber', function(req, res) {
	
	const mode = req.params.mode;
	const pageNumber = req.params.pageNumber;
	
	if (mode === scoreboardModes.SINGLEPLAYER) {
		const respData = sbSingleplayer.filter(item => 
			(item.index > PERPAGE * (pageNumber - 1)) && (item.index <= PERPAGE * pageNumber)
		);
		res.json(respData);
		return;
	}

	else if (mode === scoreboardModes.MULTIPLAYER) {
		const respData = sbMultiplayer.filter(item => 
			(item.index > PERPAGE * (pageNumber - 1)) && (item.index <= PERPAGE * pageNumber)
		);
		res.json(respData);
	}

	else {
		res.json({ });
	}
});


// TODO: API refactor
app.get('/history/:mode/page/:pageNumber', function(req, res) {
	
	const mode = req.params.mode;
	const pageNumber = req.params.pageNumber;
	
	if (mode === scoreboardModes.SINGLEPLAYER) {
		const respData = hsSingleplayer.filter(item => 
			(item.index > PERPAGE * (pageNumber - 1)) && (item.index <= PERPAGE * pageNumber)
		);
		res.json(respData);
		return;
	}

	else if (mode === scoreboardModes.MULTIPLAYER) {
		const respData = hsMultiplayer.filter(item => 
			(item.index > PERPAGE * (pageNumber - 1)) && (item.index <= PERPAGE * pageNumber)
		);

		res.json(respData);
	}

	else {
		res.json({ });
	}
});



// -------------------------------------------------------------------------------------
// NEW API
// -------------------------------------------------------------------------------------

app.get(URLS.get.ME, function(req, res) {
	const responceData = new ResponceData();

	const id = req.cookies['frontend'];
	const email = ids[id];
	
	if (!email || !users[email]) {
		responceData.addGlobalError('You are not authorized');
	}

	else {
		users[email].score += 1;
		responceData.setSuccessData({
			id: users[email].id,
			nickname: users[email].nickname,
			email: users[email].email,
			score: users[email].score,
			games_number: users[email].games,
			avatar: users[email].avatar
		});
	}

	res.json(responceData.data);
});

app.get(URLS.get.USER, function(req, res) {
	const responceData = new ResponceData();

	const userId = req.params.id;
	for (let user of users.values()) {
		if (user.id === userId) {
			res.json(responceData.data);
		}
	}

	responceData.addGlobalError('Not found');
	res.json(responceData.addGlobalError);
	
});

// -------------------------------------------------------------------------------------
// END NEW API
// -------------------------------------------------------------------------------------

const port = process.env.PORT || 3000;

app.listen(port, function () {
	logger(`Server listening port ${port}`);
});