const Joi = require("joi");

exports.operationValidation = (data) => {
    const schema = Joi.object({
        order_id: Joi.number().required(),
        status_id: Joi.number().required(),
        operation_date: Joi.date().message("Noto'g'ri ma'lumot."),
        admin_id: Joi.number().required(),
        description: Joi.string(),
    });
    return schema.validate(data, { abortEarly: false });
};

