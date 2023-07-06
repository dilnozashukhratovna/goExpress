// const Joi = require("joi");

// exports.operationValidation = (data) => {
//     const schema = Joi.object({
//         order_id: Joi.number().required(),
//         status_id: Joi.number().required(),
//         operation_date: Joi.date()
//             .allow("")
//             .message("Ma'lumot noto'g'ri kiritilindi!"),
//         admin_id: Joi.number().required(),
//         description: Joi.string(),
//     });
//     return schema.validate(data, { abortEarly: false });
// };

const Joi = require("joi");

exports.operationValidation = (data) => {
    const schema = Joi.object({
        order_id: Joi.number().required(),
        status_id: Joi.number().required(),
        operation_date: Joi.custom((value, helpers) => {
            if (
                value === "" ||
                (typeof value === "string" && !isNaN(Date.parse(value)))
            ) {
                return value;
            }
            return helpers.error("any.invalid");
        }).message("operation_date'ga ma'lumot noto'g'ri kiritilindi!"),
        admin_id: Joi.number().required(),
        description: Joi.string(),
    });

    return schema.validate(data, { abortEarly: false });
};

