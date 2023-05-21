"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
const workRecordSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    rooms: [
        {
            name: {
                type: String,
                required: true,
            },
            roomNo: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ["pending", "inprocess", "done"],
                default: "pending",
            },
            shape: {
                type: String,
                enum: ["poly", "circle"],
            },
            coords: [{ type: Number, required: true }],
            checkIn: {
                type: Date,
            },
            checkOut: {
                type: Date,
            },
            worker: {
                type: String,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const WorkRecord = (0, mongoose_1.model)("workRecord", workRecordSchema);
exports.default = WorkRecord;
