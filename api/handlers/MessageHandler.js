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
const MessageStore_1 = __importDefault(require("../stores/MessageStore"));
class MessageHandler {
    constructor() {
        this.messageStore = new MessageStore_1.default();
    }
    create(inMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.messageStore.create(inMessage);
                return message;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.messageStore.getAll();
                return messages;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MessageHandler;
//# sourceMappingURL=MessageHandler.js.map