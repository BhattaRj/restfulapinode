import Joi from 'joi';

export default {
	// POST /api/users
	createUser: {
		body: {
			firstName: Joi.string().required(),
			email: Joi.string().required(),
			mobileNumber: Joi.string().required(), //.regex(/^[1-9][0-9]{9}$/).required()
		}
	},

	// UPDATE /api/users/:userId
	updateUser: {
		body: {
			// username: Joi.string().required(),
			// mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
		},
		params: {
			userId: Joi.string().hex().required()
		}
	},

	// POST /api/auth/login
	login: {
		body: {
			email: Joi.string().required(),
			password: Joi.string().required()
		}
	},

	// POST /api/auth/signup
	signup: {
		body: {
			firstName: Joi.string().required(),
			email: Joi.string().required(),
			mobileNumber: Joi.string().required()
		}
	},

	updateTimesheet: {
		body: {
			// username: Joi.string().required(),
			// mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
		},
		params: {
			timesheetId: Joi.string().hex().required()
		},

	},
	createProject: {
		body: {
			name: Joi.string().required(),
			description: Joi.string().required(),
			// projectId: Joi.string().required()
		}
	},
	//post Project
	updateProject: {
		body: {
			name: Joi.string().required(),
			description: Joi.string().required(),
			projectId: Joi.string().required()
		}
	},
	//request leave
	requestLeave: {
		body: {
			type: Joi.string().required(),
			startDate: Joi.required(),
			endDate: Joi.required()
		}
	},
	requestDefect: {
		body: {
			title: Joi.string().required(),
			status: Joi.required(),
			priority: Joi.required()
		}
	},
	createTimesheetApproval: {
		body: {
			startDate: Joi.string().required(),
			endDate: Joi.string().required(),
			duration: Joi.required(),
		}
	},
	updateTimesheetApproval: {
		body: {
			startDate: Joi.string().required(),
			endDate: Joi.string().required(),
			duration: Joi.required(),
		}
	}
};
