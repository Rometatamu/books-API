import Joi from "joi";

export default Joi.object({
    type:Joi.string().required(),
    author:Joi.string().required(),
    genre:Joi.string().required(),
    summary:Joi.string().required(),
    satus:Joi.string().required(),
    userId:Joi.string().required(),
    id:Joi.string().required(),
});
