"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const NODE_ENV = process.env.NODE_ENV || "dev";
switch (NODE_ENV) {
    case "development":
        dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env.development") });
        break;
    case "production":
        dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
        break;
    case "staging":
        dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env.staging") });
        break;
    case "testing":
        dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env.test") });
        break;
    default:
        console.log("NODE_ENV not found");
        break;
}
const Env = {
    port: process.env.PORT,
    nodeEnv: NODE_ENV,
    mongoUri: process.env.MONGO_URI,
};
exports.default = Env;
