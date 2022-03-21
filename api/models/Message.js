"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const regex_1 = require("../constants/regex");
const messageSchema = new mongoose_1.default.Schema({
    parentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        index: true
    },
    author: {
        type: String,
        required: true,
    },
    bodyText: {
        type: String,
        required: true,
        validate: {
            validator(input) {
                // @ts-ignore
                if (this === null || this === void 0 ? void 0 : this.parentId) {
                    return regex_1.REX_OPERATOR_AND_NUMBER.test(input);
                }
                return regex_1.REX_NUMBER_ONLY.test(input);
            },
            message: () => {
                // @ts-ignore
                if (this.parentId) {
                    return 'Must be an operator and an integer';
                }
                return 'Must be integer only';
            }
        }
    }
}, { timestamps: true });
const MessageModel = mongoose_1.default.model('messages', messageSchema);
exports.default = MessageModel;
//# sourceMappingURL=Message.js.map