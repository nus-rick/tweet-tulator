"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const index_1 = __importDefault(require("./api/v1/index"));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', index_1.default);
mongoose_1.default.connect(process.env.DATABASE_URL || 'mongodb://mongo:mongo@db:27017/tweettulator');
app.use((err, _req, res, _next) => {
    /* tslint:disable-next-line */
    console.log('Error', err);
    return res.status(500).json({
        message: err.message,
        stack: err.stack
    });
});
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        /* tslint:disable-next-line */
        console.log(`⚡️[server]: Server is running`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map