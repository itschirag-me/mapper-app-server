"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_1 = __importDefault(require("./room"));
const controller_1 = require("../controller");
const workRecord_1 = __importDefault(require("./workRecord"));
const apiRoute = (0, express_1.Router)();
apiRoute.route("/health").get(controller_1.getHealth);
apiRoute.use("/rooms", room_1.default);
apiRoute.use("/work", workRecord_1.default);
apiRoute.route("/clean").get(controller_1.handleCleanDB);
exports.default = apiRoute;
