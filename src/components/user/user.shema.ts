import JOI from '@hapi/joi'

const userSchema = JOI.object().keys({
    name: JOI.string().required().min(3).max(15).alphanum(),
    age: JOI.number().min(7).max(100).required(),
    DOB: JOI.date(),
    email: JOI.string().email().required(),
});

const userUpdatePutSchema = JOI.object().keys({
    key: JOI.string().uuid().required(),
    name: JOI.string().min(3).max(15).alphanum(),
    age: JOI.number().min(7).max(100),
    DOB: JOI.date(),
    email: JOI.string().email(),
});

const userParamsPropertySchema = JOI.object().keys({
    key: JOI.string().uuid().required()
});

export const userUpdateSchema = JOI.object().keys({
    body:userUpdatePutSchema,
    params:JOI.object().empty(),
    query:JOI.object().empty(),
    headers:JOI.object()
});

export const userCreateSchema = JOI.object().keys({
    body:userSchema,
    params:JOI.object().empty(),
    query:JOI.object().empty(),
    headers:JOI.object()
});

export const userParamsSchema = JOI.object().keys({
    body:JOI.object().empty(),
    params:userParamsPropertySchema,
    query:JOI.object().empty(),
    headers:JOI.object()
});


