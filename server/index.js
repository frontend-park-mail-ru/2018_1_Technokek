'use strict';

const path = require('path');
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

const users = {
	'vv-ch@bk.ru': {
		nickname: 'Vitaly Cherkov',
		email: 'vv-ch@bk.ru',
		password: 'password',
		games: 20,
		score: 72
	},
	'vv-ch1@bk.ru': {
		nickname: 'Vitaly Cherkovv',
		email: 'vv-ch1@bk.ru',
		password: 'password',
		games: 21,
		score: 172
	},
	'vv-ch2@bk.ru': {
		nickname: 'Vitaly Cherkovvv',
		email: 'vv-ch2@bk.ru',
		password: 'password',
		games: 22,
		score: 272
	},
};

const ids = {};

app.post('/signup', function (req, res) {
	console.log('SIGNUP', req.body);

	const password = req.body.password;
	const passwordRepeat = req.body['repeat-password'];
	const email = req.body.email;
	const nickname = req.body.nickname;
	if (
		!password || !email ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}
	if (password !== passwordRepeat) {
		return res.status(400).json({error: 'Введеные пароли не совпадают'});
	}
	for (let user of Object.values(users)) {
		if (user.nickname === nickname) {
			return res.status(400).json({error: 'Такой никнейм уже занят'});
		}
	}

	const id = uuid();
	const user = {password, nickname, email, score: 0, games: 0};
	ids[id] = email;
	users[email] = user;

	console.log(req.body, user, users[email]);

	res.cookie('frontend', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/login', function (req, res) {

	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie('frontend', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/logout', function (req, res) {
	const id = req.cookies['frontend'];
	delete ids[id];

	res.status(200).end();
});

app.get('/me', function (req, res) {

	const id = req.cookies['frontend'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].rating += 1;

	res.json(users[email]);
});

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

const port = process.env.PORT || 3000;

app.listen(port, function () {
	logger(`Server listening port ${port}`);
});


