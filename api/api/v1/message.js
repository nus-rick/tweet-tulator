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
const express_1 = __importDefault(require("express"));
const MessageHandler_1 = __importDefault(require("../../handlers/MessageHandler"));
const ErrorHandler_1 = require("../../utils/ErrorHandler");
const messageRouter = express_1.default.Router();
messageRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const handler = new MessageHandler_1.default();
        const messages = yield handler.getAll();
        return (0, ErrorHandler_1.successResponse)(res, messages);
    }
    catch (error) {
        return (0, ErrorHandler_1.errorResponse)(res, error);
    }
}));
messageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bodyText, author, parentId } = req.body;
        const handler = new MessageHandler_1.default();
        const newMessage = yield handler.create({ bodyText, author, parentId });
        return (0, ErrorHandler_1.successResponse)(res, newMessage);
    }
    catch (error) {
        return (0, ErrorHandler_1.errorResponse)(res, error);
    }
}));
exports.default = messageRouter;
//# sourceMappingURL=message.js.map