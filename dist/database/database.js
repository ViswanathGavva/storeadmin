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
const defaults_1 = __importDefault(require("../config/defaults"));
const mongoose_1 = require("mongoose");
const logconfig_1 = __importDefault(require("../config/logconfig"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = defaults_1.default.mongoURI;
        yield (0, mongoose_1.connect)(mongoURI);
        logconfig_1.default.info("MongoDB Connected...");
    }
    catch (err) {
        logconfig_1.default.error("VISWAA" + defaults_1.default.mongoURI + "" + err.message);
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=database.js.map