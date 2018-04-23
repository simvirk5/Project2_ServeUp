var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
 	User = require('./models/user'),
 	session = require('express-session');

