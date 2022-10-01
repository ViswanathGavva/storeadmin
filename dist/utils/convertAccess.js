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
const UserType_1 = __importDefault(require("../models/UserType"));
function convertAccess(access) {
    return __awaiter(this, void 0, void 0, function* () {
        const stringedAccess = [];
        for (let i = 0; i < access.length; i++) {
            const accessId = access[i];
            // Logger.info("accessId: ", accessId);
            // find the access type from the mongoid
            const accessType = yield UserType_1.default.findById(accessId);
            // Logger.info("accessType: ", accessType);
            if (accessType) {
                stringedAccess.push(accessType.accessRights);
            }
        }
        //  Logger.info("stringedAccess: ", stringedAccess);
        return stringedAccess;
    });
}
exports.default = convertAccess;
//# sourceMappingURL=convertAccess.js.map