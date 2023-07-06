const Joi = require("joi");

exports.orderValidation = (data) => {
    const schema = Joi.object({
        full_name: Joi.string().allow("").optional(),
        phone_number: Joi.string()
            .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
            .message("The phone number should be this format: '99-999-99-99'")
            .required(),
        product_link: Joi.string().uri().allow("").optional(),
        summa: Joi.number().min(0).required(),
        truck: Joi.string()
            .required(),
        email: Joi.string().email().required(),
        description: Joi.string().allow("").optional(),
        currency_type_id: Joi.number().integer().required(),
    });

    return schema.validate(data, { abortEarly: false });
};
