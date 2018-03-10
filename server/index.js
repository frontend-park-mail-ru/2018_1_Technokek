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
		email: 'vv-ch@bk.ru',
		password: 'password',
		games: 20,
		rating: 72
	},
	'vv-ch1@bk.ru': {
		email: 'vv-ch1@bk.ru',
		password: 'password',
		games: 21,
		rating: 172
	},
	'vv-ch2@bk.ru': {
		email: 'vv-ch2@bk.ru',
		password: 'password',
		games: 22,
		rating: 272
	},
};

const ids = {};

app.post('/signup', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	const nickname = req.body.nickname;
	if (
		!password || !email || !age ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}
	for (let user of users) {
		if (user.nickname === nickname) {
			return res.status(400).json({error: 'Такой никнейм уже занят'});
		}
	}

	const id = uuid();
	const user = {password, email, age, rating: 0};
	ids[id] = email;
	users[email] = user;

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

const port = process.env.PORT || 3000;

app.listen(port, function () {
	logger(`Server listening port ${port}`);
});
