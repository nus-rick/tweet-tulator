"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data) => {
    return res.status(200).json({ status: 200, data });
};
exports.successResponse = successResponse;
const errorResponse = (res, error, status = 400) => {
    return res.status(status).json({ status, message: error.message, stack: error.stack });
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=ErrorHandler.js.map