"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gfs = exports.db = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("../src/apis/routes/routes");
const index_1 = require("./database/index");
const mongoose_1 = __importDefault(require("mongoose"));
const Grid = require('gridfs-stream');
exports.db = (0, index_1.connectDB)();
exports.db.once('open', () => {
    exports.gfs = new mongoose_1.default.mongo.GridFSBucket(exports.db.db, {
        bucketName: 'images'
    });
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(routes_1.router);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
