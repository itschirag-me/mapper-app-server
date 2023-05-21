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
exports.getWorkRecordByDate = exports.getWorkRecordById = exports.postWorkRecord = exports.getWorkRecords = void 0;
const workRecord_service_1 = require("../service/workRecord.service");
const http_status_codes_1 = require("http-status-codes");
function getWorkRecords(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, workRecord_service_1.GetWorkRecords)();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getWorkRecords = getWorkRecords;
function postWorkRecord(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, workRecord_service_1.CreateRecord)();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.postWorkRecord = postWorkRecord;
function getWorkRecordById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield (0, workRecord_service_1.GetWorkRecordById)(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getWorkRecordById = getWorkRecordById;
function getWorkRecordByDate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = req.params.date;
            const result = yield (0, workRecord_service_1.GetWorkRecordByDate)(date);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getWorkRecordByDate = getWorkRecordByDate;
