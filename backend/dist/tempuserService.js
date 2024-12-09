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
exports.deleteExpiredUser = exports.deleteTempuser = exports.findTempuser = exports.createTempuser = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
const createTempuser = (name, email, password, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prismaClient_1.default.tempuser.create({
            data: {
                name,
                email,
                password,
                token,
                expiresAt: new Date(Date.now() + 30 * 60 * 1000)
            }
        });
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Creating TempUSer"
        };
    }
});
exports.createTempuser = createTempuser;
const findTempuser = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prismaClient_1.default.tempuser.findFirst({
            where: {
                email,
                token
            }
        });
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Getting TempUSer"
        };
    }
});
exports.findTempuser = findTempuser;
const deleteTempuser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        prismaClient_1.default.tempuser.delete({
            where: {
                id
            }
        });
        return { msg: "Success" };
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Deleting TempUser"
        };
    }
});
exports.deleteTempuser = deleteTempuser;
const deleteExpiredUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        prismaClient_1.default.tempuser.deleteMany({
            where: {
                expiresAt: { lt: new Date() }
            }
        });
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Deleting TempUser"
        };
    }
});
exports.deleteExpiredUser = deleteExpiredUser;
