import * as Joi from 'joi';

let date = new Date();

const weatherValidation = Joi.object().keys({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    date: Joi.date().min(date.setHours(0, 0, 0, 0)).max(date.setDate(date.getDate() + 7)).iso().required()
});

export { weatherValidation };