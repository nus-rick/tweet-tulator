"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("./message"));
const user_1 = __importDefault(require("./user"));
const router = express_1.default.Router();
message_1.default.use('/messages', message_1.default);
user_1.default.use('/users', user_1.default);
router.use(message_1.default);
router.use(user_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map