const db = require("../models");
const validation = require("../utility/validation");

const updateProfile = async (req, res, next) => {
	const { id } = req.user;

	const {
		firstName,
		lastName,
		studentNumber,
		address,
		email,
		phone,
		entryPeriod,
		academicCouncellor,
	} = req.body;

	const validatedData = validation.updateProfileValidation({
		firstName,
		lastName,
		studentNumber,
		address,
		email,
		phone,
		entryPeriod,
		academicCouncellor,
	});
	if (validatedData.error)
		return next(validatedData.error.details[0].message);

	//check if Student Profile exists
	let studentProfile;
	try {
		studentProfile = await db.StudentProfile.findOne({
			where: {
				userId: id,
			},
		});
	} catch (error) {
		return next(error);
	}

	if (studentProfile) {
		//update Student Profile
		try {
			await studentProfile.update({
				firstName,
				lastName,
				studentNumber,
				address,
				email,
				phone,
				entryPeriod,
				academicCouncellor,
			});
		} catch (error) {
			return next(error);
		}
	} else {
		try {
			//create Student Profile
			studentProfile = await db.StudentProfile.create({
				userId: id,
				firstName,
				lastName,
				studentNumber,
				address,
				email,
				phone,
				entryPeriod,
				academicCouncellor,
			});
		} catch (error) {
			return next(error);
		}
	}

	res.json({
		message: "Student Profile updated successfully",
	});
};

module.exports = {
	updateProfile,
};
