"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCleanDB = exports.getHealth = exports.handleNotFound = exports.handleError = void 0;
const http_status_codes_1 = require("http-status-codes");
const service_1 = require("../service/service");
function handleError(error, req, res, next) {
    const statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = (error === null || error === void 0 ? void 0 : error.message) || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        status: false,
        message: message,
    });
}
exports.handleError = handleError;
function handleNotFound(error, req, res, next) {
    const statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    res.status(statusCode).json({
        status: false,
        message: "Method not found",
    });
}
exports.handleNotFound = handleNotFound;
function getHealth(error, req, res, next) {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        status: true,
        message: "API's are healthy",
    });
}
exports.getHealth = getHealth;
function handleCleanDB(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clean DB
            const result = yield (0, service_1.CleanDB)();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: "DB cleaned",
                result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.handleCleanDB = handleCleanDB;
