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
const Message_1 = __importDefault(require("../models/Message"));
class MessageStore {
    create(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecord = new Message_1.default(message);
            return yield newRecord.save();
        });
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Message_1.default.aggregate([
                {
                    $match: {
                        parentId: undefined,
                    }
                },
                {
                    $graphLookup: {
                        startWith: "$_id",
                        from: 'messages',
                        as: 'replies',
                        connectFromField: '_id',
                        connectToField: 'parentId',
                    }
                }
            ]);
        });
    }
    ;
}
exports.default = MessageStore;
//# sourceMappingURL=MessageStore.js.map