"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = void 0;
const enviroment_1 = __importDefault(require("../constants/enviroment"));
const isProduction = () => (process.env.NODE_ENV === enviroment_1.default.production);
exports.isProduction = isProduction;
//# sourceMappingURL=CommonFunctions.js.map