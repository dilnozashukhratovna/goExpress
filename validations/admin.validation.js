const Joi = require("joi");

exports.adminValidation = (data) => {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        user_name: Joi.string(),
        hashed_password: Joi.string(),
        phone_number: Joi.string().pattern(/\d{2}-\d{3}-\d{2}-\d{2}/).message("The phone number should be this format: '99-999-99-99'"),
        email: Joi.string().email(),
        tg_link: Joi.string().min(3),
        is_creator: Joi.boolean().default(false),
        is_active: Joi.boolean().default(false),
        description: Joi.string(),
    });
    return schema.validate(data, { abortEarly: false });
};
