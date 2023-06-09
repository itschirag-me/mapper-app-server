"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workRecord_1 = require("../controller/workRecord");
const WRRoute = (0, express_1.Router)();
WRRoute.route("/").get(workRecord_1.postWorkRecord).post(workRecord_1.postWorkRecord);
WRRoute.route("/all").get(workRecord_1.getWorkRecords);
WRRoute.route("/:id").get(workRecord_1.getWorkRecordById);
WRRoute.route("/date/:date").get(workRecord_1.getWorkRecordByDate);
exports.default = WRRoute;
