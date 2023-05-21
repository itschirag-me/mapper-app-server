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
exports.ResetRoom = exports.UpdateRoom = exports.GetRoomById = exports.GetRooms = void 0;
const http_status_codes_1 = require("http-status-codes");
const rooms_json_1 = __importDefault(require("../static/rooms.json"));
const WorkRecord_1 = __importDefault(require("../model/WorkRecord"));
const workRecord_service_1 = require("./workRecord.service");
const getNewStatus = (status = "pending") => {
    switch (status) {
        case "pending":
            status = "inprocess";
            break;
        case "inprocess":
            status = "done";
            break;
        default:
            status = "done";
            break;
    }
    return status;
};
function GetRooms(date) {
    return __awaiter(this, void 0, void 0, function* () {
        const workRecord = yield (0, workRecord_service_1.GetWorkRecordByDate)(date);
        if (!workRecord) {
            const error = new Error("Work record not found");
            error.statusCode = http_status_codes_1.StatusCodes.NO_CONTENT;
            throw error;
        }
        return workRecord.rooms;
    });
}
exports.GetRooms = GetRooms;
function GetRoomById(date, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const workRecord = yield WorkRecord_1.default.findOne({ date: date, rooms: { $elemMatch: { _id: id } } }, { "rooms.$": 1 });
        if (!workRecord) {
            const error = new Error("Work record not found");
            error.statusCode = http_status_codes_1.StatusCodes.NO_CONTENT;
            throw error;
        }
        return workRecord.rooms[0];
    });
}
exports.GetRoomById = GetRoomById;
function UpdateRoom(date, id, worker) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield GetRoomById(date, id);
        if (!room) {
            const error = new Error("Room not found");
            error.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
            throw error;
        }
        const status = getNewStatus(room.status);
        if (status === "inprocess") {
            if (!worker) {
                const error = new Error("Worker name is required");
                error.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                throw error;
            }
            yield WorkRecord_1.default.updateOne({ date, "rooms._id": id }, {
                $set: {
                    "rooms.$.status": status,
                    "rooms.$.checkIn": new Date(),
                    "rooms.$.worker": worker,
                },
            });
        }
        else if (status === "done") {
            yield WorkRecord_1.default.updateOne({ date, "rooms._id": id }, {
                $set: {
                    "rooms.$.status": status,
                    "rooms.$.checkOut": new Date(),
                },
            });
        }
        const rooms = yield GetRooms(date);
        return rooms;
    });
}
exports.UpdateRoom = UpdateRoom;
function ResetRoom(date) {
    return __awaiter(this, void 0, void 0, function* () {
        yield WorkRecord_1.default.updateOne({ date }, { rooms: rooms_json_1.default });
        const result = yield GetRooms(date);
        return result;
    });
}
exports.ResetRoom = ResetRoom;
