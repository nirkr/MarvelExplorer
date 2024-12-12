import Joi from 'joi';

export const actorQuerySchema = Joi.object({
    q: Joi.string().min(1).required(),
});