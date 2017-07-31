import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import config from '../../../config/config';
import User from '../models/user.model';
import passwordHash from 'password-hash';


/**
 * Returns jwt token if valid username and password is provided
 * @returns {*}
 */
function login(req, res, next) {

	User.findOne({ email: req.body.email })
		.populate('reportTo')
		.then((user) => {
			if (!user) {
				const err = new APIError('Authentication Failed. User could not be found', httpStatus.UNAUTHORIZED, true);
				return next(err);
			};

			if (!passwordHash.verify(req.body.password, user.password)) {
				const err = new APIError('Authentication Failed. Invalid password', httpStatus.UNAUTHORIZED, true);
				return next(err);
			};

			const token = jwt.sign({
				_id: user._id,
				email: user.email,
				firstName: user.firstName
			}, config.jwtSecret);

			return res.json({
				token,
				user: user
			});
		})
		.catch(e => next(e));
}

/**
 * Register new user. 
 * @returns {*}
 */
function signup(req, res, next) {
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		password: passwordHash.generate(req.body.password),
	});
	user.save()
		.then(savedUser => res.json(savedUser))
		.catch(e => {
			if (e.errmsg && e.errmsg.indexOf('duplicate key error') !== -1) {
				e = new APIError('Email already registerd', httpStatus.INTERNAL_SERVER_ERROR, true);
			}
			return next(e);
		});
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
	// req.user is assigned by jwt middleware if valid token is provided
	return res.json({
		user: req.user,
		num: Math.random() * 100
	});
}

export default {
	login,
	getRandomNumber,
	signup
};
