"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_1 = require("../controller/room");
const roomRoute = (0, express_1.Router)();
roomRoute.route("/:date").get(room_1.getRooms);
roomRoute.route("/:date/:id").get(room_1.getRoomById).put(room_1.putRoom);
// roomRoute.route("/:date/reset").put(putRoomReset);
exports.default = roomRoute;
