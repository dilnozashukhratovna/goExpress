const Joi = require("joi");

exports.currencyTypeValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        description: Joi.string().allow("").optional(),
    });
    return schema.validate(data, { abortEarly: false });
};


