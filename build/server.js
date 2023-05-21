"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keys_1 = __importDefault(require("./config/keys"));
const db_1 = __importDefault(require("./config/db"));
const api_1 = __importDefault(require("./routes/api"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = require("./controller");
const node_cron_1 = __importDefault(require("node-cron"));
node_cron_1.default.schedule("0 0 * * *", () => { });
const app = (0, express_1.default)();
// const corsOption = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:3000",
//     "http://localhost:5000",
//   ],
// };
app
    .use((0, cors_1.default)())
    .use(express_1.default.urlencoded({ extended: false }))
    .use(express_1.default.json())
    .get("/healthz", controller_1.getHealth)
    .use("/api", api_1.default)
    .use(controller_1.handleError)
    .listen(keys_1.default.port, () => {
    (0, db_1.default)();
    console.log("Serving on http://localhost:%s", keys_1.default.port);
});
