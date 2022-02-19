import joi from 'joi';
import { validate } from 'express-validation';

// @ts-ignore
import joiObjectId from 'joi-objectid';

joi.objectId = joiObjectId(joi);


const getProfiles = validate(
    {
        query: joi.object({
            pageNumber: joi.number().integer().positive().optional(),
            pageSize: joi.number().integer().positive().optional(),
        })
            .optional()
            .options({ stripUnknown: true })
    },
    { keyByField: true }
);

const createProfile = validate(
    {
        body: joi.object({
            email: joi.string().email().required(),
            name: joi.string().required(),
            nickname: joi.string().required(),
        }).required(),
    },
    { keyByField: true }
);

const getFavorites = validate(
    {
        query: joi.object({
            pageNumber: joi.number().integer().positive().optional(),
            pageSize: joi.number().integer().positive().optional(),
        })
            .optional()
            .options({ stripUnknown: true })
    },
    { keyByField: true }
)

const getFavorite = validate(
    {
        params: joi.object({
            id: joi.objectId().required(),
        })
            .required()
            .options({ stripUnknown: true })
    },
    { keyByField: true }
)

const getSimulators = validate(
    {
        query: joi.object({
            pageNumber: joi.number().integer().positive().optional(),
            pageSize: joi.number().integer().positive().optional(),
        })
            .optional()
            .options({ stripUnknown: true })
    },
    { keyByField: true }
)
const createSimulator = validate(
    {
        body: joi.object({
            profile: joi.objectId().required(),
            dateRecorded: joi.date().required(),
            cryptocurrency: joi.string().required(),
            euros: joi.number().integer().positive().required(),
            price: joi.number().integer().positive().required(),
            quantity: joi.number().integer().positive().required(),
        }).required(),
    },
    { keyByField: true }
);

const getSimulatorsByProfile = validate(
    {
        params: joi.object({
            profileId: joi.objectId().required(),
        })
            .required()
            .options({ stripUnknown: true })
    },
    { keyByField: true }
);

export default {
    getProfiles,
    createProfile,
    getFavorites,
    getFavorite,
    getSimulators,
    createSimulator,
    getSimulatorsByProfile,
};
