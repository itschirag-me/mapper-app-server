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
exports.GetWorkRecordByDate = exports.GetWorkRecordById = exports.GetWorkRecords = exports.CreateRecord = void 0;
const moment_1 = __importDefault(require("moment"));
const rooms_json_1 = __importDefault(require("../static/rooms.json"));
const WorkRecord_1 = __importDefault(require("../model/WorkRecord"));
function CreateRecord() {
    return __awaiter(this, void 0, void 0, function* () {
        const date = (0, moment_1.default)().format("DD-MM-YYYY");
        const workRecord = yield WorkRecord_1.default.findOne({ date: date }).select("-__v");
        if (!workRecord) {
            const newWorkRecord = new WorkRecord_1.default({
                date: date,
                rooms: rooms_json_1.default,
            });
            return newWorkRecord.save();
        }
        return workRecord;
    });
}
exports.CreateRecord = CreateRecord;
function GetWorkRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        return WorkRecord_1.default.find({}).select("-__v");
    });
}
exports.GetWorkRecords = GetWorkRecords;
function GetWorkRecordById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return WorkRecord_1.default.findById(id).select("-__v");
    });
}
exports.GetWorkRecordById = GetWorkRecordById;
function GetWorkRecordByDate(date) {
    return __awaiter(this, void 0, void 0, function* () {
        return WorkRecord_1.default.findOne({ date }).select("-__v");
    });
}
exports.GetWorkRecordByDate = GetWorkRecordByDate;
