"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./api"));
const router = express_1.default.Router();
router.use('/api', api_1.default);
// serve up react front-end in production
router.use((_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
exports.default = router;
