import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';

const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required"]
	},
	lastName: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	mobileNumber: {
		type: String,
		required: true,
		// match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
	},
	password: {
		type: String,
		required: false,
	},
	userType: {
		type: Number,   // 1- user 2-admin
		default: 1
	}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
	/**
	 * Get user
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.exec()
			.then((user) => {
				if (user) {
					return user;
				}
				const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	},

	/**
	 * List users in descending order of 'createdAt' timestamp.
	 * @param {number} skip - Number of users to be skipped.
	 * @param {number} limit - Limit number of users to be returned.
	 * @returns {Promise<User[]>}
	 */
	list({ skip = 0, limit = 50 } = {}) {
		return this.find()
			.sort({ createdAt: -1 })
			.skip(+skip)
			.limit(+limit)
			.exec();
	}
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
