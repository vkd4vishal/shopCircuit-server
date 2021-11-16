"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.DELETE = exports.UPDATE = exports.CREATE = exports.sendError = void 0;
// var statusMessages = new Map([[200, 'OK'],[422, 'Unprocessable Entity']])
const sendError = (res, statusCode, message) => {
    res.status(statusCode).send(message);
};
exports.sendError = sendError;
const CREATE = (res, data, id) => {
    res.status(201).send({ data, message: `${id} created successfully.` });
};
exports.CREATE = CREATE;
const UPDATE = (res, data, id) => {
    res.status(200).send({ data, message: `${id} updated successfully.` });
};
exports.UPDATE = UPDATE;
const DELETE = (res, data, id) => {
    res.status(200).send({ data, message: `${id} deleted successfully.` });
};
exports.DELETE = DELETE;
const GET = (res, data, id) => {
    res.status(200).send({ data, message: `${id} fetched successfully.` });
};
exports.GET = GET;
