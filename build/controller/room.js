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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRoomReset = exports.putRoom = exports.getRoomById = exports.getRooms = void 0;
const http_status_codes_1 = require("http-status-codes");
const room_service_1 = require("../service/room.service");
const moment_1 = __importDefault(require("moment"));
function getRooms(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = req.params.date || (0, moment_1.default)().format("DD-MM-YYYY");
            const rooms = yield (0, room_service_1.GetRooms)(date);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result: rooms,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getRooms = getRooms;
function getRoomById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const date = req.params.date;
            const room = yield (0, room_service_1.GetRoomById)(date, id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result: room,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getRoomById = getRoomById;
function putRoom(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const date = req.params.date;
            const worker = req.body.workerName;
            const room = yield (0, room_service_1.UpdateRoom)(date, id, worker);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result: room,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.putRoom = putRoom;
function putRoomReset(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = req.params.date;
            const room = yield (0, room_service_1.ResetRoom)(date);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: true,
                message: http_status_codes_1.ReasonPhrases.OK,
                result: room,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.putRoomReset = putRoomReset;
